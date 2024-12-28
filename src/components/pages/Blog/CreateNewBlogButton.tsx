"use client";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import { createBlogAction } from "./MDXForm/actions/blog";
import { initBlogData } from "./MDXForm/store/jotai";
import { useAction } from "next-safe-action/hooks";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";

// creating new blog post and navigating to it
export default function CreateNewBlogButton({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("Errors");
  const tBlog = useTranslations("Blog");

  const { execute, status } = useAction(createBlogAction, {
    onError({ error }) {
      if (error.serverError === "UnauthorisedAccess") {
        toast(t("insufficient_rights_title"), {
          description: t("insufficient_rights_create_blog"),
        });

        return;
      }

      toast(
        <SonnerErrorCard
          title={t("general_error_title")}
          errors={JSON.stringify(error.validationErrors)}
        />,
      );
    },
  });

  return (
    <form
      action={execute.bind(null, {
        title: initBlogData[0].title,
        description: initBlogData[0].description,
        previewImage: initBlogData[0].previewImage,
        mdx: JSON.stringify(initBlogData),
      })}
      className={className}
    >
      <Button variant={"outline"} className="w-full">
        {status === "executing" ? (
          <div className="flex gap-2">
            <Loader2 className="animate-spin" />
            <p>{tBlog("creating_new_blog")}</p>
          </div>
        ) : (
          <div className="flex gap-2">
            <PlusIcon />
            <p>{tBlog("create_new_blog")}</p>
          </div>
        )}
      </Button>
    </form>
  );
}
