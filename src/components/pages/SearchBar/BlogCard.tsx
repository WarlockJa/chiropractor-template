"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertCodesToSpecialCharacters } from "@/lib/convertStringSpecialCharacters";
import { intlFormat } from "date-fns";
import Link from "next/link";
import { ReactNode } from "react";
import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";
import { CachedBlogWithImage } from "@/lib/cache/blog/blog";

export default function BlogCard({
  blog,
  image,
  owner,
  SheetCloseWrapper,
}: CachedBlogWithImage & {
  SheetCloseWrapper: React.FC<{
    children: ReactNode;
    withSheetClose?: boolean;
  }>;
}) {
  return (
    <Link href={`/blog/${blog.blogName}`}>
      <SheetCloseWrapper withSheetClose>
        <Card className="relative grid h-40 w-full grid-cols-2 overflow-hidden border-2 transition-shadow hover:shadow-accent">
          <CardContent className="p-0">
            <CustomDataImage dbImage={image} />
          </CardContent>
          <CardHeader className="flex flex-col bg-accent/10 p-2">
            <CardTitle className="flex-1">
              {convertCodesToSpecialCharacters(blog.title)}
            </CardTitle>
            <div className="flex w-full flex-wrap justify-between gap-2 text-sm">
              {/* <p className="flex">
              <ThumbsUp size={20} /> 12
            </p>
            <p className="flex">
              <ScrollText size={20} /> 12
            </p>
            <p className="flex">
              <Eye size={20} /> 123
            </p>
            <p className="flex">
              <Heart size={20} />
            </p> */}
              <div className="ml-auto flex gap-2 text-sm">
                {owner?.name}
                <p>{intlFormat(blog.updatedAt)}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </SheetCloseWrapper>
    </Link>
  );
}
