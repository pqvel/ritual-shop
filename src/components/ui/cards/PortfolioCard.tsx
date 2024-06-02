import Image from "next/image";
import { FC } from "react";
import { PortfolioProduct } from "@prisma/client";

type Props = {
  product: PortfolioProduct;
};

const PortfolioCard: FC<Props> = ({ product }) => (
  <Image src={product.image} width={400} height={500} alt="Наши работы" />
);

export default PortfolioCard;
