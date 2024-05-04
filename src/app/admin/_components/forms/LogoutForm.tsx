"use client";
import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutForm: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <button
      className=" bg-white rounded-lg px-4 py-2"
      onClick={async () => {
        setLoading(true);
        signOut()
          .then(() => {
            router.push("/login");
            router.refresh();
          })
          .catch(() => setLoading(false));
      }}
    >
      {isLoading ? "Подождите..." : "Выйти"}
    </button>
  );
};

export default LogoutForm;
