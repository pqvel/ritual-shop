import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CatalogTitle: FC<Props> = ({ children }) => {
  return <h1 className="text-4xl font-semibold mb-8">{children}</h1>;
};

export default CatalogTitle;
