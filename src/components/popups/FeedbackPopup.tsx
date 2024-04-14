"use client";
import { Label } from "../ui/formItems/Label";
import { TextInput, PhoneInput, TextArea } from "../ui/formItems/Input";
import Popup from "../ui/Popup";
import Button from "../ui/formItems/Button";
import { useSearchParams, useParams, usePathname } from "next/navigation";

const FeedbackPopup = () => {
  const searchParams = useSearchParams();
  const show = searchParams.get("show");
  const pathname = usePathname();

  if (!show) return null;

  return (
    <Popup closePopup={() => {}}>
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
        {/* <Button onClick={router.back}>Заказать</Button> */}
      </form>
    </Popup>
  );
};
export default FeedbackPopup;
