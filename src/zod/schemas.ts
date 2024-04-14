import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

export const categorySchema: Zod.Schema = z.object({
  title: z.string().min(1),
  image: imageSchema.refine((file: any) => file.size > 0, "Required"),
  parentId: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  level: z.string().transform((val) => parseInt(val, 10)),
});

export const productSchema: Zod.Schema = z.object({
  title: z.string().min(1),
  vendorCode: z.string().min(1),
  image: imageSchema.refine((file: any) => file.size > 0, "Required"),
  categoryId: z
    .string()
    .min(1)
    .transform((val) => parseInt(val, 10)),
  characteristics: z
    .string()
    .min(1)
    .transform((str) => JSON.parse(str)),
});
