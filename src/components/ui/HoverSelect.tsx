import React, { FC, ReactNode } from "react";

type Props = {
  header: ReactNode;
  body: ReactNode;
};

const HoverSelect: FC<Props> = ({ header, body }) => {
  return (
    <div className="group relative">
      <div>{header}</div>
      <div className=" hidden group-hover:flex flex-col absolute -left-2 top-full  bg-cyan-900 p-2 text-nowrap">
        {body}
      </div>
    </div>
  );
};

export default HoverSelect;
