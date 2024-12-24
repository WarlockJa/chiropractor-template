"use client";

import { ReactNode } from "react";
import useScrolled from "../hooks/useScrolled";
import { cn } from "@/lib/utils";
import ContactsPanel from "../ContactsPanel/ContactsPanel";

export default function NavBarClient({ children }: { children: ReactNode }) {
  const isScrolled = useScrolled();
  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-30 flex flex-col items-center gap-2 bg-background/60 py-8 pr-4 text-primary-foreground transition-all lg:px-8",
        isScrolled && "bg-primary p-2",
      )}
    >
      <div className="mx-auto flex w-full max-w-screen-2xl justify-between">
        <div
          className={cn(
            "fixed inset-x-0 top-0 bg-background transition-all",
            isScrolled && "-translate-y-20 bg-transparent",
          )}
        >
          {/* Contact bar */}
          {/* <ContactsPanel /> */}
        </div>
        {children}
      </div>
    </div>
  );
}
