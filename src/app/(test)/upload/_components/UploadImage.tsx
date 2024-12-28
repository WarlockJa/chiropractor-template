"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFile } from "../_actions/localR2";

export function UploadImage() {
  const [error, action] = useFormState(uploadFile, {});
  const { pending } = useFormStatus();

  return (
    <form action={action}>
      <Label htmlFor="file">Choose File</Label>
      {error?.file && <div className="text-destructive">{error.file}</div>}
      <Input type="file" id="file" name="file" />
      <Button className="w-full" size="lg" type="submit" disabled={pending}>
        {pending ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
