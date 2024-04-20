import React, { FC } from "react";
import { Container, CatalogGrid } from "@/components/ui/Wrappers";
import ProductCart from "@/components/ui/cards/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogTitle from "@/components/catalog/CatalogTitle";
import CatalogSection from "@/components/catalog/CatalogSection";
import Pagination from "@/components/ui/Pagination";
import MainLayout from "@/components/layouts/MainLayout";
import db from "../../../db/db";
import CatalogAside from "@/components/catalog/CatalogAside";

const getCategories = async () => {
  return await db.category.findMany({
    where: { level: 1 },
    include: { childCategories: true },
  });
};

const getProducts = async (currentPage: number) => {
  const countItemsPerPage = 1;
  const { _count } = await db.portfolioProduct.aggregate({ _count: true });

  const products = await db.product.findMany({
    take: countItemsPerPage,
    skip: (currentPage - 1) * countItemsPerPage,
    where: {
      active: true,
    },
  });

  return {
    products,
    countPages: Math.ceil(_count / countItemsPerPage),
  };
};

type Props = {
  searchParams: {
    page: string;
  };
};

const CatalogpPage: FC<Props> = async ({ searchParams: { page = "1" } }) => {
  const currentPage = Number(page);
  const [categories, { countPages, products }] = await Promise.all([
    getCategories(),
    getProducts(currentPage),
  ]);

  return (
    <MainLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: "Каталог", href: "/catalog" },
            ]}
          />
          <CatalogTitle>Каталог</CatalogTitle>
          <div className="flex items-start">
            <CatalogAside categories={categories} />
            <div className="flex flex-col items-center w-full">
              <CatalogGrid>
                {products.map((product) => (
                  <ProductCart
                    href={`/goods/${product.slug}`}
                    key={product.id}
                    product={product}
                  />
                ))}
              </CatalogGrid>
              <Pagination
                href="/catalog/"
                currentPage={currentPage}
                countPages={countPages}
              />
            </div>
          </div>
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default CatalogpPage;
