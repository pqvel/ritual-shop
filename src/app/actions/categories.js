"use server";
import fs from "fs/promises";
import { categorySchema } from "@/zod/schemas";
import db from "../../../db/db";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function saveImage(image) {
  const directory = "public/images/categories";
  try {
    // Create directory if it doesn't exist
    // await fs.mkdir(directory, { recursive: true });

    // // Generate unique image path
    // const imagePath = `/images/categories/${crypto.randomUUID()}-${image.name}`;

    // // Write image data to file
    // await fs.writeFile(
    //   `public${imagePath}`,
    //   Buffer.from(await image.arrayBuffer())
    // );

    const imagePath = path.join(
      process.cwd(),
      "categories",
      `${crypto.randomUUID()}-${image.name}`
    );

    // Write image data to file
    await fs.writeFile(imagePath, Buffer.from(await image.arrayBuffer()));

    // Return the image path for further use
    return imagePath;
  } catch (error) {
    console.error("Error saving image:", error);
    throw error;
  }
}

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

  // await fs.mkdir("/public/images/categories", { recursive: true });
  // const imagePath = `/images/categories/${crypto.randomUUID()}-${image.name}`;
  // await fs.writeFile(
  //   `public${imagePath}`,
  //   Buffer.from(await image.arrayBuffer())
  // );

  const imagePath = await saveImage(image);

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

  // await fs.unlink(`public${category.image}`);
  await fs.unlink(path(process.cwd(), category.image));
};
