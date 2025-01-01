import BlogsListPagination from "@/components/pages/Blog/BlogsListPagination";
import { getCachedBlogsCount } from "@/lib/cache/blog/pagination/getCachedBlogsCount";
import { getCachedBlogsPage } from "@/lib/cache/blog/pagination/getCachedBlogsPage";
import { z } from "zod";
import PostCard from "./_components/PostCard";
import CreateNewBlogButton from "@/components/pages/Blog/CreateNewBlogButton";
import getSession from "@/lib/db/getSession";
import userCanEditBlog from "@/components/pages/Blog/MDXForm/lib/userCanEditBlog";
import { cn } from "@/lib/utils";

const pageSchema = z.coerce.number().min(0);
const LIMIT = 4;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    // getting user data
    const session = await getSession();
    const user = session?.user;

    // read blogs page
    // read blogs number
    const blogsCount = await getCachedBlogsCount(userCanEditBlog({ user }));
    // reading url params for pagination
    const data = pageSchema.safeParse(searchParams.page);
    let page = data.success && blogsCount >= LIMIT * data.data ? data.data : 0;

    const pageBlogs = await getCachedBlogsPage(
      page,
      LIMIT,
      userCanEditBlog({ user }),
    );
    // display blogs with pagination

    return (
      <section className="relative mx-auto flex h-screen w-screen flex-col">
        {userCanEditBlog({ user }) && (
          <CreateNewBlogButton className="sticky mx-auto mt-28 w-screen max-w-screen-lg" />
        )}
        <div
          className={cn(
            "mx-auto h-[calc(100vh-7rem)] w-screen max-w-screen-lg overflow-y-scroll",
            !userCanEditBlog({ user }) && "mt-28",
          )}
        >
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
        <BlogsListPagination
          blogsNumber={blogsCount}
          limit={LIMIT}
          page={page}
          className="absolute bottom-0"
        />
      </section>
    );
  } catch (error: any) {
    // display error page
    console.log(error.message);
  }
}

export const runtime = "edge";
