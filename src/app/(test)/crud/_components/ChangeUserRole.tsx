"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import changeUserRole from "../_actions/changeUserRole";
import { Button } from "@/components/ui/button";

export function ChangeUserRole({
  email,
  role,
}: {
  email: string;
  role: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      // passing disabled in order to prevent item deletion if it has active orders
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await changeUserRole({
            email,
            role,
          });
          router.refresh();
        });
      }}
    >
      Change Role
    </Button>
  );
}
