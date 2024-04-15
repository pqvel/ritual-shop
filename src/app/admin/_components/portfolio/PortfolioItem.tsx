"use client";
import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Table, TableRow, TableCell } from "@/components/ui/shadcn-ui/table";
import {
  PortfolioProduct,
  Product,
  ProductCharacteristic,
} from "@prisma/client";
import { ToggleActiveCheckbox } from "./Actions";
import Dropdowm from "./Dropdown";

type Props = {
  product: PortfolioProduct;
};

const PortfolioItem: FC<Props> = ({
  product: { id, active, image, createdAt },
}) => {
  return (
    <>
      <TableRow className=" border-b-0" key={id}>
        <TableCell className="font-medium">
          <ToggleActiveCheckbox isActive={active} productId={id} />
        </TableCell>
        <TableCell className="font-medium">{id}</TableCell>
        <TableCell className="font-medium">
          {createdAt.toDateString()}
        </TableCell>
        <TableCell className="font-medium">
          <Link className="flex" href={image} target="_blank">
            <Image width={100} height={100} src={image} alt={""} />
          </Link>
        </TableCell>
        <TableCell className="text-right">
          <Dropdowm productId={id} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default PortfolioItem;
