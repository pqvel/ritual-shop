"use server";
import db from "../../../db/db";
import { productSchema } from "@/zod/schemas";
import fs from "fs/promises";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createProduct = async (state, formData) => {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { title, vendorCode, image, categoryId, characteristics } = result.data;

  await fs.mkdir("/public/images/products", { recursive: true });
  const imagePath = `/images/products/${crypto.randomUUID()}-${image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await image.arrayBuffer())
  );

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

  await fs.unlink(`public${category.image}`);

  return product;
};