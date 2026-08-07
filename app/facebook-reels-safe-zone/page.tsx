import SafeZoneCanvas from "@/components/SafeZonecanvas";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Reels Safe Zone – Free Preview Tool | SafeZonePreview",
  description:
    "Preview the Facebook Reels safe zone instantly. Upload your design and see exactly which areas Facebook's reaction icons, profile bar, and UI overlays will cover. Free, no login required.",
  alternates: { canonical: "/facebook-reels-safe-zone" },
};

export default function FacebookReelsSafeZonePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-6xl">

          <header className="max-w-3xl mb-10">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">Facebook Reels Safe Zone</p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">Facebook Reels Safe Zone Preview</h1>
            <p className="text-lg text-slate-400">
              Upload your Facebook Reels design and instantly see which areas are hidden behind
              Facebook's native UI — the right-side reaction icons, bottom profile bar, caption
              area, and audio attribution. Free, no login required.
            </p>
          </header>

          <section aria-label="Facebook Reels safe zone preview canvas" className="w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 mb-14">
            <SafeZoneCanvas defaultPlatform="facebook" locked />
          </section>

          <section className="max-w-3xl mb-14">
            <h2 className="text-2xl font-bold text-white mb-4">Facebook Reels Safe Zone Dimensions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Canvas Size",   value: "1080 × 1920 px" },
                { label: "Aspect Ratio",  value: "9:16"           },
                { label: "Right Margin",  value: "~130 px"        },
                { label: "Top Margin",    value: "~160 px"        },
                { label: "Bottom Margin", value: "~420 px"        },
                { label: "Safe Width",    value: "~950 px"        },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-800 rounded-xl border border-slate-700 p-4">
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-lg font-bold text-blue-400">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl space-y-5 text-slate-400 mb-14">
            <h2 className="text-2xl font-bold text-white">What Is the Facebook Reels Safe Zone?</h2>
            <p>
              The <strong className="text-slate-200">Facebook Reels safe zone</strong> is the area
              of your 9:16 video frame that remains visible after Facebook renders its native Reels
              UI on top. Facebook Reels shares the same 1080×1920px canvas as Instagram Reels and
              TikTok, but has its own distinct overlay layout with slightly different margins and
              UI element positions.
            </p>
            <p>
              The right side of the frame features Facebook's reaction icon stack — Like, Comment,
              Share, and a more options menu — occupying approximately 130px from the right edge.
              The bottom of the frame is the most restricted area, with roughly 420px reserved for
              the page name, Follow button, caption text, and audio attribution bar. Any text,
              logo, or call to action placed in this zone risks being partially or fully hidden.
            </p>
            <h3 className="text-xl font-bold text-white pt-2">Facebook Reels vs Instagram Reels Safe Zone</h3>
            <p>
              Both use the same 9:16 canvas at 1080×1920px, but Facebook's bottom margin (420px)
              is slightly larger than Instagram's (380px) and its right-side icon stack is positioned
              lower on the frame. If you cross-post the same video to both platforms, design to
              Facebook's more conservative bottom margin — content safe for Facebook Reels will
              also be safe for Instagram Reels.
            </p>
          </section>

          <section className="max-w-3xl">
            <h2 className="text-lg font-bold text-white mb-4">Also Check</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/instagram-reels-safe-zone", label: "Instagram Reels Safe Zone" },
                { href: "/instagram-story-safe-zone", label: "Instagram Story Safe Zone" },
                { href: "/tiktok-safe-zone",          label: "TikTok Safe Zone"          },
                { href: "/youtube-shorts-safe-zone",  label: "YouTube Shorts Safe Zone"  },
                { href: "/pinterest-safe-zone",       label: "Pinterest Safe Zone"        },
                { href: "/",                          label: "All Platforms"             },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white rounded-lg text-sm transition-all">
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
