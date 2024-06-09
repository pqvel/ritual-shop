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

const getUsluga = async (slug: string) => {
  const usluga = await db.usluga.findFirst({
    where: { slug: slug, active: true },
  });
  const processedContent = await remark().use(html).process(usluga!.content);
  const contentHtml = processedContent.toString();

  return {
    usluga,
    contentHtml,
  };
};

type Props = {
  params: {
    slug: string;
  };
};

const UslugaPage: FC<Props> = async ({ params }) => {
  const { usluga, contentHtml } = await getUsluga(params.slug);

  return (
    <MainLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: usluga!.title, href: `/uslugi/${usluga!.slug}` },
            ]}
          />
          <span className=" text-gray-400 font-semibold">
            {formatDate(usluga!.createdAt)}
          </span>
          <Title level={1}>{usluga!.title}</Title>
          <div className="bg-white p-4 rounded-lg grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-20 shadow-sm">
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

export default UslugaPage;
