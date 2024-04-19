import { NextResponse, NextRequest } from "next/server";
import db from "../../../../../db/db";
import { z } from "zod";

const bodySchema = z.object({
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  currentPage: z.number().default(1),
  mainCategoryId: z.number().optional(),
  categoryId: z.number().optional(),
});

const countProductsPerPage = 18;

export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req.body);
  const body = await req.json();
  const bodyParsed = bodySchema.safeParse(req.body);

  if (!bodyParsed.success) {
    return NextResponse.json({
      status: 400,
      message: "Invalid request",
      error: bodyParsed.error,
    });
  }

  const searchOptions = filterUndefinedPropertyes({
    active: true,
    price: {
      gt: bodyParsed.data.minPrice,
      lt: bodyParsed.data.maxPrice,
    },
    categoryId: bodyParsed.data.categoryId,
    mainCategoryId: bodyParsed.data.mainCategoryId,
  });

  console.log(searchOptions);
  const { _count } = await db.product.aggregate({
    where: searchOptions,
    _count: true,
  });

  const page =
    _count / bodyParsed.data.currentPage > countProductsPerPage
      ? countProductsPerPage
      : Math.ceil(_count / countProductsPerPage);

  const products = await db.product.findMany({
    where: {
      active: true,
    },
    // take: countProductsPerPage,
    // skip: (page - 1) * countProductsPerPage,
  });

  return NextResponse.json({
    status: 200,
    products,
    currentPage: page,
  });
}

function filterUndefinedPropertyes(obj: any): any {
  const result: any = {};

  for (const key in obj) {
    if (obj[key] !== undefined) {
      let isEmpty = true;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        result[key] = filterUndefinedPropertyes(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result;
}
