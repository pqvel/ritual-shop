"use client";
import { FC, ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "@/components/ui/formItems";
import { TextInput, PhoneInput } from "@/components/ui/formItems/Input";
import Loader from "@/components/ui/Loader";
import { sendEmail } from "@/app/actions/email";

type Props = {
  message: string;
};

const ProductPageOrderForm: FC<Props> = ({ message }) => {
  const [state, action] = useFormState<any>(sendEmail, {
    name: "",
    phone: "",
  });

  return (
    <form action={action} className="flex flex-col w-full max-w-96">
      <Label text="Ваше имя:" required>
        <TextInput placeholder="Иван" name="name" />
        {state?.name && <div className=" text-red-600 mt-2">{state.name}</div>}
      </Label>
      <Label text="Номер телефона:" required>
        <PhoneInput />
        {state?.phone && (
          <div className=" text-red-600 mt-2">{state.phone}</div>
        )}
      </Label>
      <input type="hidden" value={message} name="message" />

      <Button disabled={state?.success}>
        {state.success ? "Отправлено" : "Отправить"}
      </Button>
    </form>
  );
};

export default ProductPageOrderForm;

type PropsB = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
};

export const Button: FC<PropsB> = ({
  children,
  disabled,
  type = "submit",
  onClick,
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex items-center justify-center mt-2 text-white py-2 px-6 bg-cyan-700 lg:hover:bg-cyan-800 rounded font-medium transition"
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending ? <Loader width={24} height={24} /> : children}
    </button>
  );
};
