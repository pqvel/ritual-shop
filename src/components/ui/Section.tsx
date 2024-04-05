import { ReactNode, FC } from "react";

type PropsSection = {
  children: ReactNode;
  className?: string;
};

export const Section: FC<PropsSection> = ({ children, className = "" }) => {
  return <section className={`py-10 ${className}`}>{children}</section>;
};

type PropsSectionTitle = {
  children: ReactNode;
};

export const SectionTitle: FC<PropsSectionTitle> = ({ children }) => {
  return <h2 className="text-xl font-bold mb-4">{children}</h2>;
};
