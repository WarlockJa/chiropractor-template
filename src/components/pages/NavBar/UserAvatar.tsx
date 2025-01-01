"use client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserAvatar({
  image,
  name,
  title,
  className,
}: {
  image: string | null | undefined;
  name: string | null | undefined;
  title: string | null | undefined;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      {image && <AvatarImage src={image} title={title ?? ""} />}
      <AvatarFallback className="bg-accent text-accent-foreground">
        {name?.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
