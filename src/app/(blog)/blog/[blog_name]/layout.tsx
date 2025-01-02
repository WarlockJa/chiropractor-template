import type { Metadata, ResolvingMetadata } from "next";
import { env } from "@/lib/env.mjs";
import { convertCodesToSpecialCharacters } from "@/lib/convertStringSpecialCharacters";
import {
  brandMetadataImage,
  brandMetadataTwitterAccount,
  brandName,
  defaultMetadata,
} from "@/appConfig";
import { getCachedImageId } from "@/lib/cache/getCachedImageId";
import { getFileExtension } from "@/lib/getFileExtension";
import { getCachedBlogName } from "@/lib/cache/blog/getCachedBlogName";

type Props = {
  params: { blog_name: string };
  // searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  // { params, searchParams }: Props,
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetching cached blog data
  const blogData = await getCachedBlogName(params.blog_name);
  // fetching blog preview image
  const blogImage = blogData.blog.previewImage
    ? (await getCachedImageId(blogData.blog.previewImage))[0]
    : null;

  if (!blogData) return defaultMetadata;

  return {
    title: `${convertCodesToSpecialCharacters(blogData.blog.title) ?? ""} ${blogData.owner?.name}`,
    description: `${convertCodesToSpecialCharacters(blogData.blog.description ?? "")} ${blogData.owner?.name} - ${brandName}`,
    openGraph: {
      title: `${convertCodesToSpecialCharacters(blogData.blog.title) ?? ""} ${blogData.owner?.name}`,
      description: `${convertCodesToSpecialCharacters(blogData.blog.description ?? "")} ${blogData.owner?.name} - ${brandName}`,
      images: [
        blogImage
          ? {
              url: `${env.NEXT_PUBLIC_R2_URI}/${blogImage.name}`,
              width: blogImage.width,
              height: blogImage.height,
              alt: blogImage.aria,
              type: getFileExtension(blogImage.name),
            }
          : brandMetadataImage,
      ],
      type: "website",
      url: `${env.NEXT_PUBLIC_URI}/blog/${params.blog_name}`,
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
  return <>{children}</>;
}
