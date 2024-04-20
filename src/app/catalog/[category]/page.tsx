import { FC } from "react";
import { Container } from "@/components/ui/Wrappers";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogTitle from "@/components/catalog/CatalogTitle";
import CatalogSection from "@/components/catalog/CatalogSection";
import db from "../../../../db/db";
import ProductCart from "@/components/ui/cards/ProductCard";
import MainLayout from "@/components/layouts/MainLayout";
import CatalogAside from "@/components/catalog/CatalogAside";
import { CatalogGrid } from "@/components/ui/Wrappers";
import Pagination from "@/components/ui/Pagination";

const getCategories = async () => {
  return await db.category.findMany({
    where: { active: true },
    include: {
      childCategories: {
        where: { active: true },
      },
    },
  });
};

const getCurrentCategory = async (slug: string) => {
  return await db.category.findUnique({
    where: { slug: slug, active: true },
    include: {
      childCategories: {
        where: { active: true },
      },
    },
  });
};

const getProducts = async (currentPage: number, categorySlug: string) => {
  const countItemsPerPage = 1;

  const mainCategory = await db.category.findUnique({
    where: {
      active: true,
      slug: categorySlug,
    },
  });

  const { _count } = await db.product.aggregate({
    _count: true,
    where: { active: true, mainCategoryId: mainCategory!.id },
  });

  const products = await db.product.findMany({
    take: countItemsPerPage,
    skip: (currentPage - 1) * countItemsPerPage,
    where: {
      active: true,
      mainCategoryId: mainCategory!.id,
    },
  });

  return {
    products,
    countPages: Math.ceil(_count / countItemsPerPage),
  };
};

type Props = {
  params: {
    category: string;
  };
  searchParams: {
    page: string;
  };
};

const CatalogLvl2Page: FC<Props> = async ({
  params,
  searchParams: { page = "1" },
}) => {
  const currentPage = Number(page);
  const [categories, mainCategory, { products, countPages }] =
    await Promise.all([
      getCategories(),
      getCurrentCategory(params.category),
      getProducts(currentPage, params.category),
    ]);

  return (
    <MainLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: "Каталог", href: "/catalog" },
              {
                title: mainCategory!.title,
                href: `/catalog/${mainCategory!.slug}`,
              },
            ]}
          />
          <CatalogTitle>{mainCategory!.title}</CatalogTitle>
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
              {countPages !== 1 && (
                <Pagination
                  href={`/catalog/${mainCategory!.slug}`}
                  currentPage={currentPage}
                  countPages={countPages}
                />
              )}
            </div>
          </div>
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default CatalogLvl2Page;
