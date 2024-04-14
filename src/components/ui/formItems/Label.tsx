import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  text: string;
  required?: boolean;
};

export const Label: FC<Props> = ({ children, text, required }) => {
  return (
    <label className="flex flex-col mb-3">
      <div className="relative mb-1 text-slate-500">
        {text}
        {required && <span className=" text-red-600 ml-1">*</span>}
      </div>
      {children}
    </label>
  );
};
