import {
  brandMetadataSiteName,
  brandMetadataTwitterAccount,
  brandName,
  defaultMetadata,
} from "@/appConfig";
import { getServiceData } from "@/components/pages/Services/servicesData";
import { getCachedImageName } from "@/lib/cache/getCachedImageName";
import { env } from "@/lib/env.mjs";
import { getFileExtension } from "@/lib/getFileExtension";
import { Metadata } from "next";

type Props = {
  params: { path: string };
  // searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // getting service data
    const serviceData = getServiceData({ path: params.path });

    // if there is no service data found returning default metadata for the website
    if (!serviceData) return defaultMetadata;

    const imageData = (await getCachedImageName(serviceData.dbImageName))[0];

    return {
      title: `${serviceData.title} - ${brandName}`,
      description: serviceData.description,
      openGraph: {
        title: `${serviceData.title} - ${brandName}`,
        description: serviceData.description,
        images: [
          {
            url: `${env.NEXT_PUBLIC_R2_URI}/${serviceData.dbImageName}`,
            width: imageData.width,
            height: imageData.height,
            alt: imageData.aria,
            type: `image/${getFileExtension(imageData.name)}`,
          },
        ],
        siteName: brandMetadataSiteName,
        type: "website",
        url: `${env.NEXT_PUBLIC_URI}/${serviceData.href}`,
      },
      twitter: {
        card: "summary_large_image",
        site: brandMetadataTwitterAccount,
        creator: brandMetadataTwitterAccount,
      },
    };
  } catch (error: any) {
    return defaultMetadata;
  }
}

export default async function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
