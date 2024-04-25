import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const CatalogSection: FC<Props> = ({ children }) => {
  return <div className={`flex flex-col pt-5 pb-20 h-full`}>{children}</div>;
};

export default CatalogSection;
