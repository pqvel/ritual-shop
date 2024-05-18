"use client";
import { FC, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Product, ProductCharacteristic } from "@prisma/client";
import { Card, CardHeader, CardContent } from "@/components/ui/shadcn-ui/card";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
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

type Props = {
  productId: number;
  initialValues: { product: Product; characteristics: ProductCharacteristic[] };
};

const ChangeProductForm: FC<Props> = ({
  productId,
  initialValues: { product, characteristics },
}) => {
  const [formState, action] = useFormState(createProduct, {});

  const [chars, setCharacteristics] = useState([characteristics]);

  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <h1 className=" text-2xl font-semibold">Изменить товар</h1>
        </CardHeader>
        <CardContent>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Название</div>
            <Input
              placeholder="Памятник вертикальный гранитный"
              name="title"
              defaultValue={product.title}
            />
          </Label>
          <Label className="block mb-4">
            <div className="mb-2 text-lg">Артикул</div>
            <Input
              placeholder="А-16"
              name="vendorCode"
              defaultValue={product.vendorCode}
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

          <Label className="block mb-4">
            <div className="mb-2 text-lg">Цена</div>
            <Input
              placeholder="1200"
              name="price"
              type="number"
              defaultValue={product.price}
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
              {/* {chars.map(({ title, id, values }) => (
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
              ))} */}
            </TableBody>
            <TableFooter>
              <TableCell>
                <Button
                  // onClick={addCharactiristic}
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
              <div className="mb-2 text-lg">ID продукта</div>
              <Input name="id" value={productId} />
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
      {status.pending ? "loading.." : "Создать"}
    </Button>
  );
};
