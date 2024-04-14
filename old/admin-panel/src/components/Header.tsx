import { FC } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-center h-20 w-full bg-slate-900">
      <NavigationMenu>
        <NavigationMenuItem>
          <Link href="/" className="text-white">
            Главная
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/catalog" className="text-white">
            Каталог
          </Link>
        </NavigationMenuItem>
      </NavigationMenu>
    </header>
  );
};

export default Header;
