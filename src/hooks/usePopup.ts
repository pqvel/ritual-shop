"use client";

import { useEffect, useState } from "react";

type UsePopupReturn = {
  active: boolean;
  togglePopup: () => void;
};

export const usePopup = (): UsePopupReturn => {
  const [active, setActive] = useState<boolean>(false);
  // const scrollBarWidth = getScrollBarWidth();

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "auto";
    // document.body.style.marginRight = active ? `${scrollBarWidth}px` : "0px";
  }, [active]);

  const togglePopup = () => {
    setActive((active) => !active);
  };

  return {
    active,
    togglePopup,
  };
};

// const getScrollBarWidth = (): number => {
//   const el = document.createElement("div");
//   el.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;";
//   document.body.appendChild(el);
//   const width = el.offsetWidth - el.clientWidth;
//   el.remove();
//   return width;
// };
