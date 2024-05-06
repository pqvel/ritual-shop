import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import EditCategoryForm from "@/app/admin/_components/forms/category/EditCategoryForm";
import db from "@/db";
import { redirect } from "next/navigation";

const getCategory = async (categorySlug: string) => {
  const data = await db.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!data) redirect("/admin/catalog");

  return { category: data };
};

type Props = {
  params: { categorySlug: string };
};

const AddCategoryPage: FC<Props> = async ({ params: { categorySlug } }) => {
  const { category } = await getCategory(categorySlug);
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
            title: "Изменить категоорию",
            href: `/admin/catalog/${category.slug}/add-category`,
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
