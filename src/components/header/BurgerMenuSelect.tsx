"use client";
import classNames from "classnames";
import { FC, useState } from "react";
import Link from "next/link";

type Props = {
  title: string;
  items: {
    href: string;
    title: string;
    key: string | number;
  }[];
};

const BurgerMenuSelect: FC<Props> = ({ title, items }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleSelect = () => {
    setOpen(!open);
  };

  return (
    <li className="flex flex-col items-center mb-1">
      <button
        className="relative flex items-center text-xl font-medium outline-none m-0 border-none px-2 py-1"
        onClick={toggleSelect}
      >
        {title}
        <ArrowIcon open={open} />
      </button>
      {open && (
        <ul className="flex flex-col items-center">
          {items.map((item) => (
            <li className="flex" key={item.key}>
              <Link
                className=" text-lg text-gray-600 text-center"
                href={item.href}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default BurgerMenuSelect;

type ArrowIconProps = {
  open: boolean;
};

const ArrowIcon: FC<ArrowIconProps> = ({ open }) => (
  <svg
    className={classNames(
      "absolute top-1/2 -translate-y-1/2 -right-5 flex transition-[0.3s]",
      {
        "rotate-90": !open,
        "-rotate-90": open,
      }
    )}
    width={20}
    height={20}
  >
    <use href="/images/sprites.svg#icon-arrow"></use>
  </svg>
);
