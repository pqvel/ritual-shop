import React, { ChangeEvent, FocusEvent, FC } from "react";

type Props = {
  className?: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export const TextInput: FC<Props> = (props) => (
  <input {...props} className={`input ${props.className}`} type="text" />
);

export const NumberInput: FC<Props> = (props) => (
  <input {...props} className={`input ${props.className}`} type="number" />
);

export const PhoneInput: FC<Props> = (props) => (
  <input {...props} className={`input ${props.className}`} type="tel" />
);

type PropsTextarea = {
  className?: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
};

export const TextArea: FC<PropsTextarea> = (props) => (
  <textarea
    {...props}
    className={`input resize-none h-36 ${props.className}`}
  />
);

type CheckboxProps = {
  label: string;
  name: string;
  value: string;
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ value, name, label }) => {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex items-center rounded-full cursor-pointer mr-2"
        htmlFor={`checkbox-${name}-${value}`}
      >
        <input
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900"
          type="checkbox"
          name={name}
          value={value}
          id={`checkbox-${name}-${value}`}
        />
        <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </label>
      <label
        className="mt-px font-light text-gray-700 cursor-pointer select-none"
        htmlFor={`checkbox-${name}-${value}`}
      >
        {label}
      </label>
    </div>
  );
};
