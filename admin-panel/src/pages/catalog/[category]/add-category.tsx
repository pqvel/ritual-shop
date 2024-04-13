import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetServerSideProps } from "next";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { createCategory } from "@/actions/category";
import db from "../../../../db/db";
import { FC } from "react";

type Props = {
  parentCategory: {
    id: number;
    title: string;
    slug: string;
  };
  level: number;
};

const AddCategoryPage: FC<Props> = ({ parentCategory, level }) => {
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
            title: "Памятники",
            href: `/catalog/${parentCategory.slug}`,
          },
          {
            title: "Добавить категорию",
            href: `/catalog/${parentCategory.slug}/add-category`,
          },
        ]}
      />
      <form>
        <Card>
          <CardHeader>
            <h1 className=" text-2xl font-semibold">
              Создание новой категории
            </h1>
          </CardHeader>
          <CardContent>
            <Label className="block mb-4">
              <div className="mb-2 text-lg">Название</div>
              <Input placeholder="Двойные памятники" name="title" />
            </Label>
            <Label className="block mb-4">
              <div className="mb-2 text-lg">Изображение</div>
              <Input
                placeholder="Выберите изображение"
                name="image"
                type="file"
                accept="image/jpeg"
              />
            </Label>

            <details className="mb-4 cursor-pointer">
              <summary>Скрытые параметры</summary>
              <Label className="block mb-4">
                <div className="mb-2 text-lg">Уровень</div>
                <Input name="level" value={level} disabled />
              </Label>
              <Label className="block mb-4">
                <div className="mb-2 text-lg">
                  Родительская категория: {parentCategory.title}
                </div>
                <Input name="parentId" value={parentCategory.id} disabled />
              </Label>
            </details>

            <Button className="w-auto" type="submit">
              Создать
            </Button>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parentCategory = await db.category.findUnique({
    where: { slug: context.params!.category as string },
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  return {
    props: {
      parentCategory,
      level: 2,
    },
  };
};

export default AddCategoryPage;
