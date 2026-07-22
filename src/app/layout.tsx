import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { site } from "@/data/content";
import "./globals.css";

// Self-hosted via next/font - zero layout shift, no external requests.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} - Software Engineer`,
  description: site.pitch,
  keywords: [
    "software engineer",
    "backend",
    "data pipelines",
    "observability",
    "UC Berkeley",
    "internship",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: `${site.name} - Software Engineer`,
    description: site.pitch,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - Software Engineer`,
    description: site.pitch,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f14" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
  ],
};

/**
 * Applies the saved theme before first paint so there is no flash.
 * Dark is the default; "light" in localStorage opts out.
 */
const themeInitScript = `(function(){try{if(localStorage.getItem("theme")==="light"){document.documentElement.classList.remove("dark")}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the theme script may strip the `dark` class
    // before React hydrates <html>.
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
