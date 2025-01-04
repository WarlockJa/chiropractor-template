"use client";

import { signUpAction } from "@/app/(auth)/actions";
import { useAction } from "next-safe-action/hooks";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderButton } from "@/components/UniversalComponents/LoaderButton";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";

interface ISignInClientComponentProps {
  callbackUrl: string | undefined;
}

const magicLinkSchema = z.object({
  email: z.string().email(),
});

export default function SignInClientComponent({
  callbackUrl,
}: ISignInClientComponentProps) {
  const tErrors = useTranslations("Errors");
  const tSignIn = useTranslations("SignIn");

  const { execute, status, input } = useAction(signUpAction, {
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast(tErrors("rate_limit_title"), {
          description: tErrors("rate_limit_description"),
        });

        return;
      }

      toast(
        <SonnerErrorCard
          title={tErrors("general_error_title")}
          errors={JSON.stringify(error)}
        />,
      );
    },
  });

  // magic link
  const form = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof magicLinkSchema>) {
    execute({ provider: "brevo", email: values.email, callbackUrl });
  }

  return (
    <div className="flex h-[93vh] items-center">
      <Card className="shadow shadow-foreground">
        <CardHeader>
          <CardTitle className="text-center text-4xl">
            {tSignIn("sign_in")}
          </CardTitle>
          <CardDescription>{tSignIn("sign_in_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoaderButton
            type="button"
            isDisabled={status === "executing"}
            isLoading={status === "executing" && input?.provider === "google"}
            className="group my-2 w-full hover:bg-accent hover:text-primary"
            onClick={() => {
              execute({ provider: "google", callbackUrl });
            }}
          >
            <GoogleIcon className="h-5 w-5 fill-primary-foreground transition-colors group-hover:fill-primary" />
            {tSignIn("sign_in_google")}
          </LoaderButton>

          <div className="my-4 h-1 w-full bg-gradient-to-r from-background via-accent to-background"></div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tSignIn("email")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder={tSignIn("email_placeholder")}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoaderButton
                isDisabled={status === "executing"}
                isLoading={
                  status === "executing" && input?.provider === "brevo"
                }
                className="w-full hover:bg-accent hover:text-primary"
              >
                <Mail />
                {tSignIn("sign_in_email")}
              </LoaderButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
