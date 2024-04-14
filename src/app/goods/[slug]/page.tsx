import { FC } from "react";
import Image from "next/image";
import CatalogSection from "@/components/catalog/CatalogSection";
import { Container, Grid } from "@/components/ui/Wrappers";
/** @todo section tilte должен быть заголовком */
import CatalogTitle from "@/components/catalog/CatalogTitle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductCart from "@/components/ui/cards/ProductCard";
import { SectionTitle, SectionTitleGroup } from "@/components/ui/Section";
import db from "../../../../db/db";
import MainLayout from "@/components/layouts/MainLayout";

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
          <div className="flex flex-col bg-white p-8 mb-4">
            <SectionTitleGroup>
              <SectionTitle>Информация о товаре</SectionTitle>
            </SectionTitleGroup>
            <table className="">
              {product!.characteristics.map(({ title, variants }) => (
                <tr
                  className="border-y cursor-pointer hover:bg-slate-50"
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
