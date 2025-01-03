import BlogsListPagination from "@/components/pages/Blog/BlogsListPagination";
import { getCachedBlogsCount } from "@/lib/cache/blog/pagination/getCachedBlogsCount";
import { getCachedBlogsPage } from "@/lib/cache/blog/pagination/getCachedBlogsPage";
import { z } from "zod";
import PostCard from "@/components/pages/Blog/PostCard";
import CreateNewBlogButton from "@/components/pages/Blog/CreateNewBlogButton";
import getSession from "@/lib/db/getSession";
import userCanEditBlog from "@/components/pages/Blog/MDXForm/lib/userCanEditBlog";
import { cn } from "@/lib/utils";
import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { blogsLimit } from "@/appConfig";

const pageSchema = z.coerce.number().min(0);

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
    let page =
      data.success && blogsCount >= blogsLimit * data.data ? data.data : 0;

    const pageBlogs = await getCachedBlogsPage(
      page,
      blogsLimit,
      userCanEditBlog({ user }),
    );

    // display blogs with pagination
    return (
      <div className="mt-24 md:mt-28">
        <HeaderImage
          dbImageName="yap3o9c6fjge8bryubu3bw4t-beach-laptop.webp"
          containerClassName="relative h-96 w-screen max-w-screen-2xl mx-auto"
        >
          <div className="absolute inset-auto flex h-full w-full flex-col items-center justify-around">
            <h1 className="bg-accent/50 px-4 text-center text-[clamp(2rem,12vw,4rem)] uppercase drop-shadow-[4px_4px_2px_rgba(0,0,0,0.8)]">
              OUR BLOG
            </h1>
          </div>
        </HeaderImage>

        <section className="relative mx-auto my-4 flex w-screen max-w-screen-lg flex-col rounded-lg shadow shadow-accent md:p-2">
          {userCanEditBlog({ user }) && (
            <CreateNewBlogButton className="fixed bottom-0 z-20 flex w-screen justify-center md:sticky md:bottom-auto md:top-28 md:w-full" />
          )}
          <div className={cn("w-full")}>
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
            limit={blogsLimit}
            page={page}
            // className="absolute bottom-0"
          />
        </section>
      </div>
    );
  } catch (error: any) {
    // display error page
    console.log(error.message);
  }
}

export const runtime = "edge";
