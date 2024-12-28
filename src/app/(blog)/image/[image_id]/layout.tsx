import type { Metadata, ResolvingMetadata } from "next";
import { env } from "@/lib/env.mjs";
import { convertCodesToSpecialCharacters } from "@/lib/convertStringSpecialCharacters";
import { getCachedBlog } from "@/lib/cache/blog/getCachedBlog";
import {
  brandMetadataSiteName,
  brandMetadataTwitterAccount,
  defaultMetadata,
} from "@/appConfig";
import { getCachedImageBlog } from "@/lib/cache/blog/getCachedImageBlog";
import { getFileExtension } from "@/lib/getFileExtension";

type Props = {
  params: { image_id: number };
  // searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  // { params, searchParams }: Props,
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    // getting image data
    const imageBlog = await getCachedImageBlog(params.image_id);

    // if there is no blog associated with the image returning default metadata for the website
    if (!imageBlog.blog_image) return defaultMetadata;

    // getting post data
    const blogData = await getCachedBlog(imageBlog.blog_image.blogId);

    return {
      title: convertCodesToSpecialCharacters(blogData.blog.title),
      description: convertCodesToSpecialCharacters(
        blogData.blog.description ?? "",
      ),
      openGraph: {
        title: convertCodesToSpecialCharacters(blogData.blog.title),
        description: convertCodesToSpecialCharacters(
          blogData.blog.description ?? " ",
        ),
        images: [
          {
            url: `${env.NEXT_PUBLIC_R2_URI}/${imageBlog.image.name}`,
            width: imageBlog.image.width,
            height: imageBlog.image.height,
            alt: imageBlog.image.aria,
            type: `image/${getFileExtension(imageBlog.image.name)}`,
          },
        ],
        siteName: brandMetadataSiteName,
        type: "website",
        url: `${env.NEXT_PUBLIC_URI}/image/${params.image_id}`,
      },
      twitter: {
        card: "summary_large_image",
        site: brandMetadataTwitterAccount,
        creator: brandMetadataTwitterAccount,
      },
    };
  } catch (error: any) {
    return defaultMetadata;
  }
}

export default function ImageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  return <>{children}</>;
}
