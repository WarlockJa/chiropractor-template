import type { Metadata, ResolvingMetadata } from "next";
import { env } from "@/lib/env.mjs";
import { convertCodesToSpecialCharacters } from "@/lib/convertStringSpecialCharacters";
import {
  brandMetadataTwitterAccount,
  brandName,
  defaultMetadata,
} from "@/appConfig";
import { getCachedBlog } from "@/lib/cache/blog/getCachedBlog";

type Props = {
  params: { blog_id: number };
  // searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  // { params, searchParams }: Props,
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetching cached blog data
  const blogData = await getCachedBlog(params.blog_id);

  if (!blogData) return defaultMetadata;

  return {
    title: `${convertCodesToSpecialCharacters(blogData.blog.title) ?? ""} ${blogData.owner?.name}`,
    description: `${convertCodesToSpecialCharacters(blogData.blog.description ?? "")} ${blogData.owner?.name} - ${brandName}`,
    openGraph: {
      title: `${convertCodesToSpecialCharacters(blogData.blog.title) ?? ""} ${blogData.owner?.name}`,
      description: `${convertCodesToSpecialCharacters(blogData.blog.description ?? "")} ${blogData.owner?.name} - ${brandName}`,
      images: `${env.NEXT_PUBLIC_R2_URI}/${blogData.image?.name}`,
      type: "website",
      url: `${env.NEXT_PUBLIC_URI}/blog/${params.blog_id}`,
    },
    twitter: {
      card: "summary_large_image",
      site: brandMetadataTwitterAccount,
      creator: brandMetadataTwitterAccount,
    },
  };
}

export default async function BlogLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { blog_id: number };
}>) {
  return <div className="mx-auto mt-28 w-full max-w-screen-lg">{children}</div>;
}
