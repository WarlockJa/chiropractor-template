"use client";

import { ReactNode } from "react";
import useScrolled from "../hooks/useScrolled";
import { cn } from "@/lib/utils";

export default function NavBarClient({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const isScrolled = useScrolled();
  return (
    <div
      className={cn(
        "bg-background/60 px-2 py-2 text-primary-foreground transition-all lg:px-8",
        // "fixed left-0 right-0 top-0 z-30 flex flex-col items-center gap-2 bg-background/60 px-2 py-2 text-primary-foreground transition-all lg:px-8",
        isScrolled && "bg-primary p-2",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-screen-2xl justify-between",
          className,
        )}
      >
        <div
          className={cn(
            "fixed inset-x-0 top-0 bg-background transition-all",
            isScrolled && "-translate-y-20 bg-transparent",
          )}
        ></div>
        {children}
      </div>
    </div>
  );
}
