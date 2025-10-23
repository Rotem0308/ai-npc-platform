import NotFound from "@/components/NotFound";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <NotFound />
      </body>
    </html>
  );
}
