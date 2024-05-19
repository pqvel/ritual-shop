import db from "@/db";

export const getFilteredProducts = async () => {
  return await db.product.findMany({
    where: {
      active: true,
      price: {},
    },
  });
};
