import React, { FC } from "react";

type Props = {
  className?: string;
  placeholder?: string;
  name?: string;
};

export const TextInput: FC<Props> = (props) => (
  <input {...props} className={`input ${props.className}`} type="text" />
);

export const PhoneInput: FC<Props> = (props) => (
  <input {...props} className={`input ${props.className}`} type="tel" />
);

export const TextArea: FC<Props> = (props) => (
  <textarea
    {...props}
    className={`input resize-none h-36 ${props.className}`}
  />
);
