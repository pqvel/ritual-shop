"use client";
import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  closePopup: () => void;
};

const Popup: FC<Props> = ({ children, isOpen, closePopup }) => {
  const outputRef = useRef<Element | null>(null);

  useEffect(() => {
    outputRef.current = document.body;
  }, []);

  return outputRef.current ? (
    createPortal(
      <CSSTransition in={isOpen} timeout={200} classNames="popup">
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-60 bg-black z-40"
          onClick={closePopup}
        >
          <div
            className="fixed left-3 max-w-[calc(100%-24px)] top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md w-full z-50 p-5 sm:p-7 rounded-2xl bg-white shadow "
            onClick={(e) => e.stopPropagation()}
          >
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
        </div>
      </CSSTransition>,
      outputRef.current
    )
  ) : (
    <div></div>
  );
};

export default Popup;
