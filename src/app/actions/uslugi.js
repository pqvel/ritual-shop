"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { uslugaShema } from "@/zod/schemas";
import { s3Service } from "@/services/s3";
import db from "@/db";
import { z } from "zod";
import { imageSchema } from "@/zod/schemas";
import { arrayDif } from "@/utils/arrayDif";

export const createUsluga = async (state, formData) => {
  const result = uslugaShema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { title, content, contentImages, image } = result.data;

  const slug = slugify(title, {
    locale: "ru",
    lower: true,
  });

  const fileExtension = image.type.split("/")[1];
  const buffer = Buffer.from(await image.arrayBuffer());
  const fileName = `uslugi/${slug}.${Date.now()}.${fileExtension}`;
  const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
  const uploadImageUrl = `${baseUrl}/${fileName}`;

  await s3Service.uploadImage(buffer, fileName);

  await db.usluga.create({
    data: {
      title,
      slug,
      image: uploadImageUrl,
      content,
      contentImages: contentImages,
    },
  });

  revalidatePath("/");
  redirect("/admin/uslugi");
};

export const deleteUsluga = async (id) => {
  const usluga = await db.usluga.delete({
    where: {
      id: id,
    },
  });

  await s3Service.deleteImage(usluga.image);
  await s3Service.deleteImages(usluga.contentImages);

  revalidatePath("/");
  redirect("/admin/uslugi");
};

export const changeUslugaActive = async (id, isActive) => {
  await db.usluga.update({
    where: {
      id,
    },
    data: {
      active: isActive,
    },
  });

  revalidatePath("/");
};

export const changeUsluga = async (state, formData) => {
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

  const { id, title, content, contentImages, image, description } = result.data;

  const usluga = await db.usluga.findUnique({
    where: {
      id: id,
    },
  });

  if (image.size !== 0) {
    await s3Service.deleteImage(usluga.image);

    const slug = slugify(`${title}`, {
      locale: "ru",
      lower: true,
    });

    const fileExtension = image.type.split("/")[1];
    const buffer = Buffer.from(await image.arrayBuffer());
    const fileName = `uslugi/${slug}.${Date.now()}.${fileExtension}`;
    const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
    const uploadImageUrl = `${baseUrl}/${fileName}`;

    await s3Service.uploadImage(buffer, fileName);

    await db.usluga.update({
      where: {
        id: id,
      },
      data: {
        image: uploadImageUrl,
      },
    });
  }

  const [needToDeleteImages] = arrayDif(contentImages, usluga.contentImages);

  if (needToDeleteImages.length > 0) {
    await s3Service.deleteImages(needToDeleteImages);
  }

  const updatedUsluga = await db.usluga.update({
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
  redirect("/admin/uslugi");
};
