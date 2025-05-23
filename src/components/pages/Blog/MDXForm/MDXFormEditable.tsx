"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import FormPartSelector from "./FormParts/wrappers/FormPartSelector";
import useSerializedParts from "./hooks/useSerializedParts";
import {
  blogImagesAtom,
  blogPartsAtom,
  blogUsedImagesAtom,
  sliceIndexAtom,
} from "./store/jotai";
import { SelectImages } from "@db/schemaImage";
import MDXRemoteWrapper from "./MDXRemoteWrapper";
import { getUsedImagesArray } from "./LookupTables/lookupTablesMDXParts";
import { useAction } from "next-safe-action/hooks";
import { updateBlogAction } from "./actions/blog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { TParts } from "./mdxtypes";
import { usePathname, useRouter } from "next/navigation";

interface IMDXFormProps {
  source?: TParts;
  blogId: number;
  blogImages: SelectImages[];
  published: boolean;
  tags: string;
}

export default function MDXFormEditable({
  source,
  blogId,
  blogImages,
  published,
  tags,
}: IMDXFormProps) {
  const tErrors = useTranslations("Errors");
  const tBlog = useTranslations("Blog");
  // reading pathname to track changes in blog name
  const pathname = usePathname();
  const router = useRouter();
  // mdx parts
  const [parts, setParts] = useAtom(blogPartsAtom);
  // index of the edited part
  const [sliceIndex, setSliceIndex] = useAtom(sliceIndexAtom);
  // list DB records about post images
  const setImages = useSetAtom(blogImagesAtom);
  // list of used images in the blog
  const setUsedImages = useSetAtom(blogUsedImagesAtom);
  // blog changed state
  const [currentBlogData, setCurrentBlogData] = useState({
    isChanged: false,
    published,
    tags,
  });

  // loading MDX as TParts array into local state on component load
  useEffect(() => {
    if (source) {
      setParts(source);
      setImages(blogImages);
      setUsedImages(getUsedImagesArray({ parts: source, blogImages }));
    } else {
      setSliceIndex(0);
    }
  }, []);

  // tracking changes to blog post
  useEffect(() => {
    const isChanged =
      JSON.stringify(source) !== JSON.stringify(parts) ||
      currentBlogData.published !== published ||
      currentBlogData.tags !== tags;
    // console.log("Comparing blog data");
    setCurrentBlogData((prev) => ({ ...prev, isChanged }));
  }, [parts, source, currentBlogData.published, currentBlogData.tags]);

  // update safe action
  // TODO check action for catalog vestiges
  const { execute, status } = useAction(updateBlogAction, {
    onError({ error }) {
      if (error.serverError === "UnauthorisedAccess") {
        toast(tErrors("insufficient_rights_title"), {
          description: tErrors("insufficient_rights_delete_blog"),
        });

        return;
      }

      error.serverError &&
        toast(
          <SonnerErrorCard
            title={tErrors("general_error_title")}
            errors={error.serverError}
          />,
        );
    },

    onSuccess({ input, data }) {
      if (!data) return;

      toast(tBlog("blog_saved"), {
        description: tBlog("blog_updated", { title: input.title }),
      });
      setEdit(false);

      // navigating to new route if title has been changed
      if (pathname !== `/blog/${data[0].blogName}`)
        router.replace(`/blog/${data[0].blogName}`);
    },
  });

  // parts of the serialized MDX divided by the edited component if active if not active
  // then serializedMDX_Part1 contains the whole MDX and serializedMDX_Part2 is undefined
  const { serializedMDX_Part1, serializedMDX_Part2 } = useSerializedParts({
    sliceIndex,
  });

  // edit mode switch
  const [edit, setEdit] = useState(false);

  return (
    <section className="relative pt-4">
      <div className="fixed bottom-0 z-20 flex w-full justify-center border md:sticky md:bottom-auto md:top-28">
        {edit ? (
          <>
            <div
              className="flex items-center gap-2 bg-background p-2"
              title={
                !parts[0].imageId
                  ? tBlog("set_image_warning")
                  : tBlog("publish_warning")
              }
            >
              <Label htmlFor="publishedSwitch">{tBlog("published")}</Label>
              <Switch
                id="publishedSwitch"
                checked={currentBlogData.published}
                disabled={!parts[0].imageId}
                className="data-[state=checked]:bg-accent"
                onCheckedChange={(e) =>
                  setCurrentBlogData((prev) => ({ ...prev, published: e }))
                }
              />
            </div>
            {currentBlogData.isChanged ? (
              <Button
                type="button"
                disabled={status === "executing"}
                className="max-w-screen-lg flex-1 rounded-none"
                variant={"destructive"}
                onClick={() =>
                  execute({
                    blogId,
                    title: parts[0].title,
                    description: parts[0].description,
                    previewImage: parts[0].imageId,
                    mdx: JSON.stringify(parts),
                    published: currentBlogData.published,
                  })
                }
              >
                {status === "executing" ? (
                  <>
                    <Loader2 className="animate-spin" /> {tBlog("updating")}
                  </>
                ) : (
                  tBlog("update_blog")
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => setEdit(false)}
                variant={"outline"}
                className="flex-1 rounded-none"
              >
                <p>{tBlog("exit_edit_mode")}</p>
              </Button>
            )}
          </>
        ) : (
          <Button
            type="button"
            onClick={() => setEdit(true)}
            className="w-full max-w-screen-lg rounded-none"
            variant={"outline"}
          >
            {tBlog("edit_blog")}
          </Button>
        )}
      </div>

      <>
        {serializedMDX_Part1 && (
          <MDXRemoteWrapper props={serializedMDX_Part1} editFlag={edit} />
        )}
        <FormPartSelector
          part={sliceIndex !== undefined ? parts[sliceIndex] : undefined}
          blogId={blogId}
          editFlag={edit}
        />
        {serializedMDX_Part2 && (
          <MDXRemoteWrapper props={serializedMDX_Part2} editFlag={edit} />
        )}
      </>
    </section>
  );
}
