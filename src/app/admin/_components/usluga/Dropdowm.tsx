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
import Link from "next/link";

type Props = {
  id: number;
  uslugaSlug: string;
};

const Dropdowm: FC<Props> = ({ id, uslugaSlug }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">edit</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white" align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteProduct productId={id} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/admin/uslugi/${uslugaSlug}/change-usluga`}>
            Редактировать
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdowm;
