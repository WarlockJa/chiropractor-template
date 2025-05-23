"use client";
import { Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoaderButton } from "@/components/UniversalComponents/LoaderButton";
import { useAction } from "next-safe-action/hooks";
import { sendMessageAction } from "./actions/sendMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "./schemas";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";

export default function ContactForm() {
  const tContact = useTranslations("ContactForm");
  const t = useTranslations("Errors");

  const { execute, status } = useAction(sendMessageAction, {
    onSuccess() {
      toast(tContact("message_sent_toast_title"), {
        description: tContact("message_sent_toast_description"),
      });

      form.reset();
    },
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast(t("rate_limit_title"), {
          description: t("rate_limit_description"),
        });

        return;
      }

      toast(
        <SonnerErrorCard
          title={t("general_error_title")}
          errors={JSON.stringify(error)}
        />,
      );
    },
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof messageSchema>) {
    execute(values);
  }

  return (
    <div className="m-auto w-full max-w-xl bg-primary/80 py-10 text-primary-foreground xsm:px-10 lg:flex lg:max-w-screen-lg">
      <div className="mb-8 flex flex-col items-center pl-8 lg:mt-4 lg:flex-1 lg:items-start">
        <div className="relative">
          <p className="text-xl">{tContact("reach_us").toLocaleUpperCase()}</p>
          <h2 className="pr-2 text-3xl lg:text-5xl">
            {tContact("send_us_a_message").toLocaleUpperCase()}
          </h2>
          <div className="absolute -bottom-2 -left-4 h-8 w-24 border-b-2 border-l-2 border-primary-foreground lg:-bottom-8 lg:-left-12 lg:h-12 lg:w-2/5"></div>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 lg:w-1/2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full rounded-none border-primary-foreground px-4 py-6 text-xl placeholder:text-muted-foreground focus:border-primary-foreground"
                    placeholder={`${tContact("name")}*`}
                    type="text"
                    max={60}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full rounded-none border-primary-foreground px-4 py-6 text-xl placeholder:text-muted-foreground focus:border-primary-foreground"
                    placeholder={`${tContact("phone")}*`}
                    type="tel"
                    max={20}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full rounded-none border-primary-foreground px-4 py-6 text-xl placeholder:text-muted-foreground focus:border-primary-foreground"
                    placeholder={`${tContact("email")}*`}
                    type="email"
                    max={60}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full resize-none rounded-none border-primary-foreground px-4 text-xl placeholder:text-muted-foreground focus:border-primary-foreground"
                    maxLength={500}
                    rows={5}
                    placeholder={`${tContact("your_message")}*`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoaderButton
            isDisabled={
              status === "executing" ||
              (form.getValues("email") === "" &&
                form.getValues("message") === "" &&
                form.getValues("name") === "" &&
                form.getValues("phone") === "")
            }
            isLoading={status === "executing"}
            variant={"secondary"}
            className="w-full rounded-none border border-primary-foreground bg-primary text-xl text-primary-foreground hover:bg-accent hover:text-primary"
          >
            <Mail />
            {tContact("send_message")}
          </LoaderButton>
        </form>
      </Form>
    </div>
  );
}
