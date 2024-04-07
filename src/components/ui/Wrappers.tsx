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
    <div className="w-full grid gap-4 grid-cols-[repeat(_auto-fit,_minmax(260px,_1fr))]">
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
