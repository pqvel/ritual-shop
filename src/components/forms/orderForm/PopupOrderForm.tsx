"use client";
import { FC } from "react";
import { useFormState } from "react-dom";
import { Button, Label, Input } from "@/components/ui/formItems";
import { sendEmail } from "@/app/actions/email";

const PopupOrderForm: FC = () => {
  const [state, action] = useFormState<any>(sendEmail, {
    name: "",
    phone: "",
    message: "",
  });

  return (
    <form action={action}>
      <div className=" text-2xl font-semibold text-black mb-4">
        Заказать звонок
      </div>
      <Label text="Ваше имя:" required>
        <Input.TextInput name="name" placeholder="Иван" maxLength={30} />

        {state?.name && <div className=" text-red-600 mt-2">{state.name}</div>}
      </Label>
      <Label text="Номер телефона:" required>
        <Input.PhoneInput />
        {state?.phone && (
          <div className=" text-red-600 mt-2">{state.phone}</div>
        )}
      </Label>
      <Label text="Оставьте сообщение:">
        <Input.TextArea
          name="message"
          maxLength={500}
          placeholder="Комментарий"
        />
      </Label>

      <div className="flex justify-end">
        <Button disabled={state?.success}>
          {state.success ? "Отправлено" : "Отправить"}
        </Button>
      </div>
    </form>
  );
};

export default PopupOrderForm;
