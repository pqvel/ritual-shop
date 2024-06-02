import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
};

const ProductCart: FC<Props> = ({
  product: { image, title, price, vendorCode, isAgreementPrice, slug },
}) => (
  <Link
    href={`/goods/${slug}`}
    className="group flex flex-col w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg lg:hover:-translate-y-1 will-change-transform transition overflow-hidden"
  >
    <div className="flex relative w-full pt-[100%]">
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover"
        // objectFit="cover"
        width={300}
        height={300}
        src={image}
        alt={title}
      />
    </div>

    <div className="flex flex-col p-4">
      <p className=" h-14 text-lg font-semibold line-clamp-2">{title}</p>
      <div className="flex justify-between items-center mt-3">
        <div className="flex text-lg font-semibold items-center h-8">
          {isAgreementPrice ? (
            <>
              <div>Договорная</div>
            </>
          ) : (
            <>
              от <div className=" text-2xl text-cyan-700 mx-2">{price}</div> руб
            </>
          )}
        </div>
        <div className="flex justify-end text-gray-500 w-16">{vendorCode}</div>
      </div>
    </div>
  </Link>
);

export default ProductCart;

import React from "react";

export const ProductCardSkeleton: FC = () => (
  <div className="flex flex-col bg-white shadow-md">
    <div className="loading w-full pt-[100%]"></div>
    <div className="flex flex-col p-4">
      <div className=" loading text-lg h-14 w-full rounded"></div>
      <div className=" loading h-9 mt-3 w-full"></div>
    </div>
  </div>
);
