import { brandMetadataUrl } from "@/appConfig";
import { servicesData } from "@/components/pages/Services/servicesData";
import { db } from "@db/db-connection";
import { blogs } from "@db/schemaBlog";
import type { MetadataRoute } from "next";
// https://spacejelly.dev/posts/how-to-add-a-sitemap-rss-feed-in-next-js-app-router

export const dynamic = "force-dynamic";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: brandMetadataUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${brandMetadataUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${brandMetadataUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${brandMetadataUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${brandMetadataUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${brandMetadataUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://acme.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  console.log("TEST: ", brandMetadataUrl);

  // adding services paths
  servicesData.forEach((service) => {
    links.push({
      url: `${brandMetadataUrl}/services/${service.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  // adding blog paths
  const blogsData = await db.select().from(blogs);
  blogsData.forEach((blog) => {
    links.push({
      url: `${brandMetadataUrl}/blog/${blog.blogId}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  // @ts-ignore
  return links;
}
