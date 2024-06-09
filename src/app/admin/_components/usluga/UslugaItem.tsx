"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { TableRow, TableCell } from "@/components/ui/shadcn-ui/table";
import { Usluga } from "@prisma/client";
import { ToggleActiveCheckbox } from "./Actions";
import Dropdowm from "./Dropdowm";

type Props = {
  usluga: Usluga;
};

const UslugaItem: FC<Props> = ({
  usluga: { id, active, slug, image, title },
}) => {
  return (
    <>
      <TableRow className=" border-b-0" key={id}>
        <TableCell className="font-medium">
          <ToggleActiveCheckbox isActive={active} productId={id} />
        </TableCell>
        <TableCell className="font-medium">{id}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{slug}</TableCell>

        <TableCell>
          <Link className="flex" href={image} target="_blank">
            <Image width={100} height={100} src={image} alt={title} />
          </Link>
        </TableCell>
        <TableCell className="text-right">
          <Dropdowm uslugaSlug={slug} id={id} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default UslugaItem;
