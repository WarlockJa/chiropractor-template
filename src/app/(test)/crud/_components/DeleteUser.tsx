"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import deleteUser from "../_actions/deleteUser";

export function DeleteUser({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      // passing disabled in order to prevent item deletion if it has active orders
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteUser({
            email,
          });
          router.refresh();
        });
      }}
    >
      Delete User
    </Button>
  );
}
