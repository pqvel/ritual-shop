import { FC } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn-ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn-ui/table";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryItem from "../_components/category/CategoryItem";
import db from "@/db";
import UslugaItem from "../_components/usluga/UslugaItem";

const getUslugi = async () => {
  return await db?.usluga.findMany();
};

const UslugiPage: FC = async () => {
  const uslugi = await getUslugi();
  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/admin" },
          { title: "Услуги", href: "/admin/uslugi" },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className=" mb-4">Услуги</CardTitle>
          <div className="flex justify-between  gap-2">
            <Link
              className="flex items-center justify-center flex-shrink-0 px-4 py-1.5 text-sm rounded-lg border border-black"
              href="/admin/catalog/add-category"
            >
              Добавить услугу
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
              {/* {uslugi.map((category) => (
                <UslugaItem
                  ={category}
                  link={`/admin/catalog/${category.slug}`}
                  key={category.id}
                />
              ))} */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default UslugiPage;
