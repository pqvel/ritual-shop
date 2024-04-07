import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

// размер одиночный двойной
type Props = {
  href: string;
  image: string;
  title: string;
  price: string;
  vendorCode: string;
};

const ProductCart: FC<Props> = ({ href, image, title, price, vendorCode }) => {
  return (
    <Link
      href={href}
      className="group flex flex-col w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg lg:hover:-translate-y-1 will-change-transform transition overflow-hidden"
    >
      <Image
        className="w-full"
        width={100}
        height={100}
        src={image}
        alt={title}
      />

      <div className="p-4">
        <div className="font-semibold text-lg">{title}</div>
        <div className="flex justify-between items-end mt-3">
          <div className="text-lg font-semibold">
            от <div className=" text-2xl text-cyan-700">{price}</div> руб
          </div>
          <div className=" text-gray-500">{vendorCode}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCart;
