"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { ReactNode } from "react";
import { toast } from "sonner";
import { deleteBlogSchema } from "./MDXForm/actions/schemas";
import { deleteBlogAction } from "./MDXForm/actions/blog";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";

export default function DeleteBlogButton({
  blogId,
  children,
}: z.infer<typeof deleteBlogSchema> & { children: ReactNode }) {
  const t = useTranslations("Errors");
  const tBlogs = useTranslations("Blog");
  const { execute, status } = useAction(deleteBlogAction, {
    onError({ error }) {
      if (error.serverError === "UnauthorisedAccess") {
        toast(t("insufficient_rights_title"), {
          description: t("insufficient_rights_delete_blog"),
        });

        return;
      }

      error.serverError &&
        toast(
          <SonnerErrorCard
            title={t("general_error_title")}
            errors={error.serverError}
          />,
        );
    },
    onSuccess({ input }) {
      // TODO add translations
      toast("Blog deleted", {
        description: `Successfully deleted blog ${input.blogId}`,
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            {tBlogs("are_you_sure_delete_blog_title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-md">
            {tBlogs("are_you_sure_delete_blog_description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={status === "executing"}>
            {tBlogs("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={status === "executing"}
            onClick={(e) => {
              e.stopPropagation();
              execute({ blogId });
            }}
          >
            {tBlogs("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
