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
  authors: [{ name: "Your Name", url: "https://your-website.com" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://printscreen.app", // Replace with your actual URL
    title: "Printscreen | Make your screenshots beautiful",
    description: "A simple, beautiful, and intuitive app to make your screenshots presentable and shareable.",
    siteName: "Printscreen",
    images: [
      {
        url: "https://printscreen.app/og-image.png", // Replace with your actual OG image URL
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
    images: ["https://printscreen.app/og-image.png"], // Replace with your actual Twitter image URL
    creator: "@your-twitter-handle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
