"use client";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/shadcn-ui/dropdown-menu";
import { Button } from "@/components/ui/shadcn-ui/button";
import { DeleteCategory } from "./Actions";

const Dropdowm: FC<{ categoryId: number }> = ({ categoryId }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">edit</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white" align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteCategory categoryId={categoryId} />
        </DropdownMenuItem>
        <DropdownMenuItem>Редактировать</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdowm;
