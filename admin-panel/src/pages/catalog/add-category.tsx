import { FC } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import CategoryForm from "@/components/forms/CategoryForm";

const AddCategoryPage: FC = () => {
  return (
    <AdminLayout>
      <BreadcrumbNav
        items={[
          { title: "Главная", href: "/" },
          {
            title: "Каталог",
            href: "/catalog",
          },
          {
            title: "Добавить категорию",
            href: `/catalog/add-category`,
          },
        ]}
      />
      <CategoryForm />
    </AdminLayout>
  );
};

export default AddCategoryPage;
