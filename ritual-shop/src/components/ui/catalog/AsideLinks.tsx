import Link from "next/link";
import React, { FC } from "react";

type AsideLinkType = {
  href: string;
  title: string;
};

type Props = {
  title: string;
  links: AsideLinkType[];
};

export const AsideLinks: FC<Props> = ({ title, links }) => {
  return (
    <div>
      <div className=" text-lg font-semibold mb-2">{title}</div>
      <ul className="grid grid-cols-1 gap-2">
        {links.map((link) => (
          <AsideLinkItem {...link} key={link.href} />
        ))}
      </ul>
    </div>
  );
};

const AsideLinkItem: FC<AsideLinkType> = ({ title, href }) => {
  return (
    <li className="flex">
      <Link
        className=" text-gray-500 lg:hover:text-gray-600 lg:hover:underline  underline-offset-4 transition"
        href={href}
      >
        {title}
      </Link>
    </li>
  );
};
