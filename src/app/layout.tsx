import type { Metadata } from "next";
import { Martel, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { getLocale, getMessages } from "next-intl/server";
import { AnimatePresence } from "motion/react";
import { NextIntlClientProvider } from "next-intl";
import {
  brandMetadataDescritpion,
  brandMetadataImage,
  brandMetadataSiteName,
  brandMetadataTwitterAccount,
  brandMetadataUrl,
  brandName,
} from "@/appConfig";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import NextTransitionBar from "next-transition-bar";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const martel = Martel({
  subsets: ["latin-ext"],
  variable: "--font-martel",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: brandName,
  description: brandMetadataDescritpion,
  openGraph: {
    title: brandName,
    description: brandMetadataDescritpion,
    url: brandMetadataUrl,
    siteName: brandMetadataSiteName,
    images: [brandMetadataImage],
  },
  twitter: {
    card: "summary_large_image",
    site: brandMetadataTwitterAccount,
    creator: brandMetadataTwitterAccount,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${martel.variable} ${poppins.variable} font-poppins min-h-screen`}
      >
        <AnimatePresence>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTransitionBar />
              <main>
                <Toaster />
                <NavBar />
                <>{children}</>
                <Footer />
              </main>
            </ThemeProvider>
          </NextIntlClientProvider>
        </AnimatePresence>
      </body>
    </html>
  );
}
