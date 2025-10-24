import type { Metadata } from "next";

import "./globals.css";

import { Iceberg } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const iceberg = Iceberg({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "AI NPC Frontend",
  description: "Best AI NPC Frontend in the world",
  icons: "/images/Wolf-Icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${iceberg.className}`}>
        <main>{children}</main>
        <Toaster theme="light" richColors={true} />
      </body>
    </html>
  );
}
