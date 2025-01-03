import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackToBlogsButton({
  pathToBlog = "/blog",
  className,
}: {
  pathToBlog?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Link href={pathToBlog} className="group flex items-center gap-1.5">
        <ArrowLeft className="transition-transform group-hover:-translate-x-2" />
        Find more blogs
      </Link>
    </div>
  );
}
