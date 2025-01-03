import { db } from "@db/db-connection";
import { users } from "@db/schemaAuth";
import { blogs } from "@db/schemaBlog";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { CachedBlogWithImage } from "./blog";
import { images } from "@db/schemaImage";

export const getCachedBlogIdWithImage = cache(
  async (blogId: number): Promise<CachedBlogWithImage> => {
    const getCachedData = unstable_cache(
      async (blogId: number) => {
        console.log(`Fetching blog post ${blogId} with image`);
        return (
          (
            await db
              .select({
                blog: blogs,
                owner: {
                  name: users.name,
                  image: users.image,
                },
                image: images,
              })
              .from(blogs)
              // owner data
              .leftJoin(users, eq(users.id, blogs.owner))
              // preview image
              .leftJoin(images, eq(images.imageId, blogs.previewImage))
              .where(eq(blogs.blogId, blogId))
          )[0]
        );
        // return await db
        //   .select({
        //     blog: blogs,
        //     owner: {
        //       name: users.name,
        //       image: users.image,
        //     },
        //     images: images,
        //     tags: tags,
        //     likesCount: sql<number>`count(${blogInteractions.status}  ===  1 || ${blogInteractions.status}  ===  4)`,
        //     dislikesCount: sql<number>`count(${blogInteractions.status}  ===  2 || ${blogInteractions.status}  ===  5)`,
        //     favouriteCount: sql<number>`count(${blogInteractions.status}  ===  3 || ${blogInteractions.status}  ===  4 || ${blogInteractions.status}  ===  5)`,
        //     commentsCount: sql<number>`count(${comments})`,
        //   })
        //   .from(blogs)
        //   // querying author data
        //   .leftJoin(users, eq(users.id, blogs.owner))
        //   // querying images associated with the blog
        //   .leftJoin(blogs_images, eq(blogs_images.blogId, blogId))
        //   .leftJoin(images, eq(images.imageId, blogs_images.imageId))
        //   // querying tags
        //   .leftJoin(blogs_tags, eq(blogs_tags.blogId, blogId))
        //   .leftJoin(tags, eq(tags.tagId, blogs_tags.tagId))
        //   // querying interactions
        //   .leftJoin(
        //     blogInteractions,
        //     and(
        //       eq(blogInteractions.blogId, blogId),
        //       ne(blogInteractions.status, 0),
        //     ),
        //   )
        //   // querying comments
        //   .leftJoin(comments, eq(comments.blogId, blogId))
        //   .where(eq(blogs.blogId, blogId));
      },
      [`blogPostWithImage${blogId}`],
      {
        revalidate: 60 * 60 * 24,
        tags: [`blogPostWithImageTag${blogId}`, "signInState"],
      },
    );

    return await getCachedData(blogId);
  },
);
