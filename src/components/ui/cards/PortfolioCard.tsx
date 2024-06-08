import Image from "next/image";
import { FC } from "react";
import { PortfolioProduct } from "@prisma/client";
import classNames from "classnames";

type Props = {
  product: PortfolioProduct;
};

const PortfolioCard: FC<Props> = ({ product }) => (
  <Image
    className="w-full"
    src={product.image}
    width={400}
    height={500}
    alt="Наши работы"
  />
);

export default PortfolioCard;

export const PortfolioCardSkeleton: FC<{ className?: string }> = ({
  className,
}) => (
  <div className={classNames("flex flex-col bg-white shadow-md", className)}>
    <div className="skeleton w-full pt-[125%]"></div>
    {/* <div className="flex flex-col p-4">
      <div className="skeleton text-lg h-14 w-full rounded"></div>
      <div className="skeleton h-9 mt-3 w-full"></div>
    </div> */}
  </div>
);
