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
          <div className=" text-2xl font-semibold text-black mb-4">
            Заказать звонок
          </div>
          <Label text="Ваше имя:" required>
            <TextInput placeholder="Иван" maxLength={30} />
          </Label>
          <Label text="Номер телефона:" required>
            <PhoneInput />
          </Label>
          <Label text="Оставьте сообщение:">
            <TextArea maxLength={500} placeholder="Комментарий" />
          </Label>

          <div className="flex justify-end">
            <button
              className="text-white bg-cyan-800 py-2 px-6 rounded-lg transition lg:hover:bg-cyan-900 lg:hover:shadow-sm"
              type="submit"
            >
              Отправить
            </button>
          </div>
        </form>
      </Popup>
    </>
  );
};
export default OrderPopup;
