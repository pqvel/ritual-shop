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
        className="min-h-[100px] max-h-[100px] min-w-[100px] max-w-[100px] rounded-lg mr-3"
        width={100}
        height={100}
        src={image}
        alt={title}
      />
      <div className="break-words white overflow-hidden">{title}</div>
    </Link>
  );
};

export default CategoryCard;
