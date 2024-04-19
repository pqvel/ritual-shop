import db from "../../../db/db";

export const getFilteredProducts = async () => {
  return await db.product.findMany({
    where: {
      active: true,
      price: {},
    },
  });
};
