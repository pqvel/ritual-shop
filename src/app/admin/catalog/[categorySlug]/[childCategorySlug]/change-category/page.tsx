import { FC } from "react";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import EditCategoryForm from "@/app/admin/_components/forms/category/EditCategoryForm";
import db from "@/db";

const getCategory = async (categorySlug: string, childCategorySlug: string) => {
  const data = await db.category.findUnique({
    where: { slug: categorySlug },
    include: { childCategories: { where: { slug: childCategorySlug } } },
  });

  if (!data) redirect("/admin/catalog");

  return { category: data, childCategory: data.childCategories[0] };
};

type Props = {
  params: { categorySlug: string; childCategorySlug: string };
};

const AddCategoryPage: FC<Props> = async ({
  params: { categorySlug, childCategorySlug },
}) => {
  const { category, childCategory } = await getCategory(
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
            title: category.title,
            href: `/admin/catalog/${category.slug}`,
          },
          {
            title: childCategory.title,
            href: `/admin/catalog/${category.slug}/${childCategory.slug}`,
          },
          {
            title: "Изменить категорию",
            href: `/admin/catalog/${category.slug}/${childCategory.slug}/change-category`,
          },
        ]}
      />
      <EditCategoryForm
        id={category!.id}
        initialValues={{
          title: category!.title,
          image: category!.image,
        }}
      />
    </>
  );
};

export default AddCategoryPage;
