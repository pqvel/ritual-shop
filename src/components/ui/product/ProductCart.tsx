import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

// размер одиночный двойной
type Props = {
  href: string;
  image: string;
  title: string;
  price: string;
  category: string;
};

const ProductCart: FC<Props> = ({ href, image, title, price, category }) => {
  return (
    <Link
      href={href}
      className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="relative w-full pt-[100%]">
        <Image
          className="absolute top-0 left-0 w-full h-full object-contain"
          width={100}
          height={100}
          src={image}
          alt={title}
        />
      </div>
      <div className="p-4">
        <div className="font-bold text-lg">{title}</div>
        <div>{category}</div>
        <div>{price} руб.</div>
      </div>
    </Link>
  );
};

export default ProductCart;
