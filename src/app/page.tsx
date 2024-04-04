import { Container, Section } from "@/components/ui/Wrappers";
import ProductCart from "@/components/ui/product/ProductCart";
import { Grid } from "@/components/ui/Wrappers";
import { Label } from "@/components/ui/formItems/Label";

export default function Home() {
  return (
    <main>
      <Section className={`bg-[url('/images/mramor_bg.jpg')]`}>
        <Container>
          <form className=" bg-slate-800 p-5 w-1/3 rounded-lg text-white">
            <Label text="Ваше имя">
              <input placeholder="Иван" />
            </Label>
            <Label text="Номер телефона">
              <input placeholder="Иван" />
            </Label>
            <Label text="Комментарий">
              <textarea placeholder="Описание" />
            </Label>
          </form>
        </Container>
      </Section>
      <Section>
        <Container>
          <Grid>
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
            <ProductCart
              category="dwqd"
              image="/images/475.jpg"
              href="/ddq"
              title="qddqqd"
              price="312"
            />
          </Grid>
        </Container>
      </Section>
    </main>
  );
}
