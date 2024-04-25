"use client";
import { Label } from "../ui/formItems/Label";
import { TextInput, PhoneInput, TextArea } from "../ui/formItems/Input";
import Popup from "@/components/ui/Popup";
import { usePopup } from "@/hooks/usePopup";

const OrderPopup = () => {
  const { active, togglePopup } = usePopup();
  return (
    <>
      <button
        className="bg-cyan-700 text-white py-3 px-8 rounded-[30px] text-lg shadow-lg lg:hover:bg-cyan-800 transition"
        onClick={togglePopup}
      >
        Заказть звонок
      </button>
      <Popup closePopup={togglePopup} isOpen={active}>
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
    </>
  );
};
export default OrderPopup;
