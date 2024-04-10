import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";

export const SearchInput: FC = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Двойно памятник" />
      <Button type="submit">Найти</Button>
    </div>
  );
};
