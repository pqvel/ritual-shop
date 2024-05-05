"use server";
import db from "../../../db/db";
import { productSchema } from "@/zod/schemas";
import fs from "fs/promises";
import path, { join } from "path";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { Product } from "@prisma/client";
export const createProduct = async (state, formData) => {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  console.log(result.error);

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const {
    title,
    vendorCode,
    image,
    categoryId,
    characteristics,
    mainCategoryId,
    price,
  } = result.data;

  const data = result.data;
  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
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
      mainCategoryId,
      price,
    },
  });

  await db.productCharacteristic.createMany({
    data: characteristics.map((char) => ({
      title: char.title,
      variants: char.values.map(({ value }) => value),
      productId: product.id,
    })),
  });
  revalidatePath("/", "page");
  revalidatePath("/", "layout");
  redirect("/admin/catalog");
};

export const changeProductActive = async (id, isActive) => {
  await db.product.update({
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

export const deleteProduct = async (id) => {
  const product = await db.product.delete({
    where: {
      id: id,
    },
  });

  await fs.unlink(`public${product.image}`);
  revalidatePath("/", "page");
  revalidatePath("/", "layout");
  return product;
};
