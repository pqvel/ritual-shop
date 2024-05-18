"use client";
import { FC, FormEvent, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label, Input, Button } from "@/components/ui/formItems";

const LoginForm: FC = () => {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: any) => {
    const formData = new FormData(form.current as HTMLFormElement);

    const options = {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    };

    const response = await signIn("credentials", options);

    if (!response?.error) {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <form
        action={handleSubmit}
        name="login"
        ref={form}
        className="flex flex-col items-start bg-white border border-gray-200 shadow p-5 lg:p-8 rounded"
      >
        <h3 className=" text-2xl font-semibold mb-4">Вход</h3>
        <Label text="Ваш email:" required>
          <Input.TextInput name="email" placeholder="email" maxLength={30} />
        </Label>
        <Label text="Ваш пароль:" required>
          <Input.PasswordInput
            name="password"
            placeholder="email"
            maxLength={30}
          />
        </Label>
        <Button>Войти</Button>
      </form>
    </div>
  );
};

export default LoginForm;
