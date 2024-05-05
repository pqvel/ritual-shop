import { FC, Fragment } from "react";
import { Container, CatalogGrid } from "@/components/ui/Wrappers";
import ProductCart from "@/components/ui/cards/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogSection from "@/components/catalog/CatalogSection";
import Pagination from "@/components/ui/Pagination";
import MainLayout from "@/components/layouts/MainLayout";
import db from "../../../db/db";
import CatalogAside from "@/components/catalog/CatalogAside";
import Link from "next/link";
import Separator from "@/components/ui/Separator";
import { declensionTextByNumber } from "@/utils/desclensionTextByNumber";
import { Title } from "@/components/ui/Typography";

// export const revalidate = 3600; // 1 hour

const getCategories = async () => {
  return await db.category.findMany({
    where: { active: true, level: 1 },
    include: {
      childCategories: {
        where: { active: true, level: 2 },
      },
    },
  });
};

const getProducts = async (currentPage: number) => {
  const countItemsPerPage = 12;
  const { _count } = await db.product.aggregate({
    _count: true,
    where: { active: true },
  });

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
    countProducts: _count,
  };
};

type Props = {
  searchParams: {
    page: string;
  };
};

const CatalogpPage: FC<Props> = async ({ searchParams: { page = "1" } }) => {
  const currentPage = Number(page);
  const [categories, { products, countPages, countProducts }] =
    await Promise.all([getCategories(), getProducts(currentPage)]);

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

          <Title level={1}>Вся продукция</Title>
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
                  <ProductCart
                    href={`/goods/${product.slug}`}
                    key={product.id}
                    product={product}
                  />
                ))}
              </CatalogGrid>
              {countPages !== 1 && (
                <Pagination
                  href="/catalog/"
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

export default CatalogpPage;
