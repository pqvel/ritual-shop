import React, { FC, ReactNode } from "react";

type Props = {
  header: ReactNode;
  body: ReactNode;
  className?: string;
};

const HoverSelect: FC<Props> = ({ header, body, className = "" }) => {
  return (
    <div className={`group relative ${className}`}>
      <div className=" flex items-center">
        {header}
        <svg width={20} height={20}>
          <use href="/images/sprites.svg#icon-select"></use>
        </svg>
      </div>
      <div className=" hidden group-hover:flex flex-col absolute -left-2 top-full  bg-cyan-900 p-2 text-nowrap">
        {body}
      </div>
    </div>
  );
};

export default HoverSelect;
