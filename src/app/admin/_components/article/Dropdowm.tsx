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
import { DeleteArticle } from "./Actions";
import Link from "next/link";

type Props = {
  id: number;
  // categorySlug: string;
  // childCategorySLug?: string;
};

const Dropdowm: FC<Props> = ({
  id,
  // categorySlug,
  // childCategorySLug,
}) => {
  // const EditLinkHref = childCategorySLug
  //   ? `/amin/catalog/${categorySlug}/${childCategorySLug}/change-category`
  //   : `/amin/catalog/${categorySlug}/change-category`;

  const EditLinkHref = "/";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">edit</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white" align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteArticle id={id} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={EditLinkHref}>Редактировать</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdowm;
