import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { Article } from "@prisma/client";
import { formatDate } from "@/utils/format";

type Props = {
  article: Article;
};

const ArticleCard: FC<Props> = ({
  article: { image, title, slug, createdAt },
}) => (
  <Link
    href={`/articles/${slug}`}
    className="group flex flex-col w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg lg:hover:-translate-y-1 will-change-transform transition overflow-hidden"
  >
    <div className="flex relative w-full pt-[100%]">
      <Image
        className="absolute top-0 left-0 w-full h-full  object-cover"
        width={300}
        height={300}
        src={image}
        alt={title}
      />
    </div>

    <div className="flex flex-col p-4">
      <span className=" font-semibold text-gray-400 mb-2">
        {formatDate(createdAt)}
      </span>
      <p className=" line-clamp-2  h-12 font-semibold text-lg">{title}</p>
    </div>
  </Link>
);

export default ArticleCard;

export const ArticleCardSkeleton: FC<{ className?: string }> = ({
  className,
}) => (
  <div className={classNames("flex flex-col bg-white shadow-md", className)}>
    <div className="skeleton w-full pt-[100%]"></div>
    <div className="flex flex-col p-4">
      <div className="skeleton text-lg h-6 w-full rounded"></div>
      <div className="skeleton h-12 mt-2 w-full"></div>
    </div>
  </div>
);
