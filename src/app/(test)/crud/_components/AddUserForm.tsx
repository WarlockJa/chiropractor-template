"use client";

import { useFormState } from "react-dom";
import addUser from "../_actions/addUser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddUserForm() {
  const [error, action] = useFormState(addUser, {});
  return (
    <form action={action}>
      <div>
        <Label htmlFor="userName">Name</Label>
        <Input type="text" id="userName" name="name" />
        {error?.name && <div className="text-red-400">{error.name}</div>}
      </div>
      <div>
        <Label htmlFor="userEmail">Email</Label>
        <Input type="email" id="userEmail" name="email" />
        {error?.email && <div className="text-red-400">{error.email}</div>}
      </div>
      <Button type="submit">Add User</Button>
    </form>
  );
}
