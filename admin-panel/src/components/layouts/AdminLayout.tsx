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

type Props = {
  children: ReactNode;
};

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <header className="flex items-center justify-center h-20 w-full bg-slate-900">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <div className="w-full max-w-7xl px-3 mx-auto flex-1 my-5">
        <main className="min-h-full">{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
