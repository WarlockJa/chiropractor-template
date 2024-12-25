import { Lock, LogIn, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { signOut } from "@auth/auth";
import React, { ReactNode } from "react";
import { MENU_ITEMS } from "../NavMenu/NavMenu";
import { revalidateTag } from "next/cache";
import LocaleSwitcher from "@/components/Locale/LocaleSwitcher";
import { User } from "next-auth";
import { useTranslations } from "next-intl";
import { SignInLoaderButton } from "./SignInLoaderButton";
import Link from "next/link";
import UserAvatar from "../UserAvatar";

export default function SheetMenu({ user }: { user: User | undefined }) {
  // translations
  const t = useTranslations("NavMenu");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" size="icon" title={t("settings")}>
          <Menu className="h-12 w-12 text-primary-foreground transition-colors hover:text-accent" />
          <span className="sr-only">{t("toggle_menu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full bg-primary/80 text-primary-foreground xsm:w-3/4">
        <SheetDescription className="mt-8 font-medium text-primary-foreground">
          {/* Menu Items for Mobile View */}
          <nav className="flex flex-col gap-2 text-lg">
            {MENU_ITEMS.map((item) => (
              <Link key={item.title} href={item.href}>
                <SheetMenuItem withSheetClose>
                  <div className="flex px-2 py-1 text-primary-foreground">
                    {t(item.title).toLocaleUpperCase()}
                  </div>
                </SheetMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
          </nav>
          {/* General Settings and Authentication options */}
          <SheetMenuItem>
            <ThemeToggle menu />
          </SheetMenuItem>
          <SheetMenuItem>
            <LocaleSwitcher menu />
          </SheetMenuItem>
          <DropdownMenuSeparator />
          {user ? (
            <>
              {user.role === "admin" && (
                <Link href={"/admin"}>
                  <SheetMenuItem withSheetClose>
                    <div className="flex w-full justify-between p-2">
                      <Lock /> {t("admin_console")}
                    </div>
                  </SheetMenuItem>
                  <DropdownMenuSeparator />
                </Link>
              )}
              <SheetMenuItem withSheetClose>
                <form
                  className="items-centerfont-medium flex w-full"
                  action={async () => {
                    "use server";
                    // TODO check if needed
                    // revalidating blogs cache on user sing in state
                    revalidateTag("signInState");
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className="flex w-full items-center justify-between p-2"
                  >
                    <UserAvatar
                      image={user.image}
                      name={user.name}
                      title={user.name}
                    />
                    <p>{t("sign_out")}</p>
                  </button>
                </form>
              </SheetMenuItem>
            </>
          ) : (
            <SignInLoaderButton>
              <SheetMenuItem withSheetClose>
                <div className="flex w-full justify-between p-2">
                  <LogIn /> {t("sign_in")}
                </div>
              </SheetMenuItem>
            </SignInLoaderButton>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

// attaching SheetClose to menu items
const SheetMenuItem = ({
  withSheetClose,
  children,
}: {
  withSheetClose?: boolean;
  children: ReactNode;
}) => {
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, undefined];
  return (
    <div className="transition-colors hover:bg-accent/50">
      <SheetCloseWrapper {...sheetCloseWrapperProps}>
        {children}
      </SheetCloseWrapper>
    </div>
  );
};
