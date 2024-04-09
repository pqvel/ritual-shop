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
import { FC } from "react";

const LoginPage: FC = () => {
  return (
    <div className=" flex items-center justify-center h-full min-h-full">
      <Card className=" max-w-96 flex-1">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Войти</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
