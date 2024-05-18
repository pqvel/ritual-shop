"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { categorySchema, imageSchema } from "@/zod/schemas";
import { s3Service } from "@/services/s3";

export const getCategories = async () => {
  return await db.category.findMany({ where: { level: 1 } });
};

export const createCategory = async (state, formData) => {
  const result = categorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { title, image, parentId, level } = result.data;

  const slug = slugify(title, {
    locale: "ru",
    lower: true,
  });

  const fileExtension = image.type.split("/")[1];
  const buffer = Buffer.from(await image.arrayBuffer());
  const fileName = `categories/${slug}.${Date.now()}.${fileExtension}`;
  const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
  const uploadImageUrl = `${baseUrl}/${fileName}`;

  await s3Service.uploadImage(buffer, fileName);

  await db.category.create({
    data: {
      title,
      slug,
      parentId,
      level,
      image: uploadImageUrl,
    },
    include: {
      parent: {
        where: {
          id: parentId,
        },
      },
    },
  });

  revalidatePath("/");
  redirect("/admin/catalog");
};

export const changeCategoryActive = async (id, isActive) => {
  await db.category.update({
    where: {
      id,
    },
    data: {
      active: isActive,
    },
  });

  revalidatePath("/");
};

export const deleteCategory = async (id) => {
  const category = await db.category.delete({
    where: {
      id: id,
    },
  });

  await s3Service.deleteImage(category.image);

  revalidatePath("/");
  redirect("/admin/catalog");
};

export const changeCategory = async (state, formData) => {
  const schema = z.object({
    title: z.string(),
    image: imageSchema.optional(),
    id: z
      .string()
      .optional()
      .transform((val) => val && parseInt(val, 10)),
  });

  const result = schema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) return result.error.formErrors.fieldErrors;
  const { title, image, id } = result.data;

  const category = await db.category.findUnique({
    where: {
      id: id,
    },
  });

  if (image) {
    await s3Service.deleteImage(category.image);

    const slug = slugify(title, {
      locale: "ru",
      lower: true,
    });

    const fileExtension = image.type.split("/")[1];
    const buffer = Buffer.from(await image.arrayBuffer());
    const fileName = `categories/${slug}.${Date.now()}.${fileExtension}`;
    const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
    const uploadImageUrl = `${baseUrl}/${fileName}`;

    await s3Service.uploadImage(buffer, fileName);

    await db.category.update({
      where: {
        id: id,
      },
      data: {
        image: uploadImageUrl,
      },
    });
  }

  if (title !== category.title) {
    await db.category.update({
      where: {
        id: id,
      },
      data: {
        title,
        slug: slugify(title, {
          locale: "ru",
          lower: true,
        }),
      },
    });
  }

  revalidatePath("/");
  redirect("/admin/catalog");
};
