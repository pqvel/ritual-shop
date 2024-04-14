"use server";
import db from "../../../db/db";
import { productSchema } from "@/zod/schemas";
import fs from "fs/promises";
import path, { join } from "path";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createProduct = async (state, formData) => {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { title, vendorCode, image, categoryId, characteristics } = result.data;

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const imagePath = join("/", "tmp", "products", image.name);
  await fs.writeFile(imagePath, buffer);
  console.log(`open ${imagePath} to see the iploaded file`);

  const product = await db.product.create({
    data: {
      title,
      slug: slugify(`${title}-${vendorCode}`, {
        locale: "ru",
        lower: true,
      }),
      image: path,
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
