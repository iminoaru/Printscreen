import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Printscreen | Make your screenshots beautiful",
  description: "A simple, beautiful, and intuitive app to make your screenshots presentable and shareable.",
  keywords: ["screenshot", "beautify", "editor", "image", "design", "social media", "marketing"],
  authors: [{ name: "Sarthak Gaud", url: "https://sgaud.com" }],
  creator: "Sarthak Gaud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://printscreen.ink",
    title: "Printscreen | Make your screenshots beautiful",
    description: "A simple, beautiful, and intuitive app to make your screenshots presentable and shareable.",
    siteName: "Printscreen",
    images: [
      {
        url: "https://printscreen.ink/og-image.png",
        width: 1200,
        height: 630,
        alt: "Printscreen App Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Printscreen | Make your screenshots beautiful",
    description: "A simple, beautiful, and intuitive app to make your screenshots presentable and shareable.",
    images: ["https://printscreen.ink/og-image.png"],
    creator: "@iminoaruu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} font-sans antialiased light`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
