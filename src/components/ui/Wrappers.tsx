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
    <div className="grid gap-3 grid-cols-[repeat(_auto-fit,_minmax(260px,_1fr))]">
      {children}
    </div>
  );
};
