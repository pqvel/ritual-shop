import { FC } from "react";

type Props = {
  currentValue: string;
  values: string[];
  name: string;
  className?: string;
  setCurrentValue: (value: string) => void;
};

export const Select: FC<Props> = ({
  currentValue,
  values,
  name,
  className = "",
  setCurrentValue,
}) => {
  return (
    <div className={` relative ${className}`}>
      <div className="flex items-center justify-between bg-gray-200 px-5 py-3 cursor-pointer">
        {currentValue}
        <svg className="ml-4" width={20} height={20}>
          <use href="/images/sprites.svg#icon-select"></use>
        </svg>
      </div>
      {/* <div className="flex flex-col absolute top-14 w-full">
        {values.map((value) => (
          <SelectItem value={value} key={value} name={name} />
        ))}
      </div> */}
    </div>
  );
};

type SelectItemProps = {
  value: string;
  name: string;
};

const SelectItem: FC<SelectItemProps> = ({ value, name }) => {
  return (
    <label className="flex items-center justify-between bg-gray-200 px-5 py-3 cursor-pointer lg:hover:bg-gray-300">
      <input className="hidden" type="radio" name={name} />
      {value}
    </label>
  );
};

export default SelectItem;
