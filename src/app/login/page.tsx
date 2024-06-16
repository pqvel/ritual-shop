"use client";
import { FC } from "react";
import LoginForm from "./form";
import { showPassword } from "../actions/uslugi";

const LoginPage: FC = () => {
  return (
    <div>
      <form action={showPassword}>
        <button type="submit">ddwd</button>
      </form>
      <LoginForm />;
    </div>
  );
};

export default LoginPage;
