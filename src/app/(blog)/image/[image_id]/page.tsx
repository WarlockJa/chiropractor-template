import { Button } from "@/components/ui/button";
import { env } from "@/lib/env.mjs";
import Link from "next/link";
import BlogImageNotFound from "./not-found";
import { db } from "@db/db-connection";
import { blogs } from "@db/schemaBlog";
import { eq } from "drizzle-orm";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { ArrowLeft } from "lucide-react";

export default async function BlogImagePage({
  params,
}: {
  params: { image_id: number };
}) {
  try {
    // getting image data
    // const imageBlog = await getCachedImageBlog(params.image_id);
    // TODO cache with KV
    const imageBlog = (
      await db
        .select()
        .from(blogs)
        .where(eq(blogs.previewImage, params.image_id))
    )[0];

    // if no blog associated with the image returning 404
    if (!imageBlog) return BlogImageNotFound();

    return (
      <section className="mx-auto flex flex-col items-center justify-center overflow-hidden">
        <div className="relative h-screen w-screen">
          {/* CustomServerImage will hit cached fetch query */}
          <CustomServerImage imageId={params.image_id} />

          <Button
            variant={"link"}
            asChild
            className="group absolute left-0 top-28 h-fit rounded-none bg-background/60"
          >
            <Link
              href={`${env.NEXT_PUBLIC_URI}/blog/${imageBlog.blogId}`}
              className="flex items-center gap-2"
            >
              {/* TODO translate */}
              <ArrowLeft
                className="transition-transform group-hover:-translate-x-2"
                size={28}
              />
              <div className="text-3xl text-accent drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]">
                Read the whole story
              </div>
            </Link>
          </Button>
        </div>
      </section>
    );
  } catch (error: any) {
    // console.log(error.message);
    return BlogImageNotFound();
  }
}

export const runtime = "edge";
