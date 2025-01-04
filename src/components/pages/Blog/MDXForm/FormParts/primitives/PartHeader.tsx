import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function PartHeader({
  partName,
  className,
}: {
  partName: string;
  className?: string;
}) {
  const tBlog = useTranslations("Blog");
  return (
    <h1 className={cn("rounded-t-md bg-primary p-2 text-center", className)}>
      {tBlog("now_editing")} {partName}
    </h1>
  );
}
