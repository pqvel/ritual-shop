import { FC } from "react";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import CatalogSection from "@/components/catalog/CatalogSection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Wrappers";
import Pagination from "@/components/ui/Pagination";
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
          {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {items.map((product) => (
              <Image
                className="w-full cursor-pointer"
                width={750}
                height={750}
                src={product.image}
                alt=""
                key={product.id}
              />
            ))}
          </div> */}
          {/* {countPages > 1 && (
            <Pagination
              href="/portfolio/"
              currentPage={currentPage}
              countPages={countPages}
            />
          )} */}
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default ArticlesPage;
