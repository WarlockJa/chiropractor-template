import { blogsLimit } from "@/appConfig";
import { getCachedBlogsPage } from "@/lib/cache/blog/pagination/getCachedBlogsPage";
import getSession from "@/lib/db/getSession";
import userCanEditBlog from "./MDXForm/lib/userCanEditBlog";
import { cn } from "@/lib/utils";
import PostCard from "./PostCard";
import { ScrollText } from "lucide-react";

export default async function LatestBlogsFeed({
  className,
}: {
  className?: string;
}) {
  // reading user data from session
  const session = await getSession();
  const user = session?.user;

  // fetching cached page 0 blogs
  const pageBlogs = await getCachedBlogsPage(
    0,
    blogsLimit,
    userCanEditBlog({ user }),
  );

  return (
    <ul className={cn("w-full", className)}>
      {pageBlogs && pageBlogs.length > 0 ? (
        pageBlogs.map((blogData) => (
          <li
            key={blogData.blog.blogId}
            className="group grid items-center md:grid-cols-[5em,1fr]"
          >
            <ScrollText
              size={64}
              className="hidden text-accent transition-transform group-hover:scale-105 md:block"
            />
            <PostCard
              blogData={blogData}
              deleteRights={userCanEditBlog({ user })}
            />
          </li>
        ))
      ) : (
        <div className="text-center">No blogs found</div>
      )}
    </ul>
  );
}
