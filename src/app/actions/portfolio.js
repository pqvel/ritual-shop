"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { portfolioProduct } from "@/zod/schemas";
import { s3Service } from "@/services/s3";
import db from "@/db";

export const createPortfolioProduct = async (state, formData) => {
  const result = portfolioProduct.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { image } = result.data;

  const fileExtension = image.type.split("/")[1];
  const buffer = Buffer.from(await image.arrayBuffer());
  const fileName = `portfolio/${Date.now()}.${fileExtension}`;
  const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
  const uploadImageUrl = `${baseUrl}/${fileName}`;

  await s3Service.uploadImage(buffer, fileName);

  await db.portfolioProduct.create({
    data: {
      image: uploadImageUrl,
    },
  });

  revalidatePath("/");
  redirect("/admin/portfolio");
};

export const changePortfolioProductActive = async (id, isActive) => {
  await db.portfolioProduct.update({
    where: {
      id,
    },
    data: {
      active: isActive,
    },
  });
  revalidatePath("/");
};

export const deletePortfolioProduct = async (id) => {
  const product = await db.portfolioProduct.delete({
    where: {
      id: id,
    },
  });

  await s3Service.deleteImage(product.image);

  revalidatePath("/");
  redirect("/admin/portfolio");
};
