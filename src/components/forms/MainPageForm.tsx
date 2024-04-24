"use client";
import { sendEmail } from "@/app/actions/email";
import { FC } from "react";
import { useFormState } from "react-dom";

const MainPageForm: FC = () => {
  const [state, action] = useFormState(sendEmail, {
    name: "",
    phone: "",
    message: "",
  });
  return <form action={action}></form>;
};

export default MainPageForm;
