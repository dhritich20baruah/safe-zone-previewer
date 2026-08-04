import SafeZoneCanvas from "@/components/SafeZonecanvas";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TikTok Safe Zone – Free Preview Tool | SafeZonePreview",
  description:
    "Preview the TikTok safe zone instantly. Upload your design and see exactly which areas TikTok's action bar, captions, and UI overlays will cover. Free, no login required.",
  alternates: { canonical: "/tiktok-safe-zone" },
};

export default function TikTokSafeZonePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-6xl">

          {/* ── Hero ── */}
          <header className="max-w-3xl mb-10">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">
              TikTok Safe Zone
            </p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              TikTok Safe Zone Preview
            </h1>
            <p className="text-lg text-slate-400">
              Upload your TikTok design and instantly see which areas are hidden behind TikTok's
              native UI — the right-side action bar, bottom caption area, and navigation tabs.
              No login, no watermark, completely free.
            </p>
          </header>

          {/* ── Tool ── */}
          <section
            aria-label="TikTok safe zone preview canvas"
            className="w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 mb-14"
          >
            <SafeZoneCanvas defaultPlatform="tiktok" locked />
          </section>

          {/* ── TikTok Safe Zone Dimensions ── */}
          <section className="max-w-3xl mb-14">
            <h2 className="text-2xl font-bold text-white mb-4">
              TikTok Safe Zone Dimensions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Canvas Size", value: "1080 × 1920 px" },
                { label: "Aspect Ratio", value: "9:16" },
                { label: "Right Margin", value: "~140 px" },
                { label: "Top Margin", value: "~160 px" },
                { label: "Bottom Margin", value: "~480 px" },
                { label: "Safe Width", value: "~940 px" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-800 rounded-xl border border-slate-700 p-4">
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-lg font-bold text-blue-400">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SEO Content ── */}
          <section className="max-w-3xl space-y-5 text-slate-400 mb-14">
            <h2 className="text-2xl font-bold text-white">
              What Is the TikTok Safe Zone?
            </h2>
            <p>
              The <strong className="text-slate-200">TikTok safe zone</strong> is the area of your
              9:16 video frame that remains fully visible to viewers after TikTok renders its native
              UI on top. When you post a video, TikTok automatically overlays several interface
              elements that cannot be moved or hidden — and any part of your design that falls
              behind these elements will be invisible to your audience.
            </p>
            <p>
              The most significant overlay is the right-side action bar, which contains your
              profile avatar, the Like button, the Comment button, the Bookmark button, and the
              Share button. This stack runs from approximately 160px from the top of the frame
              down to around 480px from the bottom, and occupies roughly 140px of horizontal space
              on the right edge of your canvas.
            </p>
            <p>
              The bottom of the frame is equally important. TikTok reserves the bottom 480px
              of a 1920px-tall canvas for the caption text, hashtags, music attribution bar, and
              the navigation tabs. If your logo, price, call to action, or any critical text sits
              in this region, it will be partially or fully hidden for every viewer watching on
              a standard mobile device.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              How to Use the TikTok Safe Zone Template
            </h3>
            <p>
              To use this tool as a reusable{" "}
              <strong className="text-slate-200">TikTok safe zone template</strong>, enable the
              "Safe-Zone Grid Only" toggle after uploading your image. This displays clean dashed
              boundary lines without the simulated UI. Take a screenshot of those lines and import
              them as a locked overlay layer in Canva, Figma, or Adobe Express. Every future TikTok
              design you create in that file will automatically respect the safe zone boundaries.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              TikTok Safe Zone vs Instagram Reels Safe Zone
            </h3>
            <p>
              Both TikTok and Instagram Reels use the 9:16 aspect ratio at 1080×1920px, but their
              safe zone margins differ. TikTok's bottom margin is larger (480px) compared to
              Instagram Reels (380px), and TikTok's right-side action bar is taller. If you
              cross-post the same video to both platforms, design to the TikTok safe zone —
              it is the more restrictive of the two, so content that fits TikTok will also
              fit Reels.
            </p>
          </section>

          {/* ── Internal links ── */}
          <section className="max-w-3xl">
            <h2 className="text-lg font-bold text-white mb-4">Also Check</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/instagram-reels-safe-zone", label: "Instagram Reels Safe Zone" },
                { href: "/instagram-story-safe-zone", label: "Instagram Story Safe Zone" },
                { href: "/youtube-shorts-safe-zone", label: "YouTube Shorts Safe Zone" },
                { href: "/", label: "All Platforms" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white rounded-lg text-sm transition-all"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
