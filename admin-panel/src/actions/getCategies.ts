import db from "../../db/db";

export const getCategories = async () => {
  return await db.category.findMany();
};
