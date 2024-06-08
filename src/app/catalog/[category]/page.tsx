import { FC } from "react";
import { Container } from "@/components/ui/Wrappers";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogSection from "@/components/catalog/CatalogSection";
import db from "../../../../db/db";
import ProductCart from "@/components/ui/cards/ProductCard";
import MainLayout from "@/components/layouts/MainLayout";
import CatalogAside from "@/components/catalog/CatalogAside";
import { CatalogGrid } from "@/components/ui/Wrappers";
import Pagination from "@/components/ui/Pagination";
import { Title } from "@/components/ui/Typography";
import { Fragment } from "react";
import { declensionTextByNumber } from "@/utils/desclensionTextByNumber";
import Link from "next/link";
import Separator from "@/components/ui/Separator";

// export const revalidate = 3600; // 1 hour

const getCategories = async () => {
  return await db.category.findMany({
    where: { active: true, level: 1 },
    orderBy: {
      id: "asc",
    },
    include: {
      childCategories: {
        where: { active: true, level: 2 },
        orderBy: {
          id: "asc",
        },
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
  const countItemsPerPage = 12;

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
    countProducts: _count,
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
  const [categories, mainCategory, { products, countPages, countProducts }] =
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
          <Title level={1}>{mainCategory!.title}</Title>
          <div className="flex flex-col lg:flex-row items-start">
            <div className="flex flex-col justify-between items-end mb-4 sm:flex-row w-full lg:w-auto">
              <span className="text-slate-400 mb-2 sm:mb-0 lg:hidden">
                {declensionTextByNumber(countProducts, [
                  `Найдено 0 товаров`,
                  `Найдено ${countProducts} товара`,
                  `Найден ${countProducts} товаров`,
                ])}
              </span>
              <CatalogAside>
                {categories.map((category, i) => (
                  <Fragment key={category.id}>
                    <Link
                      className=" font-bold text-xl mb-2 transition lg:hover:underline underline-offset-2"
                      href={`/catalog/${category.slug}`}
                      key={category.id}
                    >
                      {category.title}
                    </Link>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {category.childCategories.map((childCategory) => (
                        <li className="flex" key={childCategory.id}>
                          <Link
                            className=" text-gray-600 transition lg:hover:text-gray-700 lg:hover:underline underline-offset-2"
                            href={`/catalog/${category.slug}/${childCategory.slug}`}
                          >
                            {childCategory.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {i !== categories.length - 1 && <Separator />}
                  </Fragment>
                ))}
              </CatalogAside>
            </div>
            <div className="flex flex-col items-center w-full">
              <CatalogGrid>
                {products.map((product) => (
                  <ProductCart key={product.id} product={product} />
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
