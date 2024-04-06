import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

const Button: FC<Props> = ({ children }) => {
  return <button>{children}</button>;
};

export default Button;
