"use client";
import { FC } from "react";
import Popup from "@/components/ui/Popup";
import PopupOrderForm from "@/components/forms/orderForm/PopupOrderForm";
import { usePopup } from "@/hooks/usePopup";

const OrderPopup: FC = () => {
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
        <PopupOrderForm />
      </Popup>
    </>
  );
};

export default OrderPopup;
