import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn-ui/card";
import db from "../../../../../db/db";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCaption,
  TableHead,
} from "@/components/ui/shadcn-ui/table";
import { redirect } from "next/navigation";
import CategoryItem from "../../_components/category/CategoryItem";
type Props = {
  params: {
    category: string;
  };
};
const getCategories = async (slug: string) => {
  const data = await db.category.findUnique({
    where: { slug },
    include: {
      childCategories: true,
    },
  });

  if (!data) return redirect("/admin/catalog");

  return data;
};

const CategoryPage: FC<Props> = async ({ params }) => {
  const parentCategory = await getCategories(params.category);
  // console.log(category);
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
            title: parentCategory.title,
            href: `/admin/catalog/${parentCategory.slug}`,
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className=" mb-4">{parentCategory.title}</CardTitle>
          <div className="flex flex-wrap justify-between  gap-2">
            <Link
              className="flex items-center justify-center px-4 py-2 text-sm rounded-lg border border-black"
              href={`/admin/catalog/${parentCategory.slug}/add-category`}
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
                <TableHead className="w-[100px]">Active</TableHead>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[100px]">Parent ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>slug</TableHead>
                <TableHead>Изображение</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parentCategory.childCategories.map((category) => (
                <CategoryItem
                  category={category}
                  link={`/admin/catalog/${parentCategory.slug}/${category.slug}`}
                  key={category.id}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryPage;
