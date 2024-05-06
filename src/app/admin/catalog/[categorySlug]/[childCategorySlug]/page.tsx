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
import ProductItem from "@/app/admin/_components/product/ProductItem";
import db from "@/db";

const getData = async (categorySlug: string, childCategorySlug: string) => {
  const data = await db.category.findUnique({
    where: {
      slug: categorySlug,
    },
    include: {
      childCategories: {
        where: {
          slug: childCategorySlug,
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

  return {
    category: data,
    childCategory: data!.childCategories[0],
    products: data!.childCategories[0].products,
  };
};

type Props = {
  params: {
    categorySlug: string;
    childCategorySlug: string;
  };
};

const ProductsPage: FC<Props> = async ({
  params: { categorySlug, childCategorySlug },
}) => {
  const { category, childCategory, products } = await getData(
    categorySlug,
    childCategorySlug
  );

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
            title: category!.title,
            href: `/admin/catalog/${category!.slug}`,
          },
          {
            title: childCategory.title,
            href: `/admin/catalog/${category!.slug}/${childCategory.slug}`,
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className=" mb-4">Товары</CardTitle>
          <div className="flex flex-wrap justify-between  gap-2">
            <Link
              className="flex items-center justify-center px-4 py-2 text-sm rounded-lg border border-black"
              href={`/admin/catalog/${category!.slug}/${
                childCategory.slug
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
              {products.map((product) => (
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
