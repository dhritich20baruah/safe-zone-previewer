import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Safe Zone Preview – Free TikTok, Instagram Reels & YouTube Safe Zone Checker",
  description:
    "Free safe zone preview tool for TikTok, Instagram Reels, IG Stories, and YouTube Shorts. Upload your design and instantly see which areas are blocked by UI overlays. No login required.",
  keywords: [
    "safe zone preview",
    "safe zone",
    "tiktok safe zone",
    "tiktok safe zone template",
    "instagram story safe zone",
    "instagram stories safe zone",
    "instagram reels safe zone",
    "instagram reel safe zone template",
    "ig reel safe zone",
    "ig story safe zone",
    "instagram safe zone template",
    "youtube shorts safe zone",
    "create transparent overlay safe zone marking",
    "social media safe zone checker",
    "video safe zone tool",
  ],
  openGraph: {
    title: "Safe Zone Preview – TikTok, Instagram Reels, IG Stories & YouTube Shorts",
    description: "Preview your TikTok safe zone, Instagram Reels safe zone, IG Story safe zone, and YouTube Shorts safe zone in seconds. Upload your design and check which areas are hidden by native UI overlays.",
    type: "website",
    url: "https://safezonepreview.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Safe Zone Preview Tool" }],

  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Zone Preview Tool – TikTok, Reels & YouTube Shorts",
    description:
      "Check your TikTok safe zone, Instagram Reels safe zone, and YouTube Shorts safe zone instantly. Free, no login required.",
  },
  alternates: {
    canonical: "/",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PTJVE5LTWB" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-PTJVE5LTWB');
            `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
