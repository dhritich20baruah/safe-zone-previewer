import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Social Media Safe-Zone Previewer | TikTok, Reels & YouTube",
  description: "Instantly check your video thumbnails, shorts, and banners against native mobile & desktop UI overlays. No login required.",
  keywords: ["safe zone chceker", "tiktok safe grid", "youtube thumbnail previewer", "instagram reels safe area", "creator tools"],
  openGraph: {
    title: "Social Media Safe-Zone Previewer",
    description: "Don't let native app buttons cut off your text. Preview your overlays instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
