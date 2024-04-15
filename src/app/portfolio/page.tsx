import { FC } from "react";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Wrappers";
import Pagination from "@/components/ui/Pagination";
import CatalogSection from "@/components/catalog/CatalogSection";
import CatalogTitle from "@/components/catalog/CatalogTitle";
import db from "../../../db/db";

const getPortfolioProducts = async (currentPage: number) => {
  const countItemsPerPage = 3;
  const { _count } = await db.portfolioProduct.aggregate({ _count: true });

  const items = await db.portfolioProduct.findMany({
    take: countItemsPerPage,
    skip: (currentPage - 1) * countItemsPerPage,
    where: {
      active: true,
    },
  });

  return {
    items,
    countPages: Math.ceil(_count / countItemsPerPage),
  };
};

type Props = {
  searchParams: {
    page?: string;
  };
};

const PortfolioPage: FC<Props> = async ({ searchParams: { page = "1" } }) => {
  const currentPage = Number(page);
  const { items, countPages } = await getPortfolioProducts(currentPage);

  return (
    <MainLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: "Наши работы", href: "/portfolio" },
            ]}
          />
          <CatalogTitle>Наши работы</CatalogTitle>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
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
          </div>

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

export default PortfolioPage;
