import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProviderWrapper } from "@/components/ui/toast";
import { CookieBanner } from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cliplane — Download Any Video, Any Platform, No Watermark",
    template: "%s | Cliplane",
  },
  description:
    "Free video downloader for TikTok, Pinterest, Twitter, Reddit, Facebook, Vimeo, and Dailymotion. No login required. No watermarks. HD quality.",
  keywords: ["video downloader", "tiktok downloader", "pinterest downloader", "twitter video downloader", "reddit video downloader", "facebook video downloader", "vimeo downloader", "no watermark"],
  authors: [{ name: "Cliplane" }],
  creator: "Cliplane",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cliplane.com"),
  openGraph: {
    type: "website",
    siteName: "Cliplane",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", site: "@cliplane" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ToastProviderWrapper>
            {children}
            <CookieBanner />
          </ToastProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
