"use server";
import { FC, Fragment } from "react";
import { Category } from "@prisma/client";
import Link from "next/link";
import Separator from "../ui/Separator";

type Props = {
  categories: Array<{
    id: number;
    slug: string;
    title: string;
    childCategories: Category[];
  }>;
};

const CatalogAside: FC<Props> = async ({ categories }) => {
  return (
    <aside className="flex flex-col bg-white p-4 pb-8 rounded-lg w-80 min-w-80 mr-4">
      {categories.map((category, i) => (
        <Fragment key={category.id}>
          <Link
            className=" font-bold text-xl mb-2 transition lg:hover:underline underline-offset-2"
            href={`/catalog/${category.slug}`}
            key={category.id}
          >
            {category.title}
          </Link>
          <ul className="grid grid-cols-1 gap-1.5">
            {category.childCategories.map((childCategory) => (
              <li className="flex" key={childCategory.id}>
                <Link
                  className=" text-gray-600 transition lg:hover:text-gray-700 lg:hover:underline underline-offset-2"
                  href={`/catalog/${category.slug}/${childCategory.slug}`}
                >
                  {childCategory.title}
                </Link>
              </li>
            ))}
          </ul>
          {i !== categories.length - 1 && <Separator />}
        </Fragment>
      ))}
    </aside>
  );
};

export default CatalogAside;
