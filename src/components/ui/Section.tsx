import Link from "next/link";
import { ReactNode, FC } from "react";

type PropsSection = {
  children: ReactNode;
  className?: string;
};

export const Section: FC<PropsSection> = ({ children, className = "" }) => {
  return <section className={`py-12 ${className}`}>{children}</section>;
};

type PropsSectionTitle = {
  children: ReactNode;
};

export const SectionTitle: FC<PropsSectionTitle> = ({ children }) => {
  return <h2 className=" text-4xl font-bold">{children}</h2>;
};

type PropsSectionTitleGroup = {
  children: ReactNode;
};

export const SectionTitleGroup: FC<PropsSectionTitleGroup> = ({ children }) => {
  return (
    <div className="flex justify-between items-center mb-6">{children}</div>
  );
};

type PropsSectionLink = {
  children: ReactNode;
  href: string;
};

export const SectionLink: FC<PropsSectionLink> = ({ children, href }) => {
  return (
    <Link
      href={href}
      className="flex justify-between items-center text-blue-600 hover:text-blue-800"
    >
      {children}
    </Link>
  );
};
