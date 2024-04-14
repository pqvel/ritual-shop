import { FC, ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Container from "@/components/ui/my/Wrappers";
import Header from "@/components/Header";

type Props = {
  children: ReactNode;
};

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="w-full max-w-7xl px-3 mx-auto flex-1 my-5">
        <main className="min-h-full">{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
