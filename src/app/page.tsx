import { v4 } from "uuid";
import Link from "next/link";
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
import { FC } from "react";
import { Label } from "@/components/ui/formItems/Label";
import {
  PhoneInput,
  TextArea,
  TextInput,
} from "@/components/ui/formItems/Input";

import db from "../../db/db";
import ProductsSwiper from "@/components/ui/ProductsSwiper";
import MainLayout from "@/components/layouts/MainLayout";
import OrderPopup from "@/components/popups/OrderPopup";
import Details from "@/components/ui/Details";

const getCategories = async () => {
  return await db.category.findMany({
    where: { level: 2, active: true },
    take: 8,
  });
};

const getProducts = async () => {
  return await db.product.findMany({
    where: {
      // active: true,
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
          <div className="w-full md:w-2/3 md:mr-8">
            <h1 className=" text-3xl sm:text-4xl lg:text-[42px] w-full md:w-auto font-semibold mb-5">
              Памятники из гранита.
              <br /> Вечная память в каждой детали
            </h1>
            <p className="text-base lg:text-lg text-gray-500 mb-6 max-w-[560px] ">
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
      <Section className=" bg-violet-100">
        <Container>
          <SectionTitleGroup className=" justify-center">
            <SectionTitle>Свяжитесь с нами прямо сейчас</SectionTitle>
          </SectionTitleGroup>

          <div className="flex flex-col items-start bg-white border border-gray-200 shadow p-8 rounded">
            <div className="grid sm:grid-cols-2 sm:gap-4 w-full">
              <Label text="Ваше имя:" required>
                <TextInput placeholder="Иван" />
              </Label>
              <Label text="Номер телефона:" required>
                <PhoneInput />
              </Label>
            </div>
            <div className="w-full">
              <Label text="Оставьте сообщение:">
                <TextArea placeholder="Комментарий" />
              </Label>
            </div>

            <button className=" text-white py-2 px-6 bg-cyan-700 lg:hover:bg-cyan-800 rounded font-medium transition">
              Отправить
            </button>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionTitleGroup>
            <SectionTitle>Часто задаваемые вопросы</SectionTitle>
          </SectionTitleGroup>
          <Details title="Какие сроки изготовления памятников">
            Стандартные памятники из гранита от 15 до 30 дней Памятники из
            цветного гранита от 4 до 6 недель Эксклюзивные памятники от 6 до 8
            недель Цоколь из гранита 7-14 дней Гравировка изображения и текста
            от 1 до 3 недель
          </Details>
        </Container>
      </Section>
    </MainLayout>
  );
};

export default Home;
