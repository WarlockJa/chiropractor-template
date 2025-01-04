import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import ClientNavBarMenuItem from "./ClientNavBarMenuItem";
import { ChevronRight } from "lucide-react";
import { servicesData } from "../../Services/servicesData";

export interface IItemNavBar {
  href: string;
  title: "about" | "contacts" | "home" | "services" | "blog";
}
export const MENU_ITEMS: IItemNavBar[] = [
  {
    href: "/",
    title: "home",
  },
  { href: "/services", title: "services" },
  {
    href: "/about",
    title: "about",
  },
  {
    href: "/blog",
    title: "blog",
  },
  {
    href: "/contacts",
    title: "contacts",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "focus:bg-primary-40 block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/40 hover:text-foreground focus:text-foreground",
            className,
            "group flex h-full min-h-16 items-center border bg-primary/20",
          )}
          {...props}
        >
          <ChevronRight className="-translate-x-2 transition-transform group-hover:translate-x-0 group-hover:text-accent" />
          <div>
            <div className="font-medium">{title}</div>
            <p className="line-clamp-2 align-middle text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default async function NavMenu() {
  // translations
  const tServices = await getTranslations("Services");
  return (
    <NavigationMenu className="hidden xl:block">
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem className="relative">
          <ClientNavBarMenuItem {...MENU_ITEMS[0]} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="relative bg-transparent text-xl transition-all hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
            <ClientNavBarMenuItem {...MENU_ITEMS[1]} dropdown />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {servicesData.map((item) => (
                <ListItem
                  key={item.title}
                  title={tServices(`${item.path}.title`)}
                  href={item.href}
                  className="relative"
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="relative">
          <ClientNavBarMenuItem {...MENU_ITEMS[2]} />
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <ClientNavBarMenuItem {...MENU_ITEMS[3]} />
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <ClientNavBarMenuItem {...MENU_ITEMS[4]} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    // <nav className="hidden text-lg text-primary-foreground md:block">
    //   <ul className="relative flex items-center justify-center gap-8">
    //     {MENU_ITEMS.slice(0, CUTOFF).map((item) => (
    //       <ClientNavBarMenuItem {...item} key={item.title} />
    //     ))}
    //   </ul>
    // </nav>
  );
}
