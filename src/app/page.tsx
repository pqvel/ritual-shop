import { FC } from "react";
import { Container } from "@/components/ui/Wrappers";
import {
  Section,
  SectionLink,
  SectionTitle,
  SectionTitleGroup,
} from "@/components/ui/Section";
import { Grid } from "@/components/ui/Wrappers";
import Image from "next/image";
import CategoryCard from "@/components/ui/cards/CategoryCard";
import "swiper/css";

import db from "../../db/db";
import ProductsSwiper from "@/components/swiper/ProductsSwiper";
import MainLayout from "@/components/layouts/MainLayout";
import OrderPopup from "@/components/popups/OrderPopup";
import Details from "@/components/ui/Details";
import OrderForm from "@/components/forms/orderForm/OrderForm";

const getCategories = async () => {
  return await db.category.findMany({
    where: { level: 2, active: true },
    take: 8,
  });
};

const getProducts = async () => {
  return await db.product.findMany({
    where: {
      active: true,
    },
    take: 12,
  });
};

const Home: FC = async () => {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <MainLayout>
      <Section
        className={`flex flex-col bg-[url('/images/mramor_bg.jpg')] min-h-[460px] sm:min-h-[500px]`}
      >
        <Container className="flex flex-col md:flex-row items-center justify-center flex-1">
          <div className="flex flex-col items-center sm:items-start w-full md:w-2/3 md:mr-8">
            <h1 className=" text-3xl text-center sm:text-start sm:text-4xl lg:text-[42px] w-full md:w-auto font-semibold mb-5">
              Памятники из гранита.
              <br /> Вечная память в каждой детали
            </h1>
            <p className="text-base text-center sm:text-start lg:text-lg text-gray-500 mb-6 max-w-[560px] ">
              Уникальные мемориальные памятники для сохранения памяти о близких.
              Закажите свой памятник прямо сейчас
            </p>

            <OrderPopup />
          </div>
          <div className="hidden md:flex w-1/3">
            <Image
              className=""
              src="/images/pomnik.png"
              width={360}
              height={360}
              alt="Памятник"
            />
          </div>
        </Container>
      </Section>
      <Section className=" bg-white">
        <Container>
          <SectionTitleGroup className=" justify-between">
            <SectionTitle>Популярные памятники</SectionTitle>
            <SectionLink href="/catalog/pamyatniki/">Смотреть все</SectionLink>
          </SectionTitleGroup>

          <ProductsSwiper products={products} />
        </Container>
      </Section>
      <Section className=" bg-gray-100">
        <Container>
          <SectionTitleGroup className=" justify-between">
            <SectionTitle>Категории</SectionTitle>
            <SectionLink href="/catalog/">Смотреть все</SectionLink>
          </SectionTitleGroup>
          <Grid>
            {categories.map(({ title, slug, image, id }) => (
              <CategoryCard
                key={id}
                title={title}
                href={`/catalog/${slug}`}
                image={image}
              />
            ))}
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionTitleGroup className=" justify-center">
            <SectionTitle>Свяжитесь с нами прямо сейчас</SectionTitle>
          </SectionTitleGroup>
          <OrderForm />
        </Container>
      </Section>
      <Section className=" bg-cyan-900">
        <Container>
          <SectionTitleGroup className="text-white">
            <SectionTitle>Часто задаваемые вопросы</SectionTitle>
          </SectionTitleGroup>
          <ul>
            <li>
              <Details title="Какие сроки изготовления памятников">
                <ul className=" grid grid-cols-1 gap-1 list-disc pl-5">
                  <li>Стандартные памятники из гранита от 15 до 30 дней</li>
                  <li>Памятники из цветного гранита от 4 до 6 недель</li>
                  <li>Эксклюзивные памятники от 6 до 8 недель </li>
                  <li>Цоколь из гранита 7-14 дней </li>
                  <li>Гравировка изображения и текста от 1 до 3 недель</li>
                </ul>
              </Details>
            </li>
            <li className="mt-3">
              <Details title="Есть ли гарантия?">
                Гарантия на памятники составляет 20 лет.
              </Details>
            </li>
            <li className="mt-3">
              <Details title="Можно ли использовать другой гранит?">
                Да, у нас широкий ассортимент гранита под все виды нужд.
              </Details>
            </li>
            <li className="mt-3">
              <Details title="Как заказать памятник?">
                Свяжитесь с нами по телефону и наш оператор поможет вам
              </Details>
            </li>
          </ul>
        </Container>
      </Section>
    </MainLayout>
  );
};

export default Home;
