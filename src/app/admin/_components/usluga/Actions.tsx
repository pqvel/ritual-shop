"use client";
import { FC, ChangeEvent, useState } from "react";
import { changeUslugaActive, deleteUsluga } from "@/app/actions/uslugi";
import { Button } from "@/components/ui/shadcn-ui/button";

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
    changeUslugaActive(productId, e.target.checked);
  };

  return <input type="checkbox" onChange={changeChecked} checked={checked} />;
};

export const DeleteProduct: FC<{ productId: number }> = ({ productId }) => {
  return (
    <Button variant="destructive" onClick={() => deleteUsluga(productId)}>
      Удалить
    </Button>
  );
};
