import { brandMetadataUrl } from "@/appConfig";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/crud/", "/upload"],
    },
    // sitemap: 'https://acme.com/sitemap.xml',
    sitemap: `${brandMetadataUrl}/sitemap.xml`,
  };
}
