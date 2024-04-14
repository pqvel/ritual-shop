"use client";
import { FC, Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { v4 as uuid } from "uuid";
type BreadcrumbItemType = {
  title: string;
  href: string;
};

type Props = {
  items: BreadcrumbItemType[];
};

const BreadcrumbNav: FC<Props> = ({ items }) => {
  const itemsWithoutLastItem = items.slice(0, -1);
  return (
    <Breadcrumb className=" mb-4">
      <BreadcrumbList>
        {itemsWithoutLastItem.map(({ title, href }) => (
          <Fragment key={uuid()}>
            <BreadcrumbItem>
              <Link className=" text-blue-500 hover:text-blue-700" href={href}>
                {title}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          </Fragment>
        ))}

        <BreadcrumbItem className=" text-gray-500">
          {items[items.length - 1].title}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
