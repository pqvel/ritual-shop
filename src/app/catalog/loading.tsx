import { FC } from "react";
import { CatalogGrid } from "@/components/ui/Wrappers";

const countItemsPerPage = 18;

const Loading: FC = () => {
  const items = Array.from(
    { length: countItemsPerPage },
    (_, index) => index + 1
  );

  return (
    <CatalogGrid>
      {items.map((item) => (
        <div className="flex flex-col bg-white shadow-md" key={item}>
          <div className="loading w-full pt-[100%]" key={item}></div>
          <div className="flex flex-col p-4">
            <div className=" loading text-lg h-14 w-full rounded"></div>
            <div className=" loading h-9 mt-3 w-full"></div>
          </div>
        </div>
      ))}
    </CatalogGrid>
  );
};
export default Loading;
