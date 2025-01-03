import { SelectBlogs } from "@db/schemaBlog";
import { SelectImages } from "@db/schemaImage";

interface CachedBlog {
  blog: SelectBlogs;
  owner: {
    name: string | null;
    image: string | null;
  } | null;
}

interface CachedBlogWithImage {
  blog: SelectBlogs;
  owner: {
    name: string | null;
    image: string | null;
  } | null;
  image: SelectImages | null;
}
