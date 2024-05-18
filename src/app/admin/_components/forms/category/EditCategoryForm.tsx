"use client";
import { FC } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/shadcn-ui/card";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { changeCategory } from "@/app/actions/categories";

type Props = {
  id: number;
  initialValues: {
    title: string;
    image: string;
  };
};

const EditCategoryForm: FC<Props> = ({ id, initialValues }) => {
  const [formState, action] = useFormState<ReturnType<typeof changeCategory>>(
    changeCategory,
    {}
  );

  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <h1 className=" text-2xl font-semibold">Изменить категорию</h1>
        </CardHeader>
        <CardContent>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Название</div>
            <Input
              placeholder="Двойные памятники"
              name="title"
              defaultValue={initialValues.title}
            />
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
            <div className=" text-red-600">
              Внимание! изменение данных параметров может привести к необратимым
              последствиям!!! Не стоит менять вообще эти данные
            </div>
            <Label className="block mb-4">
              <div className="mb-2 text-lg">id</div>
              <Input name="id" type="number" value={id} />
            </Label>
          </details>

          <SubmitButton />
        </CardContent>
      </Card>
    </form>
  );
};

const SubmitButton: FC = () => {
  const status = useFormStatus();
  return (
    <Button className="w-auto" type="submit" disabled={status.pending}>
      {status.pending ? "loading.." : "Соханить"}
    </Button>
  );
};

export default EditCategoryForm;
