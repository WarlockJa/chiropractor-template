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
        // "fixed left-0 right-0 top-0 z-30 flex flex-col items-center gap-2 bg-gradient-to-b from-background/60 to-background/20 p-8 text-primary-foreground transition-all",
        "fixed left-0 right-0 top-0 z-30 flex flex-col items-center gap-2 bg-background/60 p-8 text-primary-foreground transition-all",
        isScrolled && "bg-primary p-2",
      )}
    >
      <div className="flex w-full justify-between">
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
