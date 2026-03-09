import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://globalview.tech";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Global View — Modern Construction & Architecture",
    template: "%s | Global View",
  },
  description:
    "A multi-disciplinary construction firm focused on futuristic design and technical excellence. We build for the next century.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Global View",
    title: "Global View — Modern Construction & Architecture",
    description:
      "A multi-disciplinary construction firm focused on futuristic design and technical excellence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global View — Modern Construction & Architecture",
    description:
      "A multi-disciplinary construction firm focused on futuristic design and technical excellence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="font-sans">
        <a
          href="#main-content"
          className="fixed left-2 top-2 z-[999] -translate-y-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
