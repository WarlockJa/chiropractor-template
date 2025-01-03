"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getServiceData } from "../Services/servicesData";

export default function PageCard({ path }: { path: string }) {
  const pageData = getServiceData({ path });

  if (!pageData) return <p>Page not found</p>;

  return (
    <Link href={pageData.href}>
      <Card className="group relative h-24 w-full overflow-hidden border-2 transition-shadow hover:shadow-accent">
        <CardHeader className="grid h-full grid-rows-[1.5rem,1fr] bg-accent/10 p-2">
          <CardTitle className="text-xl group-hover:underline">
            {pageData.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-ellipsis">
            {pageData.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
