import { FC, ReactNode } from "react";

type ChildrenProps = {
  children: ReactNode;
};

export const Container: FC<ChildrenProps> = ({ children }) => {
  return <div className="w-full max-w-7xl px-3 mx-auto">{children}</div>;
};

export default Container;
