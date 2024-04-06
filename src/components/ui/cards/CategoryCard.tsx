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
    <Link
      className="flex items-center rounded-lg p-3  bg-white shadow lg:hover:shadow-md transition"
      href={href}
    >
      <Image
        className=" rounded-lg mr-3"
        width={100}
        height={100}
        src={image}
        alt={title}
      />
      <div className="text-xl font-medium">{title}</div>
    </Link>
  );
};

export default CategoryCard;
