import { blogsLimit } from "@/appConfig";
import { getCachedBlogsPage } from "@/lib/cache/blog/pagination/getCachedBlogsPage";
import getSession from "@/lib/db/getSession";
import userCanEditBlog from "./MDXForm/lib/userCanEditBlog";
import { cn } from "@/lib/utils";
import PostCard from "./PostCard";

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
    <div className={cn("w-full", className)}>
      {pageBlogs && pageBlogs.length > 0 ? (
        pageBlogs.map((blogData) => (
          <PostCard
            key={blogData.blog.blogId}
            blogData={blogData}
            deleteRights={userCanEditBlog({ user })}
          />
        ))
      ) : (
        <div className="text-center">No blogs found</div>
      )}
    </div>
  );
}
