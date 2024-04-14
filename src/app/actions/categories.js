"use server";
import fs from "fs/promises";
import { categorySchema } from "@/zod/schemas";
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

  await fs.mkdir("/public/images/categories", { recursive: true });
  const imagePath = `/images/categories/${crypto.randomUUID()}-${image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await image.arrayBuffer())
  );

  console.log(parentId);

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

  revalidatePath("/admin/catalog");
  redirect("/admin/catalog");
};

export const changeCategoryActive = async (id, isActive) => {
  return await db.category.update({
    where: {
      id,
    },
    data: {
      active: isActive,
    },
  });
};

export const deleteCategory = async (id) => {
  const category = await db.category.delete({
    where: {
      id: id,
    },
  });

  await fs.unlink(`public${category.image}`);
};
