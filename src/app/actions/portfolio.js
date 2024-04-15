"use server";
import db from "../../../db/db";
import { portfolioProduct } from "@/zod/schemas";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPortfolioProduct = async (state, formData) => {
  const result = portfolioProduct.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;
  await fs.mkdir("public/images/portfolio", { recursive: true });
  const imagePath = `/images/portfolio/${crypto.randomUUID()}-${
    data.image.name
  }`;

  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.portfolioProduct.create({
    data: {
      image: imagePath,
    },
  });

  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
};

export const changePortfolioProductActive = async (id, isActive) => {
  return await db.portfolioProduct.update({
    where: {
      id,
    },
    data: {
      active: isActive,
    },
  });
};

export const deletePortfolioProduct = async (id) => {
  const product = await db.portfolioProduct.delete({
    where: {
      id: id,
    },
  });

  await fs.unlink(`public${product.image}`);

  return product;
};
