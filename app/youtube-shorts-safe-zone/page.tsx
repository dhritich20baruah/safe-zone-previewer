import SafeZoneCanvas from "@/components/SafeZonecanvas";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Shorts Safe Zone – Free Preview Tool | SafeZonePreview",
  description:
    "Preview the YouTube Shorts safe zone instantly. Upload your design and see which areas YouTube's like/dislike bar, subscribe button, and UI overlays will cover. Free, no login required.",
  alternates: { canonical: "/youtube-shorts-safe-zone" },
};

export default function YouTubeShortsSafeZonePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-6xl">

          {/* ── Hero ── */}
          <header className="max-w-3xl mb-10">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">
              YouTube Shorts Safe Zone
            </p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              YouTube Shorts Safe Zone Preview
            </h1>
            <p className="text-lg text-slate-400">
              Upload your YouTube Shorts design and instantly see which areas are hidden behind
              YouTube's native UI — the like/dislike bar, subscribe button, channel info, and
              bottom audio bar. Free, no login required.
            </p>
          </header>

          {/* ── Tool ── */}
          <section
            aria-label="YouTube Shorts safe zone preview canvas"
            className="w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 mb-14"
          >
            <SafeZoneCanvas defaultPlatform="shorts" locked />
          </section>

          {/* ── Dimensions ── */}
          <section className="max-w-3xl mb-14">
            <h2 className="text-2xl font-bold text-white mb-4">
              YouTube Shorts Safe Zone Dimensions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Canvas Size", value: "1080 × 1920 px" },
                { label: "Aspect Ratio", value: "9:16" },
                { label: "Right Margin", value: "~160 px" },
                { label: "Top Margin", value: "~160 px" },
                { label: "Bottom Margin", value: "~420 px" },
                { label: "Safe Width", value: "~920 px" },
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
              What Is the YouTube Shorts Safe Zone?
            </h2>
            <p>
              The <strong className="text-slate-200">YouTube Shorts safe zone</strong> is the
              area of your 9:16 video frame that remains visible after YouTube renders its native
              Shorts UI on top of your content. YouTube Shorts has one of the most complex overlay
              layouts of any vertical video platform, with UI elements on both the right side and
              the bottom of the frame.
            </p>
            <p>
              The right side of the Shorts frame is occupied by a vertical stack of interaction
              buttons — Like, Dislike, Comment count, Share, and Remix. This stack runs from
              approximately the midpoint of the screen downward, and sits around 160px from the
              right edge. Below the action buttons, YouTube also displays a settings/more options
              icon that can obscure content in the lower-right corner.
            </p>
            <p>
              The bottom of the frame is the most restricted zone. YouTube Shorts reserves
              approximately 420px from the bottom for the channel name, a Subscribe button, the
              video title, hashtags, and the audio attribution bar. This is significantly taller
              than most creators expect, and is one of the most common causes of cut-off text and
              logos in Shorts content.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              YouTube Shorts Safe Zone vs TikTok Safe Zone
            </h3>
            <p>
              Both platforms use the 9:16 format at 1080×1920px, but YouTube Shorts has a
              slightly larger right margin (160px vs TikTok's 140px) and a smaller bottom margin
              (420px vs TikTok's 480px). If you are cross-posting content between TikTok and
              YouTube Shorts, use TikTok's bottom margin (480px) as your guide — it is the more
              restrictive of the two — but use YouTube Shorts' right margin (160px) since it
              extends further.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              YouTube Shorts Safe Zone for Thumbnail Design
            </h3>
            <p>
              YouTube automatically generates a thumbnail from your Short, but you can also set
              a custom thumbnail. When designing a custom thumbnail for a Short, the same 9:16
              safe zone rules apply. Additionally, YouTube may overlay a play button and video
              duration pill on the thumbnail in certain contexts, so avoid placing critical text
              in the lower-right corner of the frame.
            </p>
          </section>

          {/* ── Internal links ── */}
          <section className="max-w-3xl">
            <h2 className="text-lg font-bold text-white mb-4">Also Check</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/tiktok-safe-zone", label: "TikTok Safe Zone" },
                { href: "/instagram-reels-safe-zone", label: "Instagram Reels Safe Zone" },
                { href: "/instagram-story-safe-zone", label: "Instagram Story Safe Zone" },
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
