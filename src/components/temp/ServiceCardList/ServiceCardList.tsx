"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ReactNode, useState } from "react";

export default function ServiceCardList({
  title,
  image,
  href,
}: {
  title: string;
  image: ReactNode;
  href: string;
}) {
  const [shimmer, setShimmer] = useState(false);
  return (
    <Link
      href={href}
      onMouseOver={() => setShimmer(true)}
      onMouseLeave={() => setShimmer(false)}
      className="group"
    >
      <Card className="relative overflow-clip shadow-md transition-shadow group-hover:shadow-accent">
        {image}
        <CardHeader>
          <CardTitle>
            <TextShimmer
              duration={shimmer ? 1 : 0}
              className="text-xl [--base-color:hsl(var(--primary-foreground))] [--base-gradient-color:theme(colors.rose.400)] dark:[--base-color:hsl(var(--primary-foreground))] dark:[--base-gradient-color:theme(colors.rose.400)]"
            >
              {title.toLocaleUpperCase()}
            </TextShimmer>
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
