"use client";

import { useAction } from "next-safe-action/hooks";
import { deleteFromVectorizeAction } from "../_actions/vectorize";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { useForm } from "react-hook-form";
import {
  addToVectorizeSchema,
  deleteFromVectorizeSchema,
} from "../_actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/UniversalComponents/LoaderButton";

export default function DeleteFromVectorizeForm() {
  const t = useTranslations("Errors");

  const { execute, status } = useAction(deleteFromVectorizeAction, {
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast(t("rate_limit_title"), {
          description: t("rate_limit_description"),
        });

        return;
      }

      error.serverError &&
        toast(<SonnerErrorCard title={"Error"} errors={error.serverError} />);

      toast(<SonnerErrorCard title={"Error"} errors={JSON.stringify(error)} />);
    },

    onSuccess({ data }) {
      toast("Deleted vector", {
        description: JSON.stringify(data),
      });
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof deleteFromVectorizeSchema>>({
    resolver: zodResolver(deleteFromVectorizeSchema),
    defaultValues: {
      id: "",
    },
  });

  function onSubmit(values: z.infer<typeof deleteFromVectorizeSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:w-1/2"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-full rounded-none border-primary-foreground px-4 py-6 text-xl placeholder:text-muted-foreground focus:border-primary-foreground"
                  placeholder={`Vector ID`}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton
          isDisabled={status === "executing" || form.getValues("id") === ""}
          isLoading={status === "executing"}
          variant={"secondary"}
          className="w-full rounded-none border border-primary-foreground bg-primary text-xl text-primary-foreground hover:bg-accent hover:text-primary"
        >
          Delete from Vectorize
        </LoaderButton>
      </form>
    </Form>
  );
}
