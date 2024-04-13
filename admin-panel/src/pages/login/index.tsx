import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FC, FormEvent } from "react";
import { useRouter } from "next/router";

const LoginPage: FC = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/profile");
    } else {
      // Handle errors
    }
  }

  return (
    <div className=" flex items-center justify-center h-full min-h-full">
      <Card className=" max-w-96 flex-1">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Войти</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="example@gmail.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Войти
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
