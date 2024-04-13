import type { GetServerSideProps } from "next";
import AdminLayout from "@/components/layouts/AdminLayout";
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

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import db from "../../../db/db";

import { Button } from "@/components/ui/button";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Category } from "@prisma/client";
import { FC } from "react";

type Props = {
  categories: Category[];
};

const CategoryPage: FC<Props> = ({ categories }) => {
  return (
    <AdminLayout>
      <BreadcrumbNav
        items={[
          { title: "Главная", href: "/" },
          { title: "Каталог", href: "/catalog" },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className=" mb-4">Категории</CardTitle>
          <div className="flex flex-wrap justify-between  gap-2">
            <SearchInput />
            <Link
              className="flex items-center justify-center px-4 py-2 text-sm rounded-lg border border-black"
              href="/catalog/add-category"
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
                <TableHead>Изображение</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(
                ({ id, parentId, title, image, active, slug }) => (
                  <TableRow key={id}>
                    <TableCell className="font-medium">
                      <Checkbox checked={active} />
                    </TableCell>
                    <TableCell className="font-medium">{id}</TableCell>
                    <TableCell className="font-medium">{parentId}</TableCell>
                    <TableCell>
                      <Link
                        className=" text-blue-500 underline underline-offset-2"
                        href={`/catalog/${slug}`}
                      >
                        {title}
                      </Link>
                    </TableCell>
                    <TableCell>{image}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <EllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" bg-white" align="end">
                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Удалить</DropdownMenuItem>
                          <DropdownMenuItem>Редактировать</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              )}
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

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const categories = await db.category.findMany({
    where: {
      level: 1,
    },
  });

  return { props: { categories } };
};

export default CategoryPage;
