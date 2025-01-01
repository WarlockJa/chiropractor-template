import { isRedirectError } from "next/dist/client/components/redirect";
import { isNotFoundError } from "next/dist/client/components/not-found";
import { serialize } from "next-mdx-remote/serialize";
import getSession from "@/lib/db/getSession";
import remarkGFM from "remark-gfm";
import { getCachedBlog } from "@/lib/cache/blog/getCachedBlog";
import { getCachedBlogImages } from "@/lib/cache/blog/getCachedBlogImages";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import partsToMDXParser from "@/components/pages/Blog/MDXForm/LookupTables/partsToMDXParser";
import LoaderSpinner from "@/components/UniversalComponents/LoaderSpinner";
import MDXRemoteWrapper from "@/components/pages/Blog/MDXForm/MDXRemoteWrapper";
import MDXFormEditable from "@/components/pages/Blog/MDXForm/MDXFormEditable";
import userCanEditBlog from "@/components/pages/Blog/MDXForm/lib/userCanEditBlog";
import { TAllBlogParts } from "@/components/pages/Blog/MDXForm/mdxtypes";

export default async function MDXBlogPage({
  params,
}: {
  params: { blog_id: number };
}) {
  try {
    const session = await getSession();
    const user = session?.user;

    // reading cached MDX data
    // additional cache revalidation check for user role change
    const [blogData, blogImages] = await Promise.all([
      getCachedBlog(params.blog_id),
      getCachedBlogImages(params.blog_id),
    ]);

    // if blog not published redirecting user
    if (!userCanEditBlog({ user }) && !blogData.blog.published)
      redirect(`/blog`);
    // if blog has no mdx data redirecting TODO report DB inconsistency
    if (!blogData.blog.mdx) redirect(`/blog`);

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
        <Suspense fallback={<LoaderSpinner />}>
          <MDXRemoteWrapper props={source} />
        </Suspense>
      );
    } else {
      // MDXFormEditable accepts blog id as id param, passing blog id associated with the catalog node
      return (
        <Suspense fallback={<LoaderSpinner />}>
          <MDXFormEditable
            source={JSON.parse(blogData.blog.mdx)}
            blogId={blogData.blog.blogId}
            blogImages={blogImages}
            published={blogData.blog.published ?? false}
            tags={""}
          />
        </Suspense>
      );
    }
  } catch (error: any) {
    // if error is caused by nextjs redirect then redirect
    if (isRedirectError(error)) throw error;
    // if error is caused by nextjs notFound then display not-found page
    if (isNotFoundError(error)) throw error;
    // display error page
    console.log(error.message);
    // throw new Error(error.message);
  }
}

export const runtime = "edge";
