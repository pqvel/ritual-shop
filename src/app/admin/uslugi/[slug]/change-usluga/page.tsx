import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import db from "@/db";
import { redirect } from "next/navigation";
import ChangeUslugaForm from "@/app/admin/_components/forms/usluga/ChangeUslugaForm";

const getUsluga = async (slug: string) => {
  const data = await db.usluga.findFirst({
    where: { slug: slug },
  });

  if (!data) redirect("/admin/uslugi");

  return data;
};

type Props = {
  params: { slug: string };
};

const ChangeUslugaPage: FC<Props> = async ({ params: { slug } }) => {
  const article = await getUsluga(slug);
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
      <ChangeUslugaForm id={article.id} defaultData={article} />
    </>
  );
};

export default ChangeUslugaPage;
