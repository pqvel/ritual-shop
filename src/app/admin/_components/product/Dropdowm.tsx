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
import { DeleteProduct } from "./Actions";

const Dropdowm: FC<{ productId: number }> = ({ productId }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">edit</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white" align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteProduct productId={productId} />
        </DropdownMenuItem>
        <DropdownMenuItem>Редактировать</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdowm;
