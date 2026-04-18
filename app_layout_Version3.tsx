import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hook Generator",
  description: "Generate viral hooks and scores",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}