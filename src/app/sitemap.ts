import { brandMetadataUrl } from "@/appConfig";
import type { MetadataRoute } from "next";
import { servicePaths } from "./(pages)/services/[path]/_lib/servicesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const links = [
    {
      url: brandMetadataUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    // {
    //   url: `${brandMetadataUrl}/disclaimer`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${brandMetadataUrl}/privacy-policy`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${brandMetadataUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${brandMetadataUrl}/contacts`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${brandMetadataUrl}/services`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: 'https://acme.com/blog',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.5,
    // },
  ];

  // servicePaths.forEach((service) => {
  //   links.push({
  //     url: `${brandMetadataUrl}/services/${service.path}`,
  //     lastModified: new Date(),
  //     changeFrequency: "monthly",
  //     priority: 0.8,
  //   });
  // });

  // @ts-ignore
  return links;
}
