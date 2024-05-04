import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryForm from "@/app/admin/_components/forms/CategoryForm";

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
      {/* <CategoryForm level={1} /> */}
    </>
  );
};

export default AddCategoryPage;
