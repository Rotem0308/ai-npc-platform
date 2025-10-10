import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "AI NPC Frontend",
  description: "Best AI NPC Frontend in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
