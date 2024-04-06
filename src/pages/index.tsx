import { Container } from "@/components/ui/Wrappers";
import {
  Section,
  SectionLink,
  SectionTitle,
  SectionTitleGroup,
} from "@/components/ui/Section";
import ProductCard from "@/components/ui/cards/ProductCard";
import { Grid } from "@/components/ui/Wrappers";

import Image from "next/image";
import RootLayout from "./layout";
import CategoryCard from "@/components/ui/cards/CategoryCard";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { useState } from "react";
import { ProductCartType } from "@/assets/types";

import { v4 } from "uuid";
import Link from "next/link";
import FeedbackPopup from "@/components/popups/FeedbackPopup";
import { useRouter } from "next/router";

export default function Home() {
  const { query } = useRouter();

  const [popupularProducts] = useState<ProductCartType[]>([
    {
      id: v4(),
      href: "/",
      title: "Памятник",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/475.jpg",
      category: "Категория",
    },
    {
      id: v4(),
      href: "/",
      title: "Памятник",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/475.jpg",
      category: "Категория",
    },
    {
      id: v4(),
      href: "/",
      title: "Памятник",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/475.jpg",
      category: "Категория",
    },
    {
      id: v4(),
      href: "/",
      title: "Памятник",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/475.jpg",
      category: "Категория",
    },
    {
      id: v4(),
      href: "/",
      title: "Памятник",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/475.jpg",
      category: "Категория",
    },
    {
      id: v4(),
      href: "/",
      title: "Памятник",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/475.jpg",
      category: "Категория",
    },
    {
      id: v4(),
      href: "/",
      title: "Памятник",
      price: `${Math.floor(Math.random() * 1000 * 100) / 100}`,
      image: "/images/475.jpg",
      category: "Категория",
    },
  ]);

  return (
    <RootLayout>
      <main className="pt-[80px] lg:pt-[146px]">
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
                Уникальные мемориальные памятники для сохранения памяти о
                близких. Закажите свой памятник прямо сейчас
              </p>

              <Link
                className="bg-cyan-700 text-white py-3 px-8 rounded-[30px] text-lg shadow-lg lg:hover:bg-cyan-800 transition"
                href="/?show=true"
              >
                Заказть звонок
              </Link>
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
        <Section>
          <Container>
            <SectionTitleGroup>
              <SectionTitle>Популярные памятники</SectionTitle>
              <SectionLink href="/all">Смотреть все</SectionLink>
            </SectionTitleGroup>
            {/* <Grid> */}
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".prev",
                nextEl: ".next",
              }}
              spaceBetween={16}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                560: {
                  slidesPerView: 2,
                },
                852: {
                  slidesPerView: 3,
                },
                1128: {
                  slidesPerView: 4,
                },
              }}
            >
              {popupularProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard {...product} />
                </SwiperSlide>
              ))}
              <button className="next">+</button>
              <button className="prev">-</button>
            </Swiper>
          </Container>
        </Section>
        <Section className=" bg-zinc-100">
          <Container>
            <SectionTitleGroup>
              <SectionTitle>Категории</SectionTitle>
              <SectionLink href="/all">Смотреть все</SectionLink>
            </SectionTitleGroup>
            <Grid>
              <CategoryCard
                title="Памятники из гранита"
                href="/catalog"
                image="/images/475.jpg"
              />

              <CategoryCard
                title="Ограды"
                href="/catalog"
                image="/images/475.jpg"
              />

              <CategoryCard
                title="Колумбарии"
                href="/catalog"
                image="/images/475.jpg"
              />
              <CategoryCard
                title="Мемориальные комплексы"
                href="/catalog"
                image="/images/475.jpg"
              />
              <CategoryCard
                title="Вазы"
                href="/catalog"
                image="/images/475.jpg"
              />

              <CategoryCard
                title="Декоративные элементы"
                href="/catalog"
                image="/images/475.jpg"
              />

              <CategoryCard
                title="Лампады"
                href="/catalog"
                image="/images/475.jpg"
              />
              <CategoryCard
                title="Скамейки"
                href="/catalog"
                image="/images/475.jpg"
              />
            </Grid>
          </Container>
        </Section>
        <Section>
          <Container>d</Container>
        </Section>
      </main>

      {query.show && <FeedbackPopup />}
    </RootLayout>
  );
}
