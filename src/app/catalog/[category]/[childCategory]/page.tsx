import { FC } from "react";
import { Container } from "@/components/ui/Wrappers";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogTitle from "@/components/catalog/CatalogTitle";
import CatalogSection from "@/components/catalog/CatalogSection";
import db from "../../../../../db/db";
import CatalogAside from "@/components/catalog/CatalogAside";
import { CatalogGrid } from "@/components/ui/Wrappers";
import Pagination from "@/components/ui/Pagination";
import ProductCart from "@/components/ui/cards/ProductCard";
import MainLayout from "@/components/layouts/MainLayout";

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

const getCurrentCategories = async (
  mainCategorySlug: string,
  childCategorySlug: string
) => {
  return await db.category.findUnique({
    where: { slug: mainCategorySlug, active: true },
    include: {
      childCategories: {
        where: { slug: childCategorySlug, active: true },
      },
    },
  });
};

const getProducts = async (
  currentPage: number,
  categorySlug: string,
  childCategorySlug: string
) => {
  const countItemsPerPage = 1;

  const category = await db.category.findUnique({
    where: {
      active: true,
      slug: categorySlug,
      level: 1,
    },
    include: {
      childCategories: {
        where: {
          active: true,
          slug: childCategorySlug,
        },
        include: {
          products: {
            where: { active: true },
          },
        },
      },
    },
  });

  const { _count } = await db.product.aggregate({
    _count: true,
    where: {
      active: true,
      mainCategoryId: category!.id,
      categoryId: category!.childCategories[0].id,
    },
  });

  const products = await db.product.findMany({
    take: countItemsPerPage,
    skip: (currentPage - 1) * countItemsPerPage,
    where: {
      active: true,
      mainCategoryId: category!.id,
      categoryId: category!.childCategories[0].id,
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
    childCategory: string;
  };
  searchParams: {
    page: string;
  };
};

const CatalogLvl2Page: FC<Props> = async ({
  params: { category, childCategory },
  searchParams: { page = "1" },
}) => {
  const currentPage = Number(page);
  const [categories, currentCategories, { products, countPages }] =
    await Promise.all([
      getCategories(),
      getCurrentCategories(category, childCategory),
      getProducts(currentPage, category, childCategory),
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
                title: currentCategories!.title,
                href: `/catalog/${currentCategories!.slug}`,
              },
              {
                title: currentCategories!.childCategories[0].title,
                href: `/catalog/${currentCategories!.slug}/${
                  currentCategories?.childCategories[0].slug
                }`,
              },
            ]}
          />
          <CatalogTitle>
            {currentCategories!.childCategories[0].title}
          </CatalogTitle>
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
                  href={`/catalog/${currentCategories!.slug}/${
                    currentCategories?.childCategories[0].slug
                  }`}
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
