"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { articleShema } from "@/zod/schemas";
import { s3Service } from "@/services/s3";
import db from "@/db";
import { z } from "zod";
import { imageSchema } from "@/zod/schemas";
import { arrayDif } from "@/utils/arrayDif";

export const createArticle = async (state, formData) => {
  const result = articleShema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { title, content, contentImages, image } = result.data;

  const slug = slugify(title, {
    locale: "ru",
    lower: true,
  });

  const fileExtension = image.type.split("/")[1];
  const buffer = Buffer.from(await image.arrayBuffer());
  const fileName = `articles/${slug}.${Date.now()}.${fileExtension}`;
  const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
  const uploadImageUrl = `${baseUrl}/${fileName}`;

  await s3Service.uploadImage(buffer, fileName);

  await db.article.create({
    data: {
      title,
      slug,
      image: uploadImageUrl,
      content,
      contentImages: contentImages,
    },
  });

  revalidatePath("/");
  redirect("/admin/articles");
};

export const deleteArticle = async (id) => {
  const article = await db.article.delete({
    where: {
      id: id,
    },
  });

  await s3Service.deleteImage(article.image);
  await s3Service.deleteImages(article.contentImages);

  revalidatePath("/");
  redirect("/admin/articles");
};

export const changeArticleActive = async (id, isActive) => {
  await db.article.update({
    where: {
      id,
    },
    data: {
      active: isActive,
    },
  });

  revalidatePath("/");
};

export const changeArticle = async (state, formData) => {
  const schema = z.object({
    id: z
      .string()
      .optional()
      .transform((val) => val && parseInt(val, 10)),
    title: z.string().min(1, "Заполните поле"),
    content: z.string().min(1, "Заполните поле"),
    contentImages: z
      .string()
      .optional()
      .default("[]")
      .transform((str) => JSON.parse(str)),
    image: imageSchema.optional(),
  });

  const result = schema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { id, title, content, contentImages, image } = result.data;

  const article = await db.article.findUnique({
    where: {
      id: id,
    },
  });

  if (image.size !== 0) {
    await s3Service.deleteImage(article.image);

    const slug = slugify(`${title}`, {
      locale: "ru",
      lower: true,
    });

    const fileExtension = image.type.split("/")[1];
    const buffer = Buffer.from(await image.arrayBuffer());
    const fileName = `articles/${slug}.${Date.now()}.${fileExtension}`;
    const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
    const uploadImageUrl = `${baseUrl}/${fileName}`;

    await s3Service.uploadImage(buffer, fileName);

    await db.article.update({
      where: {
        id: id,
      },
      data: {
        image: uploadImageUrl,
      },
    });
  }

  const [needToDeleteImages] = arrayDif(contentImages, article.contentImages);

  if (needToDeleteImages.length > 0) {
    await s3Service.deleteImages(needToDeleteImages);
  }

  const updatedArticle = await db.article.update({
    where: {
      id: id,
    },
    data: {
      title,
      slug: slugify(`${title}`, {
        locale: "ru",
        lower: true,
      }),
      content,
      contentImages: contentImages,
    },
  });

  revalidatePath("/");
  redirect("/admin/articles");
};
