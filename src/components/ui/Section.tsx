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
  return (
    <h2 className="font-semibold text-2xl md:text-3xl lg:text-3xl">
      {children}
    </h2>
  );
};

type PropsSectionTitleGroup = {
  children: ReactNode;
  className?: string;
};

export const SectionTitleGroup: FC<PropsSectionTitleGroup> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex items-center mb-4 md:mb-6 ${className}`}>
      {children}
    </div>
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
      className="flex justify-between items-center text-blue-600 lg:hover:text-blue-800"
    >
      {children}
    </Link>
  );
};
