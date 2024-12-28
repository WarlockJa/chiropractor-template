import { cn } from "@/lib/utils";

export default function H1({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "m-0 self-start px-2 font-sans text-4xl font-medium",
        className,
      )}
    >
      {children}
    </h1>
  );
}
