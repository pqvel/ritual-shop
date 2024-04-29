import { FC } from "react";
import Image from "next/image";
import CatalogSection from "@/components/catalog/CatalogSection";
import { Container, Grid } from "@/components/ui/Wrappers";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductCart from "@/components/ui/cards/ProductCard";
import { SectionTitle, SectionTitleGroup } from "@/components/ui/Section";
import db from "../../../../db/db";
import { Title } from "@/components/ui/Typography";
import MainLayout from "@/components/layouts/MainLayout";
import { TextInput } from "@/components/ui/formItems/Input";
import Button from "@/components/ui/formItems/Button";
import { Label } from "@/components/ui/formItems/Label";
import { PhoneInput, TextArea } from "@/components/ui/formItems/Input";
import Link from "next/link";

const getData = async (slug: string) => {
  const product = await db.product.findFirst({
    where: {
      slug: slug,
    },

    include: {
      characteristics: true,
    },
  });

  const categoryLvl2 = await db.category.findUnique({
    where: {
      id: product!.categoryId,
    },
    include: {
      products: true,
    },
  });

  const categoryLvl1 = await db.category.findFirst({
    where: {
      id: categoryLvl2!.parentId as number,
    },
  });

  return {
    product,
    categoryLvl1,
    categoryLvl2,
  };
};

type Props = {
  params: {
    slug: string;
  };
};

const ProductPage: FC<Props> = async ({ params }) => {
  const { product, categoryLvl1, categoryLvl2 } = await getData(params.slug);

  return (
    <MainLayout>
      <CatalogSection>
        <Container>
          <Breadcrumb
            items={[
              { title: "Главная", href: "/" },
              { title: "Каталог", href: "/catalog" },
              {
                title: categoryLvl1!.title,
                href: `/catalog/${categoryLvl1!.slug}`,
              },
              {
                title: categoryLvl2!.title,
                href: `/catalog/${categoryLvl1!.slug}/${categoryLvl2!.slug}`,
              },
              {
                title: product!.title,
                href: `/goods/${product!.slug}`,
              },
            ]}
          />
          <Title level={1}>{product!.title}</Title>
          <div className="flex mb-8">
            <div className="flex relative bg-white mr-6 w-2/5 pt-[40%] shadow">
              <Image
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={product!.image}
                width={800}
                height={800}
                alt={product!.title}
              />
            </div>

            <div className="flex flex-col bg-white w-3/5 p-6 justify-around shadow">
              <h2 className=" font-semibold text-3xl text-center">
                Закажите сейчас от{" "}
                <strong className=" text-cyan-700">{product!.price}</strong>{" "}
                руб.
              </h2>
              <div className="flex items-center font-semibold text-xl">
                Узнать о:
                <ul className="flex font-normal text-base text-gray-500 ml-4">
                  <li className="flex mr-3 lg:hover:underline lg:hover:text-gray-600 underline-offset-2 transition">
                    <Link href="/">Способы оплаты</Link>
                  </li>
                  <li className="flex mr-3 lg:hover:underline lg:hover:text-gray-600 underline-offset-2 transition">
                    <Link href="/">Доставки</Link>
                  </li>
                  <li className="flex lg:hover:underline lg:hover:text-gray-600 underline-offset-2 transition">
                    <Link href="/">Рассрочки</Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-start">
                <div className="grid sm:grid-cols-2 sm:gap-4 w-full">
                  <Label text="Ваше имя:" required>
                    <TextInput placeholder="Иван" />
                  </Label>
                  <Label text="Номер телефона:" required>
                    <PhoneInput />
                  </Label>
                </div>
                <div className="w-full mb-2">
                  <Label text="Оставьте сообщение:">
                    <TextArea placeholder="Комментарий" />
                  </Label>
                </div>

                <button className=" text-white py-2 px-6 bg-cyan-700 lg:hover:bg-cyan-800 rounded font-medium transition">
                  Отправить
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white p-8 mb-8 shadow">
            <SectionTitleGroup>
              <SectionTitle>Информация о товаре</SectionTitle>
            </SectionTitleGroup>
            <table className="">
              {product!.characteristics.map(({ title, variants }) => (
                <tr
                  className="border-y cursor-pointer hover:bg-gray-50"
                  key={title}
                >
                  <td className="py-5 px-2 text-lg font-medium">{title}:</td>
                  <td className="py-5 px-2 text-lg">{variants[0]}</td>
                  <td className="py-5 px-2 text-lg">{variants[1]}</td>
                  <td className="py-5 px-2 text-lg">{variants[2]}</td>
                </tr>
              ))}
            </table>
          </div>
          <SectionTitleGroup>
            <SectionTitle>Похожие товары</SectionTitle>
          </SectionTitleGroup>
          <Grid>
            {categoryLvl2!.products.map((product) => (
              <ProductCart
                product={product}
                href={`/goods/${product.slug}`}
                key={product.id}
              />
            ))}
          </Grid>
        </Container>
      </CatalogSection>
    </MainLayout>
  );
};

export default ProductPage;