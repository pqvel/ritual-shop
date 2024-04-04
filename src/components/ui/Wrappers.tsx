import { FC, ReactNode } from "react";

type PropsContainer = {
  children: ReactNode;
};

export const Container: FC<PropsContainer> = ({ children }) => {
  return <div className="max-w-7xl w-full mx-auto">{children}</div>;
};
