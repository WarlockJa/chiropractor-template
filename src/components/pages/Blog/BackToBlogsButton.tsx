import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function BackToBlogsButton({
  pathToBlog = "/blog",
  className,
}: {
  pathToBlog?: string;
  className?: string;
}) {
  const tBlog = useTranslations("Blog");
  return (
    <div className={className}>
      <Link href={pathToBlog} className="group flex items-center gap-1.5">
        <ArrowLeft className="transition-transform group-hover:-translate-x-2" />
        {tBlog("find_more_blogs")}
      </Link>
    </div>
  );
}
