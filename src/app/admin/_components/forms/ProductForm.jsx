"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/shadcn-ui/card";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
import { useFormStatus } from "react-dom";
import { createProduct } from "@/app/actions/products";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/shadcn-ui/table";
import { v4 as uuid } from "uuid";

const ProductForm = ({ categoryId }) => {
  console.log(categoryId);
  const [formState, action] = useFormState(createProduct, {});

  const [characteristics, setCharacteristics] = useState([]);

  const changeCaracteristicTitle = (value, id) => {
    setCharacteristics((characteristics) =>
      characteristics.map((char) => {
        if (char.id !== id) return char;

        return { ...char, title: value };
      })
    );
  };

  const addCharactiristic = () => {
    setCharacteristics((characteristics) => [
      ...characteristics,
      {
        id: uuid(),
        title: "",
        values: [
          { id: uuid(), value: "" },
          { id: uuid(), value: "" },
          { id: uuid(), value: "" },
        ],
      },
    ]);
  };

  const changeCaracteristicValue = (value, id, valueId) => {
    setCharacteristics((items) =>
      items.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          values: item.values.map((val) => {
            if (val.id !== valueId) return val;

            return { ...val, value: value };
          }),
        };
      })
    );
  };

  const onSubmit = (formData) => {
    formData.append("characteristics", JSON.stringify(characteristics));
    // @ts-ignore
    action(formData);
  };

  return (
    <form action={onSubmit}>
      <Card>
        <CardHeader>
          <h1 className=" text-2xl font-semibold">Создание нового товара</h1>
        </CardHeader>
        <CardContent>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Название</div>
            <Input placeholder="Памятник вертикальный гранитный" name="title" />
          </Label>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Артикул</div>
            <Input placeholder="А-16" name="vendorCode" />
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

          <Table className="bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Значение</TableHead>
                <TableHead>Значение</TableHead>
                <TableHead>Значение</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {characteristics.map(({ title, id, values }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    <Input
                      placeholder="Материал"
                      value={title}
                      onChange={(e) =>
                        changeCaracteristicTitle(e.target.value, id)
                      }
                    />
                  </TableCell>
                  {values.map((val) => (
                    <TableCell key={val.id}>
                      <Input
                        value={val.value}
                        onChange={(e) =>
                          changeCaracteristicValue(e.target.value, id, val.id)
                        }
                        placeholder="Гранит"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableCell>
                <Button
                  onClick={addCharactiristic}
                  variant="outline"
                  type="button"
                >
                  Добавить свойство +
                </Button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableFooter>
          </Table>

          <details className="mb-4 cursor-pointer">
            <summary>Скрытые параметры</summary>
            <div className=" text-red-600">
              Внимание! изменение данных параметров может привести к необратимым
              последствиям!!! Не стоит менять вообще эти данные
            </div>
            <Label className="block mb-4">
              <div className="mb-2 text-lg">ID категории</div>
              <Input name="categoryId" value={categoryId} />
            </Label>
          </details>

          <SubmitButton />
        </CardContent>
      </Card>
    </form>
  );
};

export default ProductForm;

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <Button className="w-auto" type="submit" disabled={status.pending}>
      {status.pending ? "loading.." : "Создать"}
    </Button>
  );
};
