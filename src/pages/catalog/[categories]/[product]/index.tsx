import CatalogSection from "@/components/catalog/CatalogSection";
import RootLayout from "@/pages/layout";
import { Container } from "@/components/ui/Wrappers";
import { FC } from "react";
import CatalogTitle from "@/components/catalog/CatalogTitle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Image from "next/image";
import { Select } from "@/components/ui/Select";
const ProductPage: FC = () => {
  return (
    <RootLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: "Памятники", href: "/catalog" },
              {
                title: "Одиночные памятники",
                href: "/catalog/odinocnie-pamyatniki/",
              },
              {
                title: "Памятник из гранита горизонтальный В-01",
                href: "/catalog/odinocnie-pamyatniki/maket",
              },
            ]}
          />
          <CatalogTitle>Памятник из гранита горизонтальный В-01</CatalogTitle>
          <div className="flex bg-white p-4">
            <Image
              className="mr-4"
              src="/images/476.jpg"
              width={500}
              height={500}
              alt="Памятник из гранита горизонтальный В-01"
            />
            <div className="flex flex-col w-full mr-4">
              <Select
                className="w-full mb-3"
                currentValue="100 x 50 x 8"
                values={["100 x 50 x 8", "60 x 70 x 10", "20 x 30 x 70"]}
                name="size"
                setCurrentValue={() => {}}
              />
              <Select
                className="w-full mr-4"
                currentValue="Гранит"
                values={["100 x 50 x 8", "60 x 70 x 10", "20 x 30 x 70"]}
                name="size"
                setCurrentValue={() => {}}
              />
            </div>

            <div>Итоговая стоимость</div>
          </div>
        </Container>
      </CatalogSection>
    </RootLayout>
  );
};

export default ProductPage;
