"use client";
import { FC, ChangeEvent, useState } from "react";
import { changeCategoryActive, deleteCategory } from "@/app/actions/categories";
import { Button } from "@/components/ui/shadcn-ui/button";

type ToggleActiveCheckboxProps = {
  isActive: boolean;
  categoryId: number;
};

export const ToggleActiveCheckbox: FC<ToggleActiveCheckboxProps> = ({
  isActive,
  categoryId,
}) => {
  const [checked, setChecked] = useState<boolean>(isActive);

  const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    changeCategoryActive(categoryId, e.target.checked);
  };

  return <input type="checkbox" onChange={changeChecked} checked={checked} />;
};

export const DeleteCategory: FC<{ categoryId: number }> = ({ categoryId }) => {
  const handleDelete = () => {
    deleteCategory(categoryId);
  };
  return (
    <Button variant="destructive" onClick={handleDelete}>
      Удалить
    </Button>
  );
};
