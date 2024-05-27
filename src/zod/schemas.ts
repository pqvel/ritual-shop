import { title } from "process";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Required" });
export const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

export const portfolioProduct: Zod.Schema = z.object({
  image: imageSchema.refine((file: any) => file.size > 0, "Required"),
});

export const categorySchema: Zod.Schema = z.object({
  title: z.string().min(1),
  image: imageSchema.refine((file: any) => file.size > 0, "Required"),
  parentId: z
    .string()
    .optional()
    .transform((val) => val && parseInt(val, 10)),
  level: z.string().transform((val) => parseInt(val, 10)),
});

export const productSchema: Zod.Schema = z.object({
  title: z.string().min(1),
  vendorCode: z.string().min(1),
  image: imageSchema.refine((file: any) => file.size > 0, "Required"),
  isAgreementPrice: z.any().transform(Boolean),
  categoryId: z
    .string()
    .min(1)
    .transform((val) => parseInt(val, 10)),
  mainCategoryId: z
    .string()
    .min(1)
    .transform((val) => parseInt(val, 10)),
  characteristics: z
    .string()
    .min(1)
    .transform((str) => JSON.parse(str)),
  price: z
    .string()
    .optional()
    .default("0")
    .transform((val) => parseInt(val, 10)),
});

export const articleShema: Zod.Schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  contentImages: z
    .string()
    .optional()
    .default("[]")
    .transform((str) => JSON.parse(str)),
  image: imageSchema.refine((file: any) => file.size > 0, "Required"),
});
