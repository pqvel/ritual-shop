"use client";
import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Table, TableRow, TableCell } from "@/components/ui/shadcn-ui/table";
import { Product, ProductCharacteristic, Usluga } from "@prisma/client";
import { ToggleActiveCheckbox } from "./Actions";
import Dropdowm from "./Dropdowm";

type Props = {
  usluga: Usluga;
  productCharacteristics: ProductCharacteristic[];
  categorySlug: string;
  childCategorySlug: string;
};

const UslugaItem: FC<Props> = ({
  usluga: { id, active, slug, image, title, content, createdAt },
  productCharacteristics,
  categorySlug,
  childCategorySlug,
}) => {
  const [isShowCharacteristics, setShowCharacteristics] =
    useState<boolean>(false);
  return (
    <>
      <TableRow className=" border-b-0" key={id}>
        <TableCell className="font-medium">
          <ToggleActiveCheckbox isActive={active} productId={id} />
        </TableCell>
        <TableCell className="font-medium">{id}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{slug}</TableCell>
        {/* <TableCell>{vendorCode}</TableCell>
        <TableCell>{price}</TableCell> */}
        <TableCell>
          <Link className="flex" href={image} target="_blank">
            <Image width={100} height={100} src={image} alt={title} />
          </Link>
        </TableCell>
        <TableCell className="text-right">
          <Dropdowm
            categorySlug={categorySlug}
            childCategorySlug={childCategorySlug}
            productSlug={slug}
            productId={id}
          />
        </TableCell>
      </TableRow>
      {productCharacteristics.length > 0 && (
        <TableRow className=" bg-slate-100">
          <TableCell align="right" colSpan={8}>
            <Table>
              {productCharacteristics.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className=" font-medium">{item.title}</TableCell>
                  <TableCell>{item.variants[0]}</TableCell>
                  <TableCell>{item.variants[1]}</TableCell>
                  <TableCell>{item.variants[2]}</TableCell>
                </TableRow>
              ))}
            </Table>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default UslugaItem;
