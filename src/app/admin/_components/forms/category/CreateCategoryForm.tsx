"use client";
import { FC } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/shadcn-ui/card";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createCategory } from "@/app/actions/categories";

type Props = {
  level: number;
  parentId?: number;
};

const CreateCategoryForm: FC<Props> = ({ parentId, level }) => {
  const [formState, action] = useFormState<ReturnType<typeof createCategory>>(
    createCategory,
    {}
  );

  return (
    <form action={action}>
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
            <div className=" text-red-600">
              Внимание! изменение данных параметров может привести к необратимым
              последствиям!!! Не стоит менять вообще эти данные
            </div>
            <Label className="block mb-4">
              <div className="mb-2 text-lg">Уровень</div>
              <Input name="level" type="number" value={level} />
            </Label>
            {parentId && (
              <Label className="block mb-4">
                <div className="mb-2 text-lg">parentId</div>
                <Input name="parentId" type="number" value={parentId} />
              </Label>
            )}
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
      {status.pending ? "loading.." : "Создать"}
    </Button>
  );
};

export default CreateCategoryForm;
