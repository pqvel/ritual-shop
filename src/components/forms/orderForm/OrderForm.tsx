"use client";
import { FC } from "react";
import { useFormState } from "react-dom";
import { Button, Label, Input } from "@/components/ui/formItems";
import { sendEmail } from "@/app/actions/email";

const OrderForm: FC = () => {
  const [state, action] = useFormState<any>(sendEmail, {
    name: "",
    phone: "",
    message: "",
  });

  return (
    <form
      action={action}
      className="flex flex-col items-start bg-white border border-gray-200 shadow p-5 lg:p-8 rounded"
    >
      <div className="grid sm:grid-cols-2 sm:gap-4 w-full">
        <Label text="Ваше имя:" required>
          <Input.TextInput name="name" placeholder="Иван" maxLength={30} />
          {state?.name && (
            <div className=" text-red-600 mt-2">{state.name}</div>
          )}
        </Label>
        <Label text="Номер телефона:" required>
          <Input.PhoneInput />
          {state?.phone && (
            <div className=" text-red-600 mt-2">{state.phone}</div>
          )}
        </Label>
      </div>
      <div className="w-full">
        <Label text="Оставьте сообщение:">
          <Input.TextArea
            name="message"
            maxLength={500}
            placeholder="Комментарий"
          />
        </Label>
      </div>

      <Button disabled={state?.success}>
        {state.success ? "Отправлено" : "Отправить"}
      </Button>
    </form>
  );
};

export default OrderForm;
