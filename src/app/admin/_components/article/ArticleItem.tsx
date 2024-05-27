import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { TableRow, TableCell } from "@/components/ui/shadcn-ui/table";
import { Article } from "@prisma/client";
import { ToggleActiveCheckbox } from "./Actions";
import Dropdowm from "./Dropdowm";

type Props = {
  article: Article;
};

const ArticleItem: FC<Props> = ({
  article: { id, active, slug, image, title, createdAt },
}) => {
  return (
    <TableRow key={id}>
      <TableCell className="font-medium">
        <ToggleActiveCheckbox isActive={active} id={id} />
      </TableCell>
      <TableCell className="font-medium">{id}</TableCell>
      <TableCell>
        {/* <Link
          className=" text-blue-500 underline underline-offset-2"
          href={link}
        > */}
        {title}
        {/* </Link> */}
      </TableCell>
      <TableCell>
        {/* <Link
          className=" text-blue-500 underline underline-offset-2"
          href={link}
        >
          {slug}
        </Link> */}
      </TableCell>
      <TableCell>{slug}</TableCell>
      <TableCell>
        <Link className="flex" href={image} target="_blank">
          <Image width={100} height={100} src={image} alt={title} />
        </Link>
      </TableCell>
      <TableCell className="text-right">
        <Dropdowm id={id} />
      </TableCell>
    </TableRow>
  );
};

export default ArticleItem;
