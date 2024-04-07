import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CatalogSection: FC<Props> = ({ children }) => {
  return <div className="flex flex-col py-5">{children}</div>;
};

export default CatalogSection;
