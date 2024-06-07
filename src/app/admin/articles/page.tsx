import { FC } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
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
import ArticleItem from "../_components/article/ArticleItem";
import db from "@/db";

const getArticles = async () => {
  return await db.article.findMany();
};

const ArticlePage: FC = async () => {
  const articles = await getArticles();
  return (
    <>
      <Breadcrumb
        items={[
          { title: "Главная", href: "/admin" },
          { title: "Статьи", href: "/admin/articles" },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className=" mb-4">Статьи</CardTitle>
          <div className="flex flex-wrap justify-between  gap-2">
            <Link
              className="flex items-center justify-center px-4 py-2 text-sm rounded-lg border border-black"
              href="/admin/articles/add-article"
            >
              Добавить статью
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
                <TableHead className="">Название</TableHead>
                <TableHead>slug</TableHead>
                <TableHead className="w-[100px]">Изображение</TableHead>
                <TableHead className="text-right w-[100px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <ArticleItem article={article} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ArticlePage;
