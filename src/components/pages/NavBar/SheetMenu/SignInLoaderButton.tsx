"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import Link from "next/link";

export const SignInLoaderButton = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const t = useTranslations("NavMenu");

  return <Link href={`/signin?callbackUrl=${pathname}`}>{children}</Link>;
};
