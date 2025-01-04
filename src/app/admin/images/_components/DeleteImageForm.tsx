"use client";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { deleteImageAction } from "./_actions/actions";
import { DeleteButton } from "@/components/UniversalComponents/DeleteButton";
import { useTranslations } from "next-intl";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";

export default function DeleteImageForm({
  imageId,
  name,
}: {
  imageId: number;
  name?: string;
}) {
  const tErrors = useTranslations("Errors");

  const { execute, status } = useAction(deleteImageAction, {
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast(tErrors("rate_limit_title"), {
          description: tErrors("rate_limit_description"),
        });

        return;
      }

      error.serverError &&
        toast(<SonnerErrorCard title={"Error"} errors={error.serverError} />);

      toast(<SonnerErrorCard title={"Error"} errors={JSON.stringify(error)} />);
    },

    onSuccess({ data }) {
      toast("Deleted image", {
        description: JSON.stringify(data),
      });
    },
  });

  return (
    <DeleteButton
      title={imageId.toString()}
      description={`This will delete the image ${name ?? imageId} are you sure?`}
      execute={() => execute({ imageId })}
      isDisabled={status === "executing"}
      isLoading={status === "executing"}
    />
  );
}
