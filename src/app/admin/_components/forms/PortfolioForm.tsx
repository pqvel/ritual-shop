"use client";
import { FC } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/shadcn-ui/card";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Button } from "@/components/ui/shadcn-ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createPortfolioProduct } from "@/app/actions/portfolio";

const PortfolioForm: FC = () => {
  const [state, action] = useFormState<
    ReturnType<typeof createPortfolioProduct>
  >(createPortfolioProduct, {});

  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <h1 className=" text-2xl font-semibold">Добавить новый элемент</h1>
        </CardHeader>
        <CardContent>
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

export default PortfolioForm;
