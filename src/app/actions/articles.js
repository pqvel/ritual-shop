"use server";
import db from "../../../db/db";
import { articleShema } from "@/zod/schemas";
import fs from "fs/promises";

import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createArticle = async (state, formData) => {
  const result = articleShema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const { title, content, image } = result.data;
  await fs.mkdir("public/articles", { recursive: true });
  const imagePath = `/articles/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  const article = await db.article.create({
    data: {
      title,
      slug: slugify(title, {
        locale: "ru",
        lower: true,
      }),
      image: imagePath,
      content: content,
    },
  });

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
};

export const changeProductActive = async (id, isActive) => {
  return await db.product.update({
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

  await fs.unlink(`public${product.image}`);

  return product;
};
