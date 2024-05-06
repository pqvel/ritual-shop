import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

import db from "../../../../../../../db/db";
import ProductForm from "@/app/admin/_components/forms/ProductForm";

const getData = async (categorySlug: string, childCategorySLug: string) => {
  const data = await db.category.findUnique({
    where: {
      slug: categorySlug,
    },
    include: {
      childCategories: {
        where: {
          slug: childCategorySLug,
        },
      },
    },
  });

  return {
    category: data,
    childCategory: data!.childCategories[0],
  };
};

type Props = {
  params: {
    categorySlug: string;
    childCategorySlug: string;
  };
};

const AddProductPage: FC<Props> = async ({
  params: { categorySlug, childCategorySlug },
}) => {
  const { category, childCategory } = await getData(
    categorySlug,
    childCategorySlug
  );
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
            title: category!.title,
            href: `/admin/catalog/${category!.slug}`,
          },
          {
            title: childCategory.title,
            href: `/admin/catalog/${category!.slug}/${childCategory.slug}`,
          },
          {
            title: "Добавить товар",
            href: `/admin/catalog/${category!.slug}/${
              childCategory.slug
            }/add-product`,
          },
        ]}
      />
      <ProductForm
        mainCategoryId={category!.id}
        categoryId={childCategory.id}
      />
    </>
  );
};

export default AddProductPage;
