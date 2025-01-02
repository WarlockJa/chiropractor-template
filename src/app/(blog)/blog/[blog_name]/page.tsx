import { serialize } from "next-mdx-remote/serialize";
import getSession from "@/lib/db/getSession";
import remarkGFM from "remark-gfm";
import { getCachedBlogImages } from "@/lib/cache/blog/getCachedBlogImages";
import { Suspense } from "react";
import partsToMDXParser from "@/components/pages/Blog/MDXForm/LookupTables/partsToMDXParser";
import LoaderSpinner from "@/components/UniversalComponents/LoaderSpinner";
import MDXRemoteWrapper from "@/components/pages/Blog/MDXForm/MDXRemoteWrapper";
import MDXFormEditable from "@/components/pages/Blog/MDXForm/MDXFormEditable";
import userCanEditBlog from "@/components/pages/Blog/MDXForm/lib/userCanEditBlog";
import { TAllBlogParts } from "@/components/pages/Blog/MDXForm/mdxtypes";
import { getCachedBlogName } from "@/lib/cache/blog/getCachedBlogName";
import BlogNotFound from "./not-found";
import Socials from "@/components/pages/Blog/Socials";

export default async function MDXBlogPage({
  params,
}: {
  params: { blog_name: string };
}) {
  try {
    const session = await getSession();
    const user = session?.user;

    // reading cached MDX data
    // additional cache revalidation check for user role change
    const [blogData, blogImages] = await Promise.all([
      getCachedBlogName(params.blog_name),
      getCachedBlogImages(params.blog_name),
    ]);

    // if blog not published redirecting user
    if (!userCanEditBlog({ user }) && !blogData.blog.published)
      return BlogNotFound();
    // if blog has no mdx data redirecting TODO report DB inconsistency
    if (!blogData.blog.mdx) return BlogNotFound();

    if (!userCanEditBlog({ user })) {
      // serializing string into an MDX component
      const source = await serialize(
        // converting TParts array into a serializable string
        partsToMDXParser(
          // filtering meta parts used for MDX editing
          JSON.parse(blogData.blog.mdx).filter(
            (item: TAllBlogParts) => item.type !== 999,
          ),
        ),
        {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGFM],
          },
        },
      );

      return (
        <main className="mx-auto mt-28 min-h-[calc(100vh-7rem)] w-full max-w-screen-lg">
          <Suspense fallback={<LoaderSpinner />}>
            <MDXRemoteWrapper props={source} blogImages={blogImages} />
          </Suspense>
        </main>
      );
    } else {
      // MDXFormEditable accepts blog id as id param, passing blog id associated with the catalog node
      return (
        <main className="mx-auto mt-28 min-h-[calc(100vh-7rem)] w-full max-w-screen-lg">
          <Suspense fallback={<LoaderSpinner />}>
            <MDXFormEditable
              source={JSON.parse(blogData.blog.mdx)}
              blogId={blogData.blog.blogId}
              blogImages={blogImages}
              published={blogData.blog.published ?? false}
              tags={""}
            />
          </Suspense>
          <Socials url={`/blog/${blogData.blog.blogName}`} spread />
        </main>
      );
    }
  } catch (error: any) {
    // console.log(error.message);
    return BlogNotFound();
  }
}

export const runtime = "edge";
