"use server";
import { revalidatePath } from "next/cache";

export const createCategory = async (
  formState: any,
  formData: FormData
): Promise<any> => {
  revalidatePath("/");

  return {
    message: "Message created",
  };
};

// "use server";
// import db from "../../db/db";
// import { z } from "zod";
// import fs from "fs/promises";
// import { slugify } from "@/utils/slug";

// const fileSchema = z.instanceof(File, { message: "Required" });
// const imageSchema = fileSchema.refine(
//   (file) => file.size === 0 || file.type.startsWith("image/")
// );
// const categorySchema = z.object({
//   title: z.string().min(1),
//   image: imageSchema.refine((file) => file.size > 0, "Required"),
//   parentId: z.number().nullable(),
//   level: z.number(),
// });

// export const createCategory = async (prevState, formData: FormData) => {
//   // const parentCateg
//   const result = categorySchema.safeParse(
//     Object.fromEntries(formData.entries())
//   );

//   console.log(result.success);
//   if (result.success === false) return result.error.formErrors.fieldErrors;

//   const { title, image, parentId, level } = result.data;

//   await fs.mkdir("../public/images/categories", { recursive: true });
//   const imagePath = `/images/categories/${crypto.randomUUID()}-${image.name}`;
//   await fs.writeFile(
//     `public${imagePath}`,
//     Buffer.from(await image.arrayBuffer())
//   );

//   await db.category.create({
//     data: {
//       title,
//       slug: slugify(title),
//       image: imagePath,
//       parentId,
//       level,
//     },
//   });
// };
