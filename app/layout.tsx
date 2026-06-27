import type { Metadata } from "next";
import "./globals.css";

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
    description:
      "Preview your TikTok safe zone, Instagram Reels safe zone, IG Story safe zone, and YouTube Shorts safe zone in seconds. Upload your design and check which areas are hidden by native UI overlays.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Zone Preview Tool – TikTok, Reels & YouTube Shorts",
    description:
      "Check your TikTok safe zone, Instagram Reels safe zone, and YouTube Shorts safe zone instantly. Free, no login required.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
