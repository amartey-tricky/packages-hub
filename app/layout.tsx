import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const title = "Packages Hub";
const description =
  "An e-commerce website to sell packages of various shapes and sizes";

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: [
    "packages",
    "hub",
    "store",
    "e-commerce",
    "ghana",
    "gh",
    "china",
    "bags",
    "online-shop",
  ],
  openGraph: {
    title: title,
    description: description,
    url: "https://packageshubgh.com",
    siteName: "Packages Hub",
    type: "website",
    images: "",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    site: "@packageshubgh",
    creator: "@packageshubgh",
    images: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
