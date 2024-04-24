"use client";
import { usePopup } from "@/hooks/usePopup";
import classNames from "classnames";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const BurgerMenu: FC<Props> = ({ children }) => {
  const { active, togglePopup } = usePopup();

  return (
    <>
      <button
        className="flex lg:hidden absolute top-[15px] right-2 z-10 text-black m-o border-none"
        onClick={togglePopup}
      >
        <svg
          className=" w-12 block cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 10"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="rgba(0,0,0,0)"
          strokeLinecap="round"
        >
          <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
            <animate
              dur="0.2s"
              attributeName="d"
              values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
              fill="freeze"
              begin="start.begin"
            />
            <animate
              dur="0.2s"
              attributeName="d"
              values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
              fill="freeze"
              begin="reverse.begin"
            />
          </path>
          <rect width="10" height="10" stroke="none">
            <animate
              dur="2s"
              id="reverse"
              attributeName="width"
              begin="click"
            />
          </rect>
          <rect width="10" height="10" stroke="none">
            <animate
              dur="0.001s"
              id="start"
              attributeName="width"
              values="10;0"
              fill="freeze"
              begin="click"
            />
            <animate
              dur="0.001s"
              attributeName="width"
              values="0;10"
              fill="freeze"
              begin="reverse.begin"
            />
          </rect>
        </svg>
      </button>

      <nav
        className={classNames(
          `flex flex-col items-center justify-center lg:hidden fixed top-0 right-0 w-full h-full bg-white p-5 overflow-y-auto transition-all duration-300`,
          {
            "translate-x-full": !active,
          }
        )}
      >
        {children}
      </nav>
    </>
  );
};

export default BurgerMenu;
