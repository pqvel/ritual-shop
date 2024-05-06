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
import Link from "next/link";

type Props = {
  categoryId: number;
  categorySlug: string;
  childCategorySLug?: string;
};

const Dropdowm: FC<Props> = ({
  categoryId,
  categorySlug,
  childCategorySLug,
}) => {
  const EditLinkHref = childCategorySLug
    ? `/admin/catalog/${categorySlug}/${childCategorySLug}/change-category`
    : `/admin/catalog/${categorySlug}/change-category`;
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
        <DropdownMenuItem>
          <Link href={EditLinkHref}>Редактировать</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdowm;
