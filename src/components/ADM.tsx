"use client";
import { createUser } from "@/app/actions/products";
export const ADM = () => {
  return (
    <form action={createUser}>
      <button type="submit">Создать</button>
    </form>
  );
};
