import React, { useState } from "react";
import RootLayout from "../layout";

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
import { AsideLinks } from "@/components/ui/catalog";
import Pagination from "@/components/ui/Pagination";

const CatalogLvl1Page = () => {
  const [popupularProducts] = useState<ProductCartType[]>([
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/maket",
      title: "Памятник вертикальный гранитный А-1",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/maket",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/maket",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/maket",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/maket",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-11",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/maket",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/maket",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/maket",
      title: "Памятник вертикальный гранитный А-12",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/476.jpg",
      vendorCode: "В-12",
    },
    {
      id: v4(),
      href: "/catalog/odinocnie-pamyatniki/maket",
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
            ]}
          />
          <CatalogTitle>Памятники</CatalogTitle>
          <div className="flex items-start">
            <Aside className=" mr-4">
              <AsideLinks
                title="Памятники"
                links={[
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Одиночные памятники из гранита",
                  },
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Двойные памятники из гранита",
                  },
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Элитные памятники из гранита",
                  },
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Станочные скульптурные работы",
                  },
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Бюджетные памятники",
                  },
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Бюджетные памятники",
                  },
                ]}
              />
              <Separator />
              <AsideLinks
                title="Ограды"
                links={[
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Ограды из гранита",
                  },
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Ограды металлические",
                  },
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Ограды из нержавеющей стали",
                  },
                  {
                    href: "/catalog/odinocnie-pamyatniki",
                    title: "Кованные ограды",
                  },
                ]}
              />
            </Aside>
            <div className=" flex flex-col items-center w-full">
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

export default CatalogLvl1Page;
