import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ArticleForm from "../../_components/forms/ArticleForm";

const AddArticlePage: FC = async () => {
  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/admin" },
          {
            title: "Статьи",
            href: "/admin/articles",
          },
          {
            title: "Добавить статью",
            href: `/admin/articles/add-article`,
          },
        ]}
      />
      <ArticleForm />
    </>
  );
};

export default AddArticlePage;
