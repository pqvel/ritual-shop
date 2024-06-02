import { FC } from "react";

type Props = {
  className?: string;
};

const SkeletonCard: FC<Props> = ({ className = "" }) => (
  <div className={`flex flex-col bg-white shadow-md ${className}`}>
    <div className="loading w-full pt-[100%]"></div>
    <div className="flex flex-col p-4">
      <div className=" loading text-lg h-14 w-full rounded"></div>
      <div className=" loading h-9 mt-3 w-full"></div>
    </div>
  </div>
);

export default SkeletonCard;
