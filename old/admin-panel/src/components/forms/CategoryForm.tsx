"use client";
import { FC } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/actions/category";
// import { useFormState } from "react-dom";
import { useFormState } from "react-dom";

const CategoryForm: FC = () => {
  const [formState, action] = useFormState<any>(createCategory, {});

  return (
    <form action={createCategory}>
      <Card>
        <CardHeader>
          <h1 className=" text-2xl font-semibold">Создание новой категории</h1>
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
              <Input name="level" value={1} disabled />
            </Label>
          </details>

          <Button className="w-auto" type="submit">
            {/* {pending ? "loading" : "Создать"} */}dwdw
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default CategoryForm;
