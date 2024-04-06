import { Container } from "@/components/ui/Wrappers";
import {
  Section,
  SectionLink,
  SectionTitle,
  SectionTitleGroup,
} from "@/components/ui/Section";
import ProductCard from "@/components/ui/cards/ProductCard";
import { Grid } from "@/components/ui/Wrappers";
import Popup from "@/components/ui/Popup";
import FeedbackForm from "@/components/forms/FeedbackForm";
import Image from "next/image";
import RootLayout from "./layout";
import CategoryCard from "@/components/ui/cards/CategoryCard";

export default function Home() {
  return (
    <RootLayout>
      <main className="pt-[146px]">
        {/* <Popup>
          <FeedbackForm></FeedbackForm>
        </Popup> */}

        <Section className={`bg-[url('/images/mramor_bg.jpg')] min-h-[500px]`}>
          <Container className="flex items-center justify-center h-full">
            <div className=" w-2/3">
              <h1 className=" text-4xl font-semibold mb-4 max-w-screen-md">
                Памятники из гранита. Вечная память в каждой детали
              </h1>
              <p>
                Уникальные мемориальные памятники для сохранения памяти о
                близких. Закажите свой памятник прямо сейчас
              </p>
              <button className=" bg-cyan-700 text-white py-3 px-5 rounded-3xl">
                Заказть звонок
              </button>
            </div>
            <div className=" w-1/3">
              <Image
                src="/images/pomnik.png"
                width={200}
                height={200}
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
            <Grid>
              <ProductCard
                category="dwqd"
                image="/images/475.jpg"
                href="/ddq"
                title="qddqqd"
                price="312"
              />
              <ProductCard
                category="dwqd"
                image="/images/475.jpg"
                href="/ddq"
                title="qddqqd"
                price="312"
              />
              <ProductCard
                category="dwqd"
                image="/images/475.jpg"
                href="/ddq"
                title="qddqqd"
                price="312"
              />
              <ProductCard
                category="dwqd"
                image="/images/475.jpg"
                href="/ddq"
                title="qddqqd"
                price="312"
              />
              <ProductCard
                category="dwqd"
                image="/images/475.jpg"
                href="/ddq"
                title="qddqqd"
                price="312"
              />
              <ProductCard
                category="dwqd"
                image="/images/475.jpg"
                href="/ddq"
                title="qddqqd"
                price="312"
              />
              <ProductCard
                category="dwqd"
                image="/images/475.jpg"
                href="/ddq"
                title="qddqqd"
                price="312"
              />
              <ProductCard
                category="dwqd"
                image="/images/475.jpg"
                href="/ddq"
                title="qddqqd"
                price="312"
              />
            </Grid>
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
                title="category"
                href="/catalog"
                image="/images/475.jpg"
              />

              <CategoryCard
                title="category"
                href="/catalog"
                image="/images/475.jpg"
              />

              <CategoryCard
                title="category"
                href="/catalog"
                image="/images/475.jpg"
              />
              <CategoryCard
                title="category"
                href="/catalog"
                image="/images/475.jpg"
              />
              <CategoryCard
                title="category"
                href="/catalog"
                image="/images/475.jpg"
              />

              <CategoryCard
                title="category"
                href="/catalog"
                image="/images/475.jpg"
              />

              <CategoryCard
                title="category"
                href="/catalog"
                image="/images/475.jpg"
              />
              <CategoryCard
                title="category"
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
    </RootLayout>
  );
}
