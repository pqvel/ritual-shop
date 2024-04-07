import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CatalogSection: FC<Props> = ({ children }) => {
  return <div className="flex flex-col pt-5 pb-20">{children}</div>;
};

export default CatalogSection;
