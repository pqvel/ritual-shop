"use client";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { v4 as uuid } from "uuid";
import { Card, CardHeader, CardContent } from "@/components/ui/shadcn-ui/card";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
import { changeProduct } from "@/app/actions/products";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/shadcn-ui/table";
import { TrashIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";

const ChangeProductForm = ({
  productId,
  initialValues: { product, productCharacteristics },
}) => {
  const [state, action] = useFormState(changeProduct, {});
  const [isPriceAgreement, setAgreementPrice] = useState(
    product.isAgreementPrice
  );

  const [characteristics, setCharacteristics] = useState(
    productCharacteristics.map((characteristic) => ({
      id: characteristic.id,
      title: characteristic.title,
      values: characteristic.variants.map((variant) => {
        return {
          id: uuid(),
          value: variant,
        };
      }),
    }))
  );

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

  const deleteCharacteristic = (id) => {
    setCharacteristics((characteristics) =>
      characteristics.filter((char) => char.id !== id)
    );
  };

  const onSubmit = (formData) => {
    formData.append("characteristics", JSON.stringify(characteristics));
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
            <Input
              placeholder="Памятник вертикальный гранитный"
              name="title"
              defaultValue={product.title}
            />
            {state?.title && (
              <div className=" text-red-600 mt-2">{state.title}</div>
            )}
          </Label>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Артикул</div>
            <Input
              placeholder="А-16"
              name="vendorCode"
              defaultValue={product.vendorCode}
            />
            {state?.vendorCode && (
              <div className=" text-red-600 mt-2">{state.vendorCode}</div>
            )}
          </Label>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Изображение</div>
            <Input
              placeholder="Выберите изображение"
              name="image"
              type="file"
              accept="image/jpeg"
            />
            {state?.image && (
              <div className=" text-red-600 mt-2">{state.image}</div>
            )}
          </Label>

          <Label className="block mb-4">
            <div className="mb-2 text-lg">Описание</div>
            <Textarea name="description" defaultValue={product.description} />
          </Label>

          <div className="block mb-4">
            <div className="mb-2 text-lg">Цена</div>
            <div className="flex items-center">
              <Input
                className="mr-4 w-80"
                placeholder="1200"
                name="price"
                type="number"
                defaultValue={product.price}
                disabled={isPriceAgreement}
              />
              <label className="flex items-center flex-shrink-0 cursor-pointer">
                <input
                  className=" mr-2"
                  type="checkbox"
                  name="isAgreementPrice"
                  checked={isPriceAgreement}
                  onChange={(e) => setAgreementPrice(e.target.checked)}
                />
                Договорная
              </label>
            </div>
          </div>

          <Table className="bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Значение</TableHead>
                <TableHead>Значение</TableHead>
                <TableHead>Значение</TableHead>
                <TableHead>Удалить</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {characteristics.map(({ title, id, values = [] }) => (
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
                  <TableCell>
                    <Button
                      onClick={() => deleteCharacteristic(id)}
                      variant="destructive"
                    >
                      <TrashIcon width={24} height={24} />
                    </Button>
                  </TableCell>
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
              <div className="mb-2 text-lg">ID Главной категории</div>
              <Input name="id" value={productId} />
              {state?.productId && (
                <div className=" text-red-600 mt-2">{state.productId}</div>
              )}
            </Label>
          </details>

          <SubmitButton />
        </CardContent>
      </Card>
    </form>
  );
};

export default ChangeProductForm;

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <Button className="w-auto" type="submit" disabled={status.pending}>
      {status.pending ? "Загрузка.." : "Сохранить"}
    </Button>
  );
};
