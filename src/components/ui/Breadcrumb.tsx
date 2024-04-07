import Link from "next/link";
import { FC } from "react";

type Props = {
  items: BreadcrumbItem[];
};

type BreadcrumbItem = {
  href: string;
  title: string;
};

const Breadcrumb: FC<Props> = ({ items }) => {
  return (
    <nav className="flex items-center text-sm mb-2">
      {items.map(({ href, title }, index) => {
        if (index !== items.length - 1) {
          return (
            <>
              <Link
                className="text-blue-600 lg:hover:text-blue-700"
                key={href}
                href={href}
              >
                {title}
              </Link>
              <BreadcrumbSeparator />
            </>
          );
        }

        return (
          <span className="text-gray-400" key={href}>
            {title}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;

const BreadcrumbSeparator: FC = () => (
  <div className="flex w-1 h-1 bg-gray-400 rounded-full mx-2"></div>
);
