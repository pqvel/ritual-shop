"use server";
import fs from "fs/promises";
import { z } from "zod";
import { categorySchema, imageSchema } from "@/zod/schemas";
import db from "../../../db/db";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getCategories = async () => {
  return await db.category.findMany({ where: { level: 1 } });
};

/* tslint:disable */
export const createCategory = async (state, formData) => {
  const result = categorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { title, image, parentId, level } = result.data;

  const data = result.data;
  await fs.mkdir("public/categories", { recursive: true });
  const imagePath = `/categories/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.category.create({
    data: {
      title,
      slug: slugify(title, {
        locale: "ru",
        lower: true,
      }),
      image: imagePath,
      parentId,
      level,
    },
    include: {
      parent: {
        where: {
          id: parentId,
        },
      },
    },
  });

  revalidatePath("/", "page");
  revalidatePath("/", "layout");

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

  revalidatePath("/", "page");
  revalidatePath("/", "layout");
};

export const deleteCategory = async (id) => {
  const category = await db.category.delete({
    where: {
      id: id,
    },
  });

  await fs.unlink(`public${category.image}`);
  revalidatePath("/", "page");
  revalidatePath("/", "layout");
  return category;
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
    // change image

    await fs.unlink(`public${category.image}`);
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
};
