import Link from "next/link";
import { FC, ReactNode } from "react";
// import classNames from "classnames";
// НУЖНО СДЕЛАТЬ НА КЛИЕНТЕ
type Props = {
  currentPage: number;
  countPages: number;
  href: string;
};

const Pagination: FC<Props> = ({ currentPage, countPages, href }) => {
  if (currentPage < 3) {
    return (
      <PaginationWrapper
        countPages={countPages}
        currentPage={currentPage}
        href={href}
      >
        <li>
          <Link
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition ${
              currentPage === 1
                ? "bg-cyan-700 lg:hover:bg-cyan-800 text-white"
                : "bg-gray-200 lg:hover:bg-gray-300 text-black"
            }`}
            href={`${href}/?page=${1}`}
          >
            1
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition ${
              currentPage === 2
                ? "bg-cyan-700 lg:hover:bg-cyan-800 text-white"
                : "bg-gray-200 lg:hover:bg-gray-300 text-black"
            }`}
            href={`${href}/?page=${2}`}
          >
            2
          </Link>
        </li>
        {countPages >= 3 && (
          <li>
            <Link
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition ${
                currentPage === 3
                  ? "bg-cyan-700 lg:hover:bg-cyan-800 text-white"
                  : "bg-gray-200 lg:hover:bg-gray-300 text-black"
              }`}
              href={`${href}/?page=${currentPage - 1}`}
            >
              3
            </Link>
          </li>
        )}
      </PaginationWrapper>
    );
  }
};

export default Pagination;

interface PaginationWrapperProps extends Props {
  children: ReactNode;
}

const PaginationWrapper: FC<PaginationWrapperProps> = ({
  currentPage,
  countPages,
  href,
  children,
}) => {
  return (
    <nav className=" mt-8">
      <ul className=" grid grid-cols-5 gap-3 list-style-none">
        {currentPage !== 1 && (
          <li>
            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition bg-gray-200 lg:hover:bg-gray-300 text-black"
              href={`${href}/?page=${currentPage - 1}`}
            >
              <svg className=" rotate-180" width={20} height={20}>
                <use href="/images/sprites.svg#icon-arrow"></use>
              </svg>
            </Link>
          </li>
        )}

        {children}

        {currentPage !== countPages && (
          <li>
            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition  bg-gray-200 lg:hover:bg-gray-300"
              href={`${href}/?page=${currentPage + 1}`}
            >
              <svg width={20} height={20}>
                <use href="/images/sprites.svg#icon-arrow"></use>
              </svg>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
