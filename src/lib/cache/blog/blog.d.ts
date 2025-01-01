import { SelectBlogs } from "@db/schemaBlog";

interface CachedBlog {
  blog: SelectBlogs;
  owner: {
    name: string | null;
    image: string | null;
  } | null;
}
