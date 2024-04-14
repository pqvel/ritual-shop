"use server";
import db from "../../../db/db";
import { productSchema } from "@/zod/schemas";
import fs from "fs/promises";
import path from "path";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function saveImage(image) {
  try {
    // Create directory if it doesn't exist
    // await fs.mkdir(directory, { recursive: true });

    // Generate unique image path
    // `/images/products/${crypto.randomUUID()}-${image.name}`;
    const imagePath = path.join(
      process.cwd(),
      "products",
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

export const createProduct = async (state, formData) => {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { title, vendorCode, image, categoryId, characteristics } = result.data;

  const imagePath = await saveImage(image);

  const product = await db.product.create({
    data: {
      title,
      slug: slugify(`${title}-${vendorCode}`, {
        locale: "ru",
        lower: true,
      }),
      image: imagePath,
      categoryId,
      vendorCode,
    },
  });

  await db.productCharacteristic.createMany({
    data: characteristics.map((char) => ({
      title: char.title,
      variants: char.values,
      productId: product.id,
    })),
  });

  revalidatePath("/admin/catalog");
  redirect("/admin/catalog");
};

export const changeProductActive = async (id, isActive) => {
  return await db.category.update({
    where: {
      id,
    },
    data: {
      active: isActive,
    },
  });
};

export const deleteProduct = async (id) => {
  const product = await db.product.delete({
    where: {
      id: id,
    },
  });

  await fs.unlink(path(process.cwd(), category.image));

  return product;
};
