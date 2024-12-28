import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MDX Blog",
  description: "Animated Editable MDX Blog",
};

export default function LocationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="mx-auto w-full max-w-screen-lg">{children}</div>
    </main>
  );
}
