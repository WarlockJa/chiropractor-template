import { Button } from "@/components/ui/button";
import { env } from "@/lib/env.mjs";
import { getCachedImageBlog } from "@/lib/cache/blog/getCachedImageBlog";
import CustomImageMDX from "@/components/pages/Blog/MDXForm/CustomImageMDX";
import Link from "next/link";
import BlogImageNotFound from "./not-found";

export default async function BlogImagePage({
  params,
}: {
  params: { image_id: number };
}) {
  try {
    // getting image data
    const imageBlog = await getCachedImageBlog(params.image_id);

    // if no blog associated with the image returning 404
    if (!imageBlog.blog_image) return BlogImageNotFound();

    return (
      <section className="mx-auto flex flex-col items-center justify-center overflow-hidden">
        <div className="relative h-screen w-screen">
          {/* CustomImage will hit cached fetch query */}
          <CustomImageMDX image={imageBlog.image} />

          <Button variant={"link"} asChild className="absolute left-4 top-4">
            <Link
              href={`${env.NEXT_PUBLIC_URI}/blog/${imageBlog.blog_image.blogId}`}
            >
              {/* TODO translate */}
              Read the whole story
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
