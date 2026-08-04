import SafeZoneCanvas from "@/components/SafeZonecanvas";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Reels Safe Zone – Free Preview Tool | SafeZonePreview",
  description:
    "Preview the Instagram Reels safe zone instantly. Upload your design and see exactly which areas Instagram's reaction icons, profile bar, and UI overlays will cover. Free, no login required.",
  alternates: { canonical: "/instagram-reels-safe-zone" },
};

export default function InstagramReelsSafeZonePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-6xl">

          {/* ── Hero ── */}
          <header className="max-w-3xl mb-10">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">
              Instagram Reels Safe Zone
            </p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              Instagram Reels Safe Zone Preview
            </h1>
            <p className="text-lg text-slate-400">
              Upload your Instagram Reels design and instantly see which areas are hidden behind
              Instagram's native UI — reaction icons, profile info bar, caption overlay, and
              audio attribution. Free, no login required.
            </p>
          </header>

          {/* ── Tool ── */}
          <section
            aria-label="Instagram Reels safe zone preview canvas"
            className="w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 mb-14"
          >
            <SafeZoneCanvas defaultPlatform="reels" locked />
          </section>

          {/* ── Dimensions ── */}
          <section className="max-w-3xl mb-14">
            <h2 className="text-2xl font-bold text-white mb-4">
              Instagram Reels Safe Zone Dimensions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Canvas Size", value: "1080 × 1920 px" },
                { label: "Aspect Ratio", value: "9:16" },
                { label: "Right Margin", value: "~140 px" },
                { label: "Top Margin", value: "~160 px" },
                { label: "Bottom Margin", value: "~380 px" },
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
              What Is the Instagram Reels Safe Zone?
            </h2>
            <p>
              The <strong className="text-slate-200">Instagram Reels safe zone</strong> is the
              portion of your 9:16 video frame that stays visible after Instagram places its
              native UI elements on top of your content. Like TikTok, Instagram overlays reaction
              icons, the creator profile, captions, and audio attribution — but with slightly
              different margins.
            </p>
            <p>
              The right side of the frame is occupied by Instagram's vertical icon stack — Like,
              Comment, Send, and the three-dot menu — running from the middle of the screen
              downward. This stack sits approximately 140px from the right edge. The bottom of
              the frame reserves around 380px for the creator username, caption text, and the
              music sticker bar.
            </p>
            <p>
              The top of the frame is generally safe apart from the first 160px, which can overlap
              with Instagram's story progress bar or top navigation in some views. Keeping all
              critical content — text, logos, prices, calls to action — away from all four edges
              ensures it remains visible across different device sizes and screen ratios.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              Instagram Reels vs IG Story Safe Zone
            </h3>
            <p>
              The <strong className="text-slate-200">IG Reel safe zone</strong> and the{" "}
              <strong className="text-slate-200">IG Story safe zone</strong> use the same 9:16
              canvas dimensions (1080×1920px), so the safe area boundaries are nearly identical.
              The key difference is context: Stories display a progress bar at the top and a
              reply bar at the bottom. Reels show the action icon stack on the right and the
              audio attribution bar at the bottom. Design to the more conservative margins
              (380px bottom, 140px right) and your content will work safely for both formats.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              Creating a Reusable Instagram Reels Safe Zone Template
            </h3>
            <p>
              Enable "Safe-Zone Grid Only" mode after uploading your image. This strips the
              simulated UI and shows only the dashed boundary lines. Screenshot those lines and
              import them as a locked layer in Canva or Figma. You now have a permanent{" "}
              <strong className="text-slate-200">Instagram Reel safe zone template</strong> you
              can overlay on every Reel you design going forward.
            </p>
          </section>

          {/* ── Internal links ── */}
          <section className="max-w-3xl">
            <h2 className="text-lg font-bold text-white mb-4">Also Check</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/tiktok-safe-zone", label: "TikTok Safe Zone" },
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
