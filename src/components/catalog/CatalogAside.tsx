"use client";
import { usePopup } from "@/hooks/usePopup";
import classNames from "classnames";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const CatalogAside: FC<Props> = ({ children }) => {
  const { active, togglePopup } = usePopup();
  return (
    <>
      <button
        className="flex items-center px-4 py-2 transition bg-cyan-800 text-white text-lg w-full justify-between sm:justify-normal lg:hidden sm:w-auto"
        onClick={togglePopup}
      >
        Категории
        <svg className="ml-5" width={24} height={24}>
          <use href="/images/sprites.svg#icon-catalog-menu"></use>
        </svg>
      </button>
      <div
        className={classNames(
          "fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50",
          { hidden: !active }
        )}
        onClick={togglePopup}
      ></div>
      <aside
        className={classNames(
          "fixed left-0 top-0 z-10 h-full flex flex-col bg-white w-full max-w-80 mr-4 transtition duration-300 lg:relative lg:rounded-lg lg:-translate-x-0 lg:z-0",
          {
            "-translate-x-full": !active,
          }
        )}
      >
        <div className="relative p-4 text-center font-semibold text-xl border-b border-gray-200">
          Категории
          <button
            onClick={togglePopup}
            className="lg:hidden absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center w-8 h-8 outline-none cursor-pointer text-gray-500"
          >
            <svg width={22} height={22}>
              <use href="/images/sprites.svg#icon-close"></use>
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-4 pb-8">{children}</div>
      </aside>
    </>
  );
};

export default CatalogAside;
