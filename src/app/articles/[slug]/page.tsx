import { FC } from "react";
import db from "@/db";
import MainLayout from "@/components/layouts/MainLayout";
import CatalogSection from "@/components/catalog/CatalogSection";
import { Container } from "@/components/ui/Wrappers";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Title } from "@/components/ui/Typography";
import { remark } from "remark";
import html from "remark-html";
import { formatDate } from "@/utils/format";

const getArticle = async (slug: string) => {
  const article = await db.article.findFirst({
    where: { slug: slug, active: true },
  });
  const processedContent = await remark().use(html).process(article!.content);
  const contentHtml = processedContent.toString();

  return {
    article,
    contentHtml,
  };
};

type Props = {
  params: {
    slug: string;
  };
};

const ArticlePage: FC<Props> = async ({ params }) => {
  const { article, contentHtml } = await getArticle(params.slug);

  return (
    <MainLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: "Статьи", href: "/articles" },
              { title: article!.title, href: `/articles/${article!.slug}` },
            ]}
          />
          <span className=" text-gray-400 font-semibold">
            {formatDate(article!.createdAt)}
          </span>
          <Title level={1}>{article!.title}</Title>
          <div className="bg-white p-4 rounded-lg grid grid-cols-[2fr,1fr] gap-20 shadow-sm">
            <div
              className="markdown-content flex flex-col"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default ArticlePage;
