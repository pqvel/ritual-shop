import Link from "next/link";
import { FC } from "react";

type Props = {
  title: string;
  href: string;
};
const ArticleCard: FC<Props> = ({ href }) => {
  return <Link href={href}>ArticleCard</Link>;
};

export default ArticleCard;
