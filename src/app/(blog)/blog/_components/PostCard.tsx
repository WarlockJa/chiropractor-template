import { convertCodesToSpecialCharacters } from "@/lib/convertStringSpecialCharacters";
import { Button } from "@/components/ui/button";
import CustomImageMDX from "@/components/pages/Blog/MDXForm/CustomImageMDX";
import { CachedBlog } from "@/lib/cache/blog/getCachedBlog";
import Link from "next/link";
import { intlFormat } from "date-fns";
import DeleteBlogButton from "@/components/pages/Blog/DeleteBlogButton";
import { X } from "lucide-react";

export default async function PostCard({
  blog,
  deleteRights,
}: {
  blog: CachedBlog;
  deleteRights?: boolean;
}) {
  return (
    <>
      {/* <pre className="max-w-screen-lg text-wrap text-foreground">
        {JSON.stringify(blog, null, 2)}
      </pre> */}
      <div className="bg-accent">
        <div className="group relative mt-2 h-80 w-full overflow-hidden rounded">
          <CustomImageMDX image={blog.image} />
          {/* <div className="absolute inset-0 z-[-1] transition-transform duration-300 group-hover:scale-110">
          </div> */}

          <Link href={`/blog/${blog.blog.blogId}`}>
            <div className="flex h-full flex-col justify-end rounded bg-gradient-to-b from-[#0004] from-50% to-black to-100% p-5 text-white transition-colors duration-300 hover:text-accent">
              <p className="absolute bottom-2 right-2 text-sm text-white">
                {intlFormat(blog.blog.updatedAt)}
              </p>
              <h2 className="text-3xl">
                {convertCodesToSpecialCharacters(blog.blog.title)}
              </h2>
              <p className="text-white">
                {convertCodesToSpecialCharacters(blog.blog.description ?? "")}
              </p>
            </div>
          </Link>
          {deleteRights && (
            <DeleteBlogButton blogId={blog.blog.blogId}>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100"
              >
                <X className="text-destructive" />
              </Button>
            </DeleteBlogButton>
          )}
        </div>
      </div>
    </>
  );
}
