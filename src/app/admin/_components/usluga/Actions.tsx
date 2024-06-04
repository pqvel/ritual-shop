"use client";
import { FC, ChangeEvent, useState } from "react";
// import { Checkbox } from "@/components/ui/shadcn-ui/checkbox";
import { changeCategoryActive, deleteCategory } from "@/app/actions/categories";
import { Button } from "@/components/ui/shadcn-ui/button";
import { changeProductActive, deleteProduct } from "@/app/actions/products";

type ToggleActiveCheckboxProps = {
  isActive: boolean;
  productId: number;
};

export const ToggleActiveCheckbox: FC<ToggleActiveCheckboxProps> = ({
  isActive,
  productId,
}) => {
  const [checked, setChecked] = useState<boolean>(isActive);

  const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    changeProductActive(productId, e.target.checked);
  };

  return <input type="checkbox" onChange={changeChecked} checked={checked} />;
};

export const DeleteProduct: FC<{ productId: number }> = ({ productId }) => {
  return (
    <Button variant="destructive" onClick={() => deleteProduct(productId)}>
      Удалить
    </Button>
  );
};
