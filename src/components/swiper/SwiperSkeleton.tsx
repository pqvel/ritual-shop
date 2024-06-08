import React, { FC, ReactElement, cloneElement } from "react";

type SwiperSkeletonProps = {
  Skeleton: ReactElement;
};

const SwiperSkeleton: FC<SwiperSkeletonProps> = ({ Skeleton }) => {
  const addClassName = (element: ReactElement, additionalClass: string) => {
    const originalClassName = element.props.className || "";
    const combinedClassName = `${originalClassName} ${additionalClass}`.trim();
    return cloneElement(element, { className: combinedClassName });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {addClassName(Skeleton, "flex")}
      {addClassName(Skeleton, "hidden sm:flex")}
      {addClassName(Skeleton, "hidden md:flex")}
      {addClassName(Skeleton, "hidden lg:flex")}
    </div>
  );
};

export default SwiperSkeleton;
