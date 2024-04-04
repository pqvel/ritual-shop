import React from "react";
import { Label } from "../ui/formItems/Label";
import { TextInput, PhoneInput, TextArea } from "../ui/formItems/Input";
import Button from "../ui/formItems/Button";

const FeedbackForm = () => {
  return (
    <form>
      <h2 className=" text-2xl font-semibold text-black mb-4">
        Заказать звонок
      </h2>
      <Label text="Ваше имя:" required>
        <TextInput placeholder="Иван" />
      </Label>
      <Label text="Номер телефона:" required>
        <PhoneInput placeholder="+375 (29) 754-25-45" />
      </Label>
      <Label text="Оставьте сообщение:">
        <TextArea placeholder="Комментарий" />
      </Label>
      <Button>Заказать</Button>
    </form>
  );
};

export default FeedbackForm;
