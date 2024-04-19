import React, { FC } from "react";
import db from "../../../db/db";
import { Grid, Container, Aside, CatalogGrid } from "@/components/ui/Wrappers";
import ProductCart from "@/components/ui/cards/ProductCard";
import Separator from "@/components/ui/Separator";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogTitle from "@/components/catalog/CatalogTitle";
import CatalogSection from "@/components/catalog/CatalogSection";
import { AsideLinks } from "@/components/ui/catalog";
import Pagination from "@/components/ui/Pagination";
import MainLayout from "@/components/layouts/MainLayout";
import Loading from "./loading";
// import Pagination from "@/components/ui/Pagination";
import Catalog from "@/components/catalog/Catalog";
const getCategories = async () => {
  return await db.category.findMany({
    where: { level: 1 },
    include: { childCategories: true },
  });
};

const getProducts = async (pageNumber: number, offsetItems: number) => {
  return await db.product.findMany({
    take: offsetItems,
    skip: pageNumber,
  });
};

type Props = {
  searchParams: {
    page: string;
  };
};

const CatalogpPage: FC<Props> = async ({ searchParams }) => {
  const pageNumber = Number(searchParams.page ?? 1);
  const numberOfItems = 12;
  const offsetItems = (pageNumber - 1) * numberOfItems;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(pageNumber, offsetItems),
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
          <CatalogTitle>Памятники</CatalogTitle>
          {/* <div className="flex items-start">
            <Aside className=" mr-4"> */}
          {/* {categories.map((category) => (
                <>
                  <AsideLinks
                    title="Памятники"
                    href={`/catalog/${category.slug}`}
                    links={category.childCategories.map(({ title, slug }) => ({
                      title,
                      href: `/catalog/${category.slug}/${slug}`,
                    }))}
                  />
                  <Separator />
                </>
              ))} */}
          {/* <form className="flex flex-col">
                <input type="number" name="price" />
                <input type="checkbox" name="value" />
                <button type="submit">submit</button>
              </form>
            </Aside>
            <div className=" flex flex-col items-center w-full">
              <CatalogGrid>
                {products.map((product) => (
                  <ProductCart
                    product={product}
                    href={`/goods/${product.slug}`}
                    key={product.id}
                  />
                ))}
              </CatalogGrid>

              <Loading />
              <Pagination href="/catalog/" currentPage={2} countPages={5} />
            </div>
          </div> */}
          <Catalog
            categoriesChildren={categories.map((category) => (
              <>
                <AsideLinks
                  title="Памятники"
                  href={`/catalog/${category.slug}`}
                  links={category.childCategories.map(({ title, slug }) => ({
                    title,
                    href: `/catalog/${category.slug}/${slug}`,
                  }))}
                />
                <Separator />
              </>
            ))}
          />
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default CatalogpPage;
