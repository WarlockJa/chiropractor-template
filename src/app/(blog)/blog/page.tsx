import BlogsListPagination from "@/components/pages/Blog/BlogsListPagination";
import { getCachedBlogsCount } from "@/lib/cache/blog/pagination/getCachedBlogsCount";
import { getCachedBlogsPage } from "@/lib/cache/blog/pagination/getCachedBlogsPage";
import { z } from "zod";
import PostCard from "./_components/PostCard";
import CreateNewBlogButton from "@/components/pages/Blog/CreateNewBlogButton";
import getSession from "@/lib/db/getSession";
import userCanEditBlog from "@/components/pages/Blog/MDXForm/lib/userCanEditBlog";

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
    const blogsCount = await getCachedBlogsCount();
    // reading url params for pagination
    const data = pageSchema.safeParse(searchParams.page);
    let page = data.success && blogsCount >= LIMIT * data.data ? data.data : 0;

    const pageBlogs = await getCachedBlogsPage(page, LIMIT);
    // display blogs with pagination

    return (
      <section className="mx-auto mt-28 flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden">
        <CreateNewBlogButton className="mx-auto w-screen max-w-screen-lg" />
        {pageBlogs && pageBlogs.length > 0
          ? pageBlogs.map((blog) => (
              <PostCard
                key={blog.blog.blogId}
                blog={blog}
                deleteRights={userCanEditBlog({ user })}
              />
            ))
          : "No blogs found"}
        <BlogsListPagination
          blogsNumber={blogsCount}
          limit={LIMIT}
          page={page}
        />
      </section>
    );
  } catch (error: any) {
    // display error page
    console.log(error.message);
  }
}

export const runtime = "edge";
