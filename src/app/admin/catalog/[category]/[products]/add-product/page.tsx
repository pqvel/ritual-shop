import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

import db from "../../../../../../../db/db";
import ProductForm from "@/app/admin/_components/forms/ProductForm";

const getData = async (categorySlug: string, productSlug: string) => {
  return await db.category.findUnique({
    where: {
      slug: categorySlug,
    },
    include: {
      childCategories: {
        where: {
          slug: productSlug,
        },
        include: {
          products: true,
        },
      },
    },
  });
};

type Props = {
  params: {
    category: string;
    products: string;
  };
};

const AddProductPage: FC<Props> = async ({ params }) => {
  const mainCategory = await getData(params.category, params.products);
  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/admin" },
          {
            title: "Каталог",
            href: "/admin/catalog",
          },
          {
            title: mainCategory!.title,
            href: `/admin/catalog/${mainCategory!.slug}`,
          },
          {
            title: mainCategory!.childCategories[0].title,
            href: `/admin/catalog/${mainCategory!.slug}/${
              mainCategory!.childCategories[0].slug
            }`,
          },
          {
            title: "Добавить товар",
            href: `/admin/catalog/${mainCategory!.slug}/${
              mainCategory!.childCategories[0].slug
            }/add-product`,
          },
        ]}
      />
      <ProductForm
        mainCategoryId={mainCategory!.id}
        categoryId={mainCategory!.childCategories[0].id}
      />
    </>
  );
};

export default AddProductPage;
