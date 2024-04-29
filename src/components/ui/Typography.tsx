import { FC, ReactNode } from "react";

type PageTitleProps = {
  level: 1 | 2 | 3 | 4 | 5;
  styleLvl?: 1 | 2 | 3 | 4 | 5;
  children: ReactNode | string;
};

const stylesByLevel = {
  1: "text-2xl font-semibold  sm:text-3xl md:text-4xl mb-6 md:mb-8",
  2: "text-xl",
  3: "text-lg",
  4: "text-base",
  5: "text-sm",
};

export const Title: FC<PageTitleProps> = ({
  level,
  styleLvl = level,
  children,
}) => {
  const TitleTag = `h${level}` as keyof JSX.IntrinsicElements;

  return <TitleTag className={stylesByLevel[styleLvl]}>{children}</TitleTag>;
};
