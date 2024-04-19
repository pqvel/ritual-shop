import { Product } from "@prisma/client";
import axios from "axios";

type ReturnType = {
  products: Product[];
  currentPage: number;
};

type Params = {
  minPrice?: number;
  maxPrice?: number;
  currentPage?: number;
  mainCategoryId?: number;
  categoryId?: number;
};

export const getCatalogProducts = async (params: Params) => {
  return await axios.post<ReturnType>("/api/catalog/products", params);
};
