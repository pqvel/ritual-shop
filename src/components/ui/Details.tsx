import { FC, ReactNode } from "react";
import { v4 as uuid } from "uuid";

type Props = {
  title: string;
  children: ReactNode;
};

const Details: FC<Props> = ({ title, children }) => {
  const id = uuid();
  return (
    <>
      <details className="overflow-hidden shadow-sm text-lg">
        <summary className="relative flex items-center justify-between bg-white p-3 md:p-5 marker:hidden cursor-pointer font-medium rounded">
          <span
            className="text-black mr-4"
            role="term"
            aria-details={`pure-css-${id}`}
          >
            {title}
          </span>
          <svg
            className="transition-all min-w-7 min-h-7"
            width={28}
            height={28}
          >
            <use href="/images/sprites.svg#icon-arrow"></use>
          </svg>
        </summary>
      </details>
      <div
        role="definition"
        id={`pure-css-${id}`}
        className="content max-h-0 overflow-hidden transition-all bg-white box-border py-0 shadow-sm rounded"
      >
        <div className="p-3 md:p-5">{children}</div>
      </div>
    </>
  );
};

export default Details;
