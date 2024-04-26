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
      <details className=" overflow-hidden">
        <summary>
          <span
            className="relative flex items-center pl-4 bg-gray-200 text-cyan-800 h-16"
            role="term"
            aria-details="pure-css"
          >
            Click to open and close smoothly with pure CSS
          </span>
        </summary>
      </details>
      <div
        role="definition"
        id="pure-css"
        className="content max-h-0 overflow-hidden px-3 transition-all"
      >
        {children}
      </div>
    </>
  );
};

export default Details;
