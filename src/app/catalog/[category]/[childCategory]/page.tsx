import { FC } from "react";
import Link from "next/link";
import { Grid, Container, Aside } from "@/components/ui/Wrappers";
import Separator from "@/components/ui/Separator";
import { Checkbox } from "@/components/ui/formItems/Input";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogTitle from "@/components/catalog/CatalogTitle";
import CatalogSection from "@/components/catalog/CatalogSection";
import db from "../../../../../db/db";
import { AsideLinks } from "@/components/ui/catalog";
import ProductCart from "@/components/ui/cards/ProductCard";
import MainLayout from "@/components/layouts/MainLayout";

const getCategories = async (slug: string, childCategory: string) => {
  const category = await db.category.findUnique({
    where: { level: 1, slug },
    include: {
      childCategories: {
        where: {
          slug: childCategory,
        },
        include: {
          products: {
            include: {
              characteristics: true,
            },
          },
        },
      },
    },
  });

  const products = category!.childCategories.flatMap(
    (childCategory) => childCategory.products
  );

  return {
    category,
    products,
  };
};

type Props = {
  params: {
    category: string;
    childCategory: string;
  };
};

const CatalogLvl2Page: FC<Props> = async ({ params }) => {
  const { category, products } = await getCategories(
    params.category,
    params.childCategory
  );
  return (
    <MainLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: "Каталог", href: "/catalog" },
              { title: category!.title, href: `/catalog/${category!.slug}` },
              {
                title: category!.childCategories[0].title,
                href: `/catalog/${category!.slug}/${
                  category!.childCategories[0].slug
                }`,
              },
            ]}
          />
          <CatalogTitle>{category!.title}</CatalogTitle>
          <div className="flex items-start">
            <Aside className=" mr-4">
              {/* <AsideLinks
              title={category!.title}
              href={`/catalog/${category!.slug}`}
              links={category!.childCategories.map(({ title, slug }) => ({
                title,
                href: `/catalog/${category!.slug}/${slug}`,
              }))}
            /> */}

              {/* <Separator /> */}
              {/* <RangeSlider min={10} max={100} onChange={() => {}} /> */}
              {/* <Separator /> */}
              <div>
                <div className=" font-medium mb-2">Материал</div>
                <div className="grid grid-cols-1 gap-2">
                  <Checkbox name="material" value="1" label="Гранит" />
                  <Checkbox name="material" value="2" label="Гранит" />
                  <Checkbox name="material" value="3" label="Гранит" />
                  <Checkbox name="material" value="4" label="Гранит" />
                </div>
              </div>
            </Aside>
            <div className="flex flex-col items-center w-full">
              <Grid>
                {products.map((product) => (
                  <ProductCart
                    product={product}
                    href={`/goods/${product.slug}`}
                    key={product.id}
                  />
                ))}
              </Grid>
              {/* <Pagination /> */}
            </div>
          </div>
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default CatalogLvl2Page;
