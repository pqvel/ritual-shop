import { FC, Fragment } from "react";
import Link from "next/link";
import { v4 as uuid } from "uuid";

type BreadcrumbItemType = {
  title: string;
  href: string;
};

type Props = {
  items: BreadcrumbItemType[];
};

const Breadcrumb: FC<Props> = ({ items }) => {
  const itemsWithoutLastItem = items.slice(0, -1);
  return (
    <nav className="flex mb-4">
      {itemsWithoutLastItem.map(({ title, href }) => (
        <Fragment key={uuid()}>
          <Link className=" text-blue-500 hover:text-blue-700 mr-3" href={href}>
            {title}
          </Link>
          <div className="mr-3">/</div>
        </Fragment>
      ))}
      <span className=" text-gray-500">{items[items.length - 1].title}</span>
    </nav>
  );
};

export default Breadcrumb;
