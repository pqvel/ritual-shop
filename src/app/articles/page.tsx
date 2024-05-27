import { FC } from "react";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import CatalogSection from "@/components/catalog/CatalogSection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Container, Grid } from "@/components/ui/Wrappers";
import Pagination from "@/components/ui/Pagination";
import { Title } from "@/components/ui/Typography";
import db from "@/db";
import ArticleCart from "@/components/ui/cards/ArticleCard";

type Props = {
  searchParams: {
    page: string;
  };
};

const getArticles = async (currentPage: number) => {
  const countItemsPerPage = 12;

  const articles = await db.article.findMany({
    take: countItemsPerPage,
    skip: (currentPage - 1) * countItemsPerPage,
    where: {
      active: true,
    },
  });

  return {
    articles,
    countPages: Math.ceil(articles.length / countItemsPerPage),
    countProducts: articles.length,
  };
};

const ArticlesPage: FC<Props> = async ({ searchParams: { page = "1" } }) => {
  const currentPage = Number(page);
  const { articles, countPages, countProducts } = await getArticles(
    currentPage
  );

  return (
    <MainLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: "Статьи", href: "/articles" },
            ]}
          />
          <Title level={1}>Статьи</Title>

          <Grid>
            {articles.map((product) => (
              <ArticleCart article={product} />
            ))}
          </Grid>
          {countPages > 1 && (
            <Pagination
              href="/portfolio/"
              currentPage={currentPage}
              countPages={countPages}
            />
          )}
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default ArticlesPage;
