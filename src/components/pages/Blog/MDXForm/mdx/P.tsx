import { cn } from "@/lib/utils";

export default function P({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mb-6 self-start px-2 text-lg leading-7", className)}>
      {children}
    </p>
  );
}
