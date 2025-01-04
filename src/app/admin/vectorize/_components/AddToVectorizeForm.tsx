"use client";

import { useAction } from "next-safe-action/hooks";
import { addToVectorizeAction } from "../_actions/vectorize";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { useForm } from "react-hook-form";
import { addToVectorizeSchema } from "../_actions/schemas";
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
import { Textarea } from "@/components/ui/textarea";
import { LoaderButton } from "@/components/UniversalComponents/LoaderButton";

export default function AddToVectorizeForm() {
  const tErrors = useTranslations("Errors");

  const { execute, status } = useAction(addToVectorizeAction, {
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
      toast("Added vector", {
        description: JSON.stringify(data),
      });
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof addToVectorizeSchema>>({
    resolver: zodResolver(addToVectorizeSchema),
    defaultValues: {
      id: "",
      text: "",
    },
  });

  function onSubmit(values: z.infer<typeof addToVectorizeSchema>) {
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
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  className="w-full rounded-none border-primary-foreground px-4 py-6 text-xl placeholder:text-muted-foreground focus:border-primary-foreground"
                  placeholder={`Text to vectorize`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton
          isDisabled={
            status === "executing" ||
            (form.getValues("id") === "" && form.getValues("text") === "")
          }
          isLoading={status === "executing"}
          variant={"secondary"}
          className="w-full rounded-none border border-primary-foreground bg-primary text-xl text-primary-foreground hover:bg-accent hover:text-primary"
        >
          Add to Vectorize
        </LoaderButton>
      </form>
    </Form>
  );
}
