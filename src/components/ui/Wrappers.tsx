import { FC, ReactNode } from "react";

type PropsContainer = {
  children: ReactNode;
  className?: string;
};

export const Container: FC<PropsContainer> = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl w-full mx-auto px-3 md:px-5 ${className}`}>
      {children}
    </div>
  );
};

type PropsGrid = {
  children: ReactNode;
};

export const Grid: FC<PropsGrid> = ({ children }) => {
  return (
    <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
};

export const CatalogGrid: FC<PropsGrid> = ({ children }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 w-full">
      {children}
    </div>
  );
};

type PropsAside = {
  children: ReactNode;
  className?: string;
};

export const Aside: FC<PropsAside> = ({ children, className = "" }) => {
  return (
    <aside
      className={`flex flex-col w-96 border-gray-200 bg-white rounded shadow p-5 ${className}`}
    >
      {children}
    </aside>
  );
};
