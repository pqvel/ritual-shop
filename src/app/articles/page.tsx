import { FC } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import CatalogSection from "@/components/catalog/CatalogSection";
import { Container } from "@/components/ui/Wrappers";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Title } from "@/components/ui/Typography";

const ArticlesPage: FC = () => {
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
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default ArticlesPage;
