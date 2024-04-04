import { Container, Section } from "@/components/ui/Wrappers";
import ProductCard from "@/components/ui/cards/ProductCard";
import { Grid } from "@/components/ui/Wrappers";

import RootLayout from "./layout";
import CategoryCard from "@/components/ui/cards/CategoryCard";

export default function Home() {
  return (
    <RootLayout>
      <main>
        {/* <Popup>
        <FeedbackForm></FeedbackForm>
      </Popup> */}

        <Section className={`bg-[url('/images/mramor_bg.jpg')]`}>
          <Container>
            <div className="">
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
            <div></div>
          </Container>
        </Section>
        <Section>
          <Container>
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
            </Grid>
          </Container>
        </Section>
        <Section>
          <Container>
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
            </Grid>
          </Container>
        </Section>
      </main>
    </RootLayout>
  );
}
