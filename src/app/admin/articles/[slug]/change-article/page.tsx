import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import db from "@/db";
import { redirect } from "next/navigation";
import ChangeArticleForm from "@/app/admin/_components/forms/article/ChangeArticleForm";

const getArticle = async (slug: string) => {
  const data = await db.article.findFirst({
    where: { slug: slug },
  });

  if (!data) redirect("/admin/articles");

  return data;
};

type Props = {
  params: { categorySlug: string };
};

const ChangeArticlePage: FC<Props> = async ({ params: { categorySlug } }) => {
  const article = await getArticle(categorySlug);
  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/admin" },
          {
            title: "Каталог",
            href: "/admin/articles",
          },
          {
            title: "Изменить лекцию",
            href: `/admin/catalog/${article.slug}/change-article`,
          },
        ]}
      />
      <ChangeArticleForm id={article.id} defaultData={article} />
    </>
  );
};

export default ChangeArticlePage;
