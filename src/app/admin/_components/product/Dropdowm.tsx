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
  productId: number;
  categorySlug: string;
  childCategorySlug: string;
  productSlug: string;
};

const Dropdowm: FC<Props> = ({
  productId,
  categorySlug,
  childCategorySlug,
  productSlug,
}) => {
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
        <DropdownMenuItem>
          <Link
            href={`/admin/catalog/${categorySlug}/${childCategorySlug}/${productSlug}/change-product`}
          >
            Редактировать
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdowm;
