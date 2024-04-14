import { FC } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn-ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/shadcn-ui/table";
import Breadcrumb from "@/components/ui/Breadcrumb";
import db from "../../../../../../db/db";
import ProductItem from "@/app/admin/_components/product/ProductItem";

const getData = async (categorySlug: string, productSlug: string) => {
  return await db.category.findUnique({
    where: {
      slug: categorySlug,
    },
    include: {
      childCategories: {
        where: {
          slug: productSlug,
        },
        include: {
          products: {
            include: {
              characteristics: true,
            },
          },
        },
      },
    },
  });
};

type Props = {
  params: {
    category: string;
    products: string;
  };
};

const ProductsPage: FC<Props> = async ({ params: { category, products } }) => {
  const mainCategory = await getData(category, products);

  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/admin" },
          {
            title: "Каталог",
            href: "/admin/catalog",
          },
          {
            title: mainCategory!.title,
            href: `/admin/catalog/${mainCategory!.slug}`,
          },
          {
            title: mainCategory!.childCategories[0].title,
            href: `/admin/catalog/${mainCategory!.slug}/${
              mainCategory!.childCategories[0].slug
            }`,
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className=" mb-4">Товары</CardTitle>
          <div className="flex flex-wrap justify-between  gap-2">
            <Link
              className="flex items-center justify-center px-4 py-2 text-sm rounded-lg border border-black"
              href={`/admin/catalog/${mainCategory!.slug}/${
                mainCategory!.childCategories[0].slug
              }/add-product`}
            >
              Добавить товар
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="bg-white">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Active</TableHead>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[100px]">Category ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Артикул</TableHead>
                <TableHead>Изображение</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mainCategory!.childCategories[0].products.map((product) => (
                <ProductItem
                  product={product}
                  productCharacteristics={product.characteristics}
                  key={product.id}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductsPage;
