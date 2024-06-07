import { FC } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn-ui/card";
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
import db from "@/db";

type Props = {
  params: {
    categorySlug: string;
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

  return { category: data, childCategories: data.childCategories };
};

const CategoryPage: FC<Props> = async ({ params: { categorySlug } }) => {
  const { category, childCategories } = await getCategories(categorySlug);
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
            title: category.title,
            href: `/admin/catalog/${category.slug}`,
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className=" mb-4">{category.title}</CardTitle>
          <div className="flex flex-wrap justify-between  gap-2">
            <Link
              className="flex items-center justify-center px-4 py-2 text-sm rounded-lg border border-black"
              href={`/admin/catalog/${category.slug}/add-category`}
            >
              Добавить категорию
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="bg-white">
            <TableCaption></TableCaption>
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
              {childCategories.map((childCategory) => (
                <CategoryItem
                  category={childCategory}
                  link={`/admin/catalog/${category.slug}/${childCategory.slug}`}
                  key={childCategory.id}
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
