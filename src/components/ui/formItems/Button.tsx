import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import Loader from "@/components/ui/Loader";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
};

export const Button: FC<Props> = ({
  children,
  disabled,
  type = "submit",

  onClick,
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex items-center justify-center text-white bg-cyan-800 py-2 px-6 rounded-lg transition lg:hover:bg-cyan-900 lg:hover:shadow-sm min-w-36 font-medium disabled:opacity-75"
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending ? <Loader width={24} height={24} /> : children}
    </button>
  );
};
