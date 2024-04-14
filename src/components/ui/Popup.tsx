"use client";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  closePopup: () => void;
};
// can server side if use link
// https://medium.com/@dtulpa16/next-js-modals-made-easy-7bdce15b2a5e
const Popup: FC<Props> = ({ children, closePopup }) => {
  return (
    <>
      {/* <div
        className="fixed top-0 left-0 w-full h-full bg-opacity-60 bg-black z-40"
        onClick={closePopup}
      /> */}
      <div className="fixed left-3 max-w-[calc(100%-24px)] top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md w-full z-50 p-5 sm:p-7 rounded-2xl bg-white shadow ">
        <button
          onClick={closePopup}
          className=" m-0 p-0 outline-none absolute right-4 top-4 flex justify-center items-center w-8 h-8"
        >
          <svg width={24} height={24}>
            <use href="/images/sprites.svg#icon-close"></use>
          </svg>
        </button>
        {children}
      </div>
    </>
  );
};

export default Popup;
