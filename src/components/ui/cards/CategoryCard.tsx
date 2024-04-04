import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

type Props = {
  title: string;
  href: string;
  image: string;
};

const CategoryCard: FC<Props> = ({ title, href, image }) => {
  return (
    <Link className=" bg-slate-200 rounded-lg" href={href}>
      <Image width={100} height={100} src={image} alt={title} />
      <div className=" text-xl font-medium">{title}</div>
    </Link>
  );
};

export default CategoryCard;
