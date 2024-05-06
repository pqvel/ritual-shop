import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CreateCategoryForm from "@/app/admin/_components/forms/category/CreateCategoryForm";

const AddCategoryPage: FC = () => {
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
            title: "Добавить категорию",
            href: `/admin/catalog/add-category`,
          },
        ]}
      />
      <CreateCategoryForm level={1} />
    </>
  );
};

export default AddCategoryPage;
