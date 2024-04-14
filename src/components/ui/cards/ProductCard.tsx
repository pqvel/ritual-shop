import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
  href: string;
};

const ProductCart: FC<Props> = ({
  product: { image, title, price, vendorCode },
  href,
}) => {
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

      <div className="flex flex-col p-4">
        <p className=" font-semibold text-lg break-words max-h-14 min-h-14 overflow-hidden">
          {title}
        </p>
        <div className="flex justify-between items-end mt-3">
          <div className="flex text-lg font-semibold">
            от <div className=" text-2xl text-cyan-700 mx-2">{price}</div> руб
          </div>
          <div className=" text-gray-500">{vendorCode}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCart;
