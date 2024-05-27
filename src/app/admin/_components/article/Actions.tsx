"use client";
import { FC, ChangeEvent, useState } from "react";
// import { Checkbox } from "@/components/ui/shadcn-ui/checkbox";
import { Button } from "@/components/ui/shadcn-ui/button";
import { changeArticleActive, deleteArticle } from "@/app/actions/articles";
type ToggleActiveCheckboxProps = {
  isActive: boolean;
  id: number;
};

export const ToggleActiveCheckbox: FC<ToggleActiveCheckboxProps> = ({
  isActive,
  id,
}) => {
  const [checked, setChecked] = useState<boolean>(isActive);

  const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    changeArticleActive(id, e.target.checked);
  };

  return <input type="checkbox" onChange={changeChecked} checked={checked} />;
};

export const DeleteArticle: FC<{ id: number }> = ({ id }) => {
  return (
    <Button variant="destructive" onClick={() => deleteArticle(id)}>
      Удалить
    </Button>
  );
};
