"use server";
import slugify from "slugify";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { productSchema, imageSchema } from "@/zod/schemas";
import { s3Service } from "@/services/s3";
import db from "@/db";

export const createProduct = async (state, formData) => {
  const result = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

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

  const slug = slugify(`${title}-${vendorCode}`, {
    locale: "ru",
    lower: true,
  });

  const fileExtension = image.type.split("/")[1];
  const buffer = Buffer.from(await image.arrayBuffer());
  const fileName = `products/${slug}.${Date.now()}.${fileExtension}`;
  const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
  const uploadImageUrl = `${baseUrl}/${fileName}`;

  await s3Service.uploadImage(buffer, fileName);

  const product = await db.product.create({
    data: {
      title,
      slug,
      image: uploadImageUrl,
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

  revalidatePath("/");
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

  revalidatePath("/");
};

export const deleteProduct = async (id) => {
  const product = await db.product.delete({
    where: {
      id: id,
    },
  });

  await s3Service.deleteImage(product.image);

  revalidatePath("/");
  redirect("/admin/catalog");
};

export const changeProduct = async (state, formData) => {
  const schema = z.object({
    id: z
      .string()
      .optional()
      .transform((val) => val && parseInt(val, 10)),
    title: z.string().min(1),
    vendorCode: z.string().min(1),
    image: imageSchema.optional(),
    characteristics: z
      .string()
      .min(1)
      .transform((str) => JSON.parse(str)),
    price: z
      .string()
      .min(1)
      .transform((val) => parseInt(val, 10)),
  });

  const result = schema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { id, title, vendorCode, image, characteristics, price } = result.data;

  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  });

  if (image.size !== 0) {
    await s3Service.deleteImage(product.image);

    const slug = slugify(`${title}-${vendorCode}`, {
      locale: "ru",
      lower: true,
    });

    const fileExtension = image.type.split("/")[1];
    const buffer = Buffer.from(await image.arrayBuffer());
    const fileName = `products/${slug}.${Date.now()}.${fileExtension}`;
    const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
    const uploadImageUrl = `${baseUrl}/${fileName}`;

    await s3Service.uploadImage(buffer, fileName);

    await db.product.update({
      where: {
        id: id,
      },
      data: {
        image: uploadImageUrl,
      },
    });
  }

  await db.productCharacteristic.deleteMany({
    where: {
      productId: id,
    },
  });

  const chars = characteristics.map((char) => ({
    title: char.title,
    variants: char.values.map(({ value }) => value),
    productId: id,
  }));

  console.log(chars);
  console.log(title);

  await db.productCharacteristic.createMany({
    data: chars,
  });

  await db.product.update({
    where: {
      id: id,
    },
    data: {
      title,
      vendorCode,
      price,
    },
  });

  revalidatePath("/");
  redirect("/admin/catalog");
};
