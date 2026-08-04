import SafeZoneCanvas from "@/components/SafeZonecanvas";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Story Safe Zone – Free Preview Tool | SafeZonePreview",
  description:
    "Preview the Instagram Story safe zone instantly. Upload your design and see which areas Instagram's progress bar, reply box, and sticker overlays will cover. Free, no login required.",
  alternates: { canonical: "/instagram-story-safe-zone" },
};

export default function InstagramStorySafeZonePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-6xl">

          {/* ── Hero ── */}
          <header className="max-w-3xl mb-10">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">
              Instagram Story Safe Zone
            </p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              Instagram Story Safe Zone Preview
            </h1>
            <p className="text-lg text-slate-400">
              Upload your Instagram Story design and instantly see which areas are hidden behind
              Instagram's native UI — the progress bar, profile header, reply box, and bottom
              navigation. Free, no login required.
            </p>
          </header>

          {/* ── Tool ── */}
          <section
            aria-label="Instagram Story safe zone preview canvas"
            className="w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 mb-14"
          >
            <SafeZoneCanvas defaultPlatform="reels" locked />
          </section>

          {/* ── Dimensions ── */}
          <section className="max-w-3xl mb-14">
            <h2 className="text-2xl font-bold text-white mb-4">
              Instagram Story Safe Zone Dimensions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Canvas Size", value: "1080 × 1920 px" },
                { label: "Aspect Ratio", value: "9:16" },
                { label: "Top Margin", value: "~250 px" },
                { label: "Bottom Margin", value: "~380 px" },
                { label: "Side Margins", value: "~100 px each" },
                { label: "Safe Height", value: "~1290 px" },
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
              What Is the Instagram Story Safe Zone?
            </h2>
            <p>
              The <strong className="text-slate-200">Instagram Story safe zone</strong> is the
              central area of your 1080×1920px canvas that stays fully visible to viewers. Instagram
              Stories display several UI elements that overlay your content — the progress bar and
              profile header at the top, and the reply text field and navigation icons at the bottom.
              Any design elements outside the safe zone risk being hidden.
            </p>
            <p>
              The top of the frame is particularly vulnerable. Instagram Stories display a thin
              progress bar across the very top, followed by the account profile picture, username,
              and a three-dot menu. This header occupies approximately 250px from the top of the
              canvas. Placing text or logos too close to the top edge will result in them being
              partially or fully covered.
            </p>
            <p>
              The bottom of the frame reserves around 380px for the "Send message" reply bar and
              the emoji reaction row. This area is also used by Instagram to render sticker
              interaction zones on interactive Stories. Keeping all critical content above this
              margin ensures it remains visible whether the viewer is in a standard Story view,
              using the reply feature, or watching on a device with a home indicator bar.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              Instagram Story Safe Zone vs Reels Safe Zone
            </h3>
            <p>
              Both formats share the 9:16 canvas at 1080×1920px, but Stories have a slightly
              larger top margin due to the progress bar and profile header. For maximum
              compatibility — especially if you repurpose the same asset for both Stories and
              Reels — keep all critical content within the more conservative Story safe zone
              boundaries. Content that fits the{" "}
              <strong className="text-slate-200">IG Story safe zone</strong> will also be safe
              for Reels.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              Using This as an Instagram Story Safe Zone Template
            </h3>
            <p>
              Enable "Safe-Zone Grid Only" after uploading your image to display just the boundary
              lines. Screenshot the result and import it as a transparent locked layer in Canva,
              Figma, or Adobe Express. This gives you a reusable{" "}
              <strong className="text-slate-200">Instagram Story safe zone template</strong> you
              can apply to every Story design — ensuring nothing important ever falls outside the
              safe area again.
            </p>
            <p className="text-sm text-slate-500 mt-3 italic">
              Note: Instagram Stories and Reels share the same 9:16 canvas dimensions (1080×1920px),
              so the safe zone boundaries are identical. This preview applies to both formats.
            </p>
          </section>

          {/* ── Internal links ── */}
          <section className="max-w-3xl">
            <h2 className="text-lg font-bold text-white mb-4">Also Check</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/tiktok-safe-zone", label: "TikTok Safe Zone" },
                { href: "/instagram-reels-safe-zone", label: "Instagram Reels Safe Zone" },
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
