import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

import db from "../../../../../../db/db";
import { redirect } from "next/navigation";
// import CategoryForm from "@/app/admin/_components/forms/CategoryForm";

type Props = {
  params: { category: string };
};

const getCategories = async (slug: string) => {
  const data = await db.category.findUnique({
    where: { slug },
  });

  if (!data) return redirect("/admin/catalog");

  return data;
};

const AddCategoryPage: FC<Props> = async ({ params }) => {
  const parentCategory = await getCategories(params.category);

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
            title: parentCategory.title,
            href: `/admin/catalog/${parentCategory.slug}`,
          },
          {
            title: "Добавить категорию",
            href: `/admin/catalog/${parentCategory.slug}/add-category`,
          },
        ]}
      />
      {/* <CategoryForm level={2} parentId={parentCategory.id} /> */}
    </>
  );
};

export default AddCategoryPage;
