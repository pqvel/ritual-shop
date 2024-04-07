import Link from "next/link";
import { FC } from "react";

const Pagination: FC = () => {
  return (
    <nav className=" mt-8">
      <ul className=" grid grid-cols-5 gap-3 list-style-none">
        <li>
          <Link
            className="flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition  bg-gray-200 lg:hover:bg-gray-300"
            href="/catalog/"
          >
            {"<"}
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition  bg-cyan-700 lg:hover:bg-cyan-800 text-white"
            href="/catalog"
          >
            1
          </Link>
        </li>
        <li aria-current="page">
          <Link
            className="flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition  bg-gray-200 lg:hover:bg-gray-300"
            href="/catalog"
          >
            2
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition  bg-gray-200 lg:hover:bg-gray-300"
            href="/catalog"
          >
            3{" "}
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-center w-10 h-10 rounded-full text-sm text-surface transition  bg-gray-200 lg:hover:bg-gray-300"
            href="/catalog"
          >
            {">"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
