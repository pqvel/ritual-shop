import React, { useState } from "react";
import RootLayout from "../../layout";

import { Grid, Container, Aside } from "@/components/ui/Wrappers";
import { v4 } from "uuid";
import Link from "next/link";
import { ProductCartType } from "@/assets/types";
import ProductCart from "@/components/ui/cards/ProductCard";
import { Section } from "@/components/ui/Section";
import RangeSlider from "@/components/ui/formItems/RangeSlider";
import Separator from "@/components/ui/Separator";
import { Checkbox } from "@/components/ui/formItems/Input";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CatalogTitle from "@/components/catalog/CatalogTitle";
import CatalogSection from "@/components/catalog/CatalogSection";
import Pagination from "@/components/ui/Pagination";
const CatalogLvl2Page = () => {
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
              { title: "Одиночные памятники", href: "/catalog-1" },
            ]}
          />
          <CatalogTitle>Одиночные памятники</CatalogTitle>
          <div className="flex items-start">
            <Aside className=" mr-4">
              <h2 className=" font-medium text-xl mb-3">Каталог</h2>
              <Separator />
              <RangeSlider min={10} max={100} onChange={() => {}} />
              <Separator />
              <div>
                <div className=" font-medium mb-2">Материал</div>
                <div className="grid grid-cols-1 gap-2">
                  <Checkbox name="material" value="1" label="Гранит" />
                  <Checkbox name="material" value="2" label="Гранит" />
                  <Checkbox name="material" value="3" label="Гранит" />
                  <Checkbox name="material" value="4" label="Гранит" />
                </div>
              </div>
            </Aside>
            <div className="flex flex-col items-center w-full">
              <Grid>
                {popupularProducts.map((product) => (
                  <ProductCart {...product} key={product.id} />
                ))}
              </Grid>
              <Pagination />
            </div>
          </div>
        </Container>
      </CatalogSection>
    </RootLayout>
  );
};

export default CatalogLvl2Page;
