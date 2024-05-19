import { FC } from "react";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ChangeProductForm from "@/app/admin/_components/forms/product/ChangeProductForm";
import db from "@/db";

const getData = async (
  categorySlug: string,
  childCategorySlug: string,
  productSlug: string
) => {
  const data = await db.category.findUnique({
    where: {
      slug: categorySlug,
    },
    include: {
      childCategories: {
        where: {
          slug: childCategorySlug,
        },
        include: {
          products: {
            where: {
              slug: productSlug,
            },
            include: {
              characteristics: true,
            },
          },
        },
      },
    },
  });

  if (!data) redirect("/admin/catalog");

  return {
    category: data,
    childCategory: data!.childCategories[0],
    product: data!.childCategories[0].products[0],
    productCharacteristics:
      data?.childCategories[0].products[0].characteristics,
  };
};

type Props = {
  params: {
    categorySlug: string;
    childCategorySlug: string;
    productSlug: string;
  };
};

const ChangeProductPhage: FC<Props> = async ({
  params: { categorySlug, childCategorySlug, productSlug },
}) => {
  const { category, childCategory, product, productCharacteristics } =
    await getData(categorySlug, childCategorySlug, productSlug);

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
            title: category.title,
            href: `/admin/catalog/${category.slug}`,
          },
          {
            title: childCategory.title,
            href: `/admin/catalog/${category.slug}/${childCategory.slug}`,
          },
          {
            title: `Изменить товар "${product.title}"`,
            href: `/admin/catalog/${category.slug}/${childCategory.slug}/${product.slug}/change-product`,
          },
        ]}
      />
      <ChangeProductForm
        productId={product.id}
        initialValues={{
          product,
          productCharacteristics: productCharacteristics,
        }}
      />
    </>
  );
};

export default ChangeProductPhage;
