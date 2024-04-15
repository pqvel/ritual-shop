"use client";
import { FC, ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/shadcn-ui/button";
import {
  changePortfolioProductActive,
  deletePortfolioProduct,
} from "@/app/actions/portfolio";

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
    changePortfolioProductActive(productId, e.target.checked);
  };

  return <input type="checkbox" onChange={changeChecked} checked={checked} />;
};

export const DeletePortfolioProduct: FC<{ productId: number }> = ({
  productId,
}) => {
  return (
    <Button
      variant="destructive"
      onClick={() => deletePortfolioProduct(productId)}
    >
      Удалить
    </Button>
  );
};
