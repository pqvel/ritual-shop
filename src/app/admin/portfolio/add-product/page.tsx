import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PortfolioForm from "../../_components/forms/PortfolioForm";

const AddCategoryPage: FC = async () => {
  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/admin" },
          {
            title: "Портфолио",
            href: "/admin/portfolio",
          },
          {
            title: "Добавить изображение",
            href: `/admin/catalog/app-product`,
          },
        ]}
      />
      <PortfolioForm />
    </>
  );
};

export default AddCategoryPage;
