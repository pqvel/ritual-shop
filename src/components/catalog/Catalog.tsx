"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@prisma/client";
import { CatalogGrid } from "../ui/Wrappers";
import { getCatalogProducts } from "@/services/getProducts";
import ProductCart, { ProductCardSkeleton } from "../ui/cards/ProductCard";
import { createArray } from "@/utils/createArray";
import PriceSlider from "../ui/catalog/priceSlider/PriceSlider";
type Props = {
  mainCategoryId?: string;
  categoryId?: string;
  categoriesChildren?: ReactNode;
};

const enum CatalogStatuses {
  Loading = "LOADING",
  IDLE = "IDLE",
  Error = "ERROR",
}

type CatalogFormValues = {
  minPrice?: number;
  maxPrice?: number;
};

const Catalog: FC<Props> = ({
  mainCategoryId,
  categoryId,
  categoriesChildren,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [status, setStatus] = useState<CatalogStatuses>(
    CatalogStatuses.Loading
  );

  const [price, setPrice] = useState<{ min: number; max: number }>({
    min: 0,
    max: 200,
  });
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<CatalogFormValues>();

  useEffect(() => {
    getCatalogProducts({
      currentPage,
    })
      .then(({ data }) => {
        setProducts(data.products);
        setCurrentPage(data.currentPage);
        setStatus(CatalogStatuses.IDLE);
      })
      .catch(() => {
        setStatus(CatalogStatuses.Error);
      });
  }, []);

  return (
    <div className="grid grid-cols-[320px_1fr] gap-4">
      <aside className="flex flex-col bg-white rounded p-4">
        {categoriesChildren}
        <PriceSlider
          min={0}
          max={1000}
          onChange={(a) => {
            console.log(a);
          }}
        />
      </aside>
      <CatalogProducts status={status} products={products} />
    </div>
  );
};

export default Catalog;

type CatalogProductsProps = {
  status: CatalogStatuses;
  products: Product[];
};

const CatalogProducts: FC<CatalogProductsProps> = ({ status, products }) => {
  if (status === CatalogStatuses.Loading) {
    return (
      <CatalogGrid>
        {createArray(18).map((item) => (
          <ProductCardSkeleton key={item} />
        ))}
      </CatalogGrid>
    );
  }

  if (status === CatalogStatuses.Error) {
    return (
      <CatalogGrid>
        {createArray(18).map((item) => (
          <ProductCardSkeleton key={item} />
        ))}
      </CatalogGrid>
    );
  }

  if (status === CatalogStatuses.IDLE) {
    return (
      <CatalogGrid>
        {products.map((product) => (
          <ProductCart
            key={product.id}
            product={product}
            href={`/goods/${product.slug}`}
          />
        ))}
      </CatalogGrid>
    );
  }
};
