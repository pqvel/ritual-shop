import AdminLayout from "@/components/layouts/AdminLayout";
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextComponentType,
} from "next";
import db from "../../../../db/db";
import { SearchInput } from "@/components/ui/my/SearchInput";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Category } from "@prisma/client";

const CategoryPage = ({
  categories,
  parentCategory,
}: {
  categories: Category[];
  parentCategory: Category;
}) => {
  return (
    <AdminLayout>
      <BreadcrumbNav
        items={[
          { title: "Главная", href: "/" },
          {
            title: "Каталог",
            href: "/catalog",
          },
          {
            title: parentCategory.title,
            href: `/catalog/${parentCategory.slug}`,
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className=" mb-4">{parentCategory.title}</CardTitle>
          <div className="flex flex-wrap justify-between  gap-2">
            <SearchInput />
            <Link
              className="flex items-center justify-center px-4 py-2 text-sm rounded-lg border border-black"
              href={`/catalog/${parentCategory.slug}/add-category`}
            >
              Добавить категорию
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="bg-white">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Показывать</TableHead>
                <TableHead className="text-right">Количество товаров</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, i) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{i}</TableCell>
                  <TableCell>{category.title}</TableCell>
                  <TableCell>{category.image}</TableCell>
                  <TableCell className="text-right">{category.level}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parentCategory = await db.category.findUnique({
    where: { slug: context.params?.category as string },
  });

  if (!parentCategory) {
    return { notFound: true };
  }

  const categories = await db.category.findMany({
    where: {
      parentId: parentCategory.id,
      level: 2,
    },
  });

  return { props: { parentCategory, categories } };
};

export default CategoryPage;
