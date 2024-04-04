import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  text: string;
};

export const Label: FC<Props> = ({ children, text }) => {
  return (
    <label className="flex flex-col mb-3">
      <span className="mb-1">{text}</span>
      {children}
    </label>
  );
};
