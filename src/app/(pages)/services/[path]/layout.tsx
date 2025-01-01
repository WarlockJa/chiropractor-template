import {
  brandMetadataImage,
  brandMetadataServices,
  brandMetadataSiteName,
  brandMetadataTwitterAccount,
  brandMetadataUrl,
  brandName,
} from "@/appConfig";
import { Metadata } from "next";

// TODO ADD SERVICE SPECIFIC METADATA
export const metadata: Metadata = {
  title: `${brandName} services`,
  description: brandMetadataServices,
  openGraph: {
    title: brandName,
    description: brandMetadataServices,
    url: brandMetadataUrl,
    siteName: brandMetadataSiteName,
    images: [brandMetadataImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: brandMetadataTwitterAccount,
    creator: brandMetadataTwitterAccount,
  },
};

export default async function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
