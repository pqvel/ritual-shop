"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { articleShema } from "@/zod/schemas";
import { s3Service } from "@/services/s3";
import db from "@/db";

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
