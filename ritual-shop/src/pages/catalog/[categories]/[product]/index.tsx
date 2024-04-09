import CatalogSection from "@/components/catalog/CatalogSection";
import RootLayout from "@/pages/layout";
import { Container, Grid } from "@/components/ui/Wrappers";
import { FC } from "react";
import CatalogTitle from "@/components/catalog/CatalogTitle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Image from "next/image";
import { Select } from "@/components/ui/Select";
import ProductCart from "@/components/ui/cards/ProductCard";
import { v4 } from "uuid";
import { useState } from "react";
import { ProductCartType } from "@/assets/types";
import { SectionTitle, SectionTitleGroup } from "@/components/ui/Section";
const ProductPage: FC = () => {
  const [popupularProducts] = useState<ProductCartType[]>([
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/odinochiy",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/odinochiy",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-11",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/odinochiy",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/odinochiy",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
  ]);
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
          <div className="flex bg-white p-4 mb-4">
            <Image
              className="mr-4"
              src="/images/476.jpg"
              width={500}
              height={500}
              alt="Памятник из гранита горизонтальный В-01"
            />
            <div className="flex flex-col w-full mr-4">
              Размер
              <Select
                className="w-full mb-3"
                currentValue="100 x 50 x 8"
                values={["100 x 50 x 8", "60 x 70 x 10", "20 x 30 x 70"]}
                name="size"
                setCurrentValue={() => {}}
              />
              Материал
              <Select
                className="w-full mb-3 "
                currentValue="Гранит"
                values={["100 x 50 x 8", "60 x 70 x 10", "20 x 30 x 70"]}
                name="size"
                setCurrentValue={() => {}}
              />
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col bg-gray-200 p-3">
                  Текст
                  <label>
                    <input type="radio" name="text" />
                    без текста
                  </label>
                  <label>
                    <input type="radio" name="text" />
                    пескоструй
                  </label>
                  <label>
                    <input type="radio" name="text" />
                    кадиати
                  </label>
                  <label>
                    <input type="radio" name="text" />
                    сусальное золото
                  </label>
                </div>
                <div className="flex flex-col bg-gray-200 p-3">
                  Изображение
                  <label>
                    <input type="radio" name="photo" />
                    без изображения
                  </label>
                  <label>
                    <input type="radio" name="photo" />
                    медальон
                  </label>
                  <label>
                    <input type="radio" name="photo" />
                    портетр
                  </label>
                </div>
              </div>
              <div className="flex flex-col bg-gray-200 p-3">
                Оформление цветочника
                <label>
                  <input type="radio" name="flour" />
                  цветник
                </label>
                <label>
                  <input type="radio" name="flour" />
                  фигурная плитка
                </label>
                <label>
                  <input type="radio" name="flour" />
                  надгробная плита
                </label>
              </div>
            </div>

            <div>Итоговая стоимость</div>
          </div>
          <div className="flex bg-white p-4 mb-4">описание</div>
          <SectionTitleGroup>
            <SectionTitle>Похожие товары</SectionTitle>
          </SectionTitleGroup>
          <Grid>
            {popupularProducts.map((product) => (
              <ProductCart {...product} key={product.id} />
            ))}
          </Grid>
        </Container>
      </CatalogSection>
    </RootLayout>
  );
};

export default ProductPage;
