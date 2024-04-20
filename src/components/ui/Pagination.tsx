import Link from "next/link";
import { FC, ReactNode } from "react";
import classNames from "classnames";
type Props = {
  currentPage: number;
  countPages: number;
  href: string;
};

const Pagination: FC<Props> = ({ currentPage, countPages, href }) => {
  console.log(currentPage);
  if (countPages === 1) return null;

  return (
    <ul className="flex justify-center items-center list-style-none mt-10">
      {currentPage !== 1 && (
        <PaginationItem href={`${href}/?page=${currentPage - 1}`}>
          <svg className="rotate-180" width={20} height={20}>
            <use href="/images/sprites.svg#icon-arrow"></use>
          </svg>
        </PaginationItem>
      )}

      {currentPage - 2 > 0 && (
        <PaginationItem href={`${href}/?page=${currentPage - 2}`}>
          {currentPage - 2}
        </PaginationItem>
      )}
      {currentPage - 1 > 0 && (
        <PaginationItem href={`${href}/?page=${currentPage - 1}`}>
          {currentPage - 1}
        </PaginationItem>
      )}
      <PaginationItem active href={`${href}/?page=${currentPage}`}>
        {currentPage}
      </PaginationItem>
      {currentPage + 1 <= countPages && (
        <PaginationItem href={`${href}/?page=${currentPage + 1}`}>
          {currentPage + 1}
        </PaginationItem>
      )}
      {currentPage + 2 <= countPages && (
        <PaginationItem href={`${href}/?page=${currentPage + 2}`}>
          {currentPage + 2}
        </PaginationItem>
      )}

      {countPages !== currentPage && (
        <PaginationItem href={`${href}/?page=${currentPage + 1}`}>
          <svg width={20} height={20}>
            <use href="/images/sprites.svg#icon-arrow"></use>
          </svg>
        </PaginationItem>
      )}
    </ul>
  );
};

export default Pagination;

type PaginationItemProps = {
  children: ReactNode;
  href: string;
  active?: boolean;
};

const PaginationItem: FC<PaginationItemProps> = ({
  children,
  href,
  active = false,
}) => {
  return (
    <li className="flex mx-1.5">
      <Link
        className={classNames(
          "flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition",
          {
            "bg-cyan-700 lg:hover:bg-cyan-800 text-white": active,
            "bg-gray-200 lg:hover:bg-gray-300 text-black": !active,
          }
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};
