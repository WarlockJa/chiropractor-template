import { cn } from "@/lib/utils";

export default function PartHeader({
  partName,
  className,
}: {
  partName: string;
  className?: string;
}) {
  return (
    <h1 className={cn("rounded-t-md bg-primary p-2 text-center", className)}>
      Now Editing: {partName}
    </h1>
  );
}
