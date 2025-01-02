import { convertCodesToSpecialCharacters } from "@/lib/convertStringSpecialCharacters";
import { Button } from "@/components/ui/button";
import CustomImageMDX from "@/components/pages/Blog/MDXForm/CustomImageMDX";
import Link from "next/link";
import { intlFormat } from "date-fns";
import DeleteBlogButton from "@/components/pages/Blog/DeleteBlogButton";
import { FileWarning, X } from "lucide-react";
import UserAvatar from "@/components/pages/NavBar/UserAvatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CachedBlog } from "@/lib/cache/blog/blog";

export default async function PostCard({
  blogData,
  deleteRights,
}: {
  blogData: CachedBlog;
  deleteRights?: boolean;
}) {
  return (
    <Card className="group relative overflow-hidden hover:shadow hover:shadow-accent">
      <Link
        // href={`/blog/${blogData.blog.blogId}`}
        href={`/blog/${blogData.blog.blogName}`}
        className="grid h-48 grid-cols-2"
      >
        <div className="relative overflow-hidden">
          <CustomImageMDX
            imageId={blogData.blog.previewImage}
            className="absolute inset-0 object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="relative">
          <CardHeader>
            <CardTitle className="text-xl">
              {convertCodesToSpecialCharacters(blogData.blog.title)}
            </CardTitle>
            <CardDescription className="line-clamp-4 text-ellipsis">
              {convertCodesToSpecialCharacters(blogData.blog.description ?? "")}
            </CardDescription>
          </CardHeader>
          <CardContent className="absolute bottom-2 right-2 flex items-center gap-2 p-0 pr-2 text-sm">
            <UserAvatar
              image={blogData.owner?.image}
              name={blogData.owner?.name}
              title={blogData.owner?.name}
              className="h-8 w-8"
            />
            <p>{blogData.owner?.name}</p>
            <p className="">{intlFormat(blogData.blog.updatedAt)}</p>
          </CardContent>
        </div>
      </Link>
      {deleteRights && (
        <div className="absolute right-0 top-0 p-2">
          {!blogData.blog.published && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-destructive transition-colors hover:opacity-70">
                  <FileWarning />
                </TooltipTrigger>
                <TooltipContent>
                  This blog is not yet published. It is only visible to users
                  with editing rights
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <DeleteBlogButton blogId={blogData.blog.blogId}>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="opacity-0 hover:bg-transparent group-hover:opacity-100"
              title="delete blog"
            >
              <X className="text-destructive hover:opacity-70" />
            </Button>
          </DeleteBlogButton>
        </div>
      )}
    </Card>
  );
}
