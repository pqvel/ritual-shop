import { FC } from "react";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CreateCategoryForm from "@/app/admin/_components/forms/category/CreateCategoryForm";
import db from "@/db";

const getCategories = async (slug: string) => {
  const data = await db.category.findUnique({
    where: { slug },
  });

  if (!data) return redirect("/admin/catalog");

  return { category: data };
};

type Props = {
  params: { categorySlug: string };
};

const AddCategoryPage: FC<Props> = async ({ params: { categorySlug } }) => {
  const { category } = await getCategories(categorySlug);

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
            title: "Добавить категорию",
            href: `/admin/catalog/${category.slug}/add-category`,
          },
        ]}
      />
      <CreateCategoryForm level={2} parentId={category.id} />
    </>
  );
};

export default AddCategoryPage;
