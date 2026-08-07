import SafeZoneCanvas from "@/components/SafeZonecanvas";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest Safe Zone – Free Preview Tool | SafeZonePreview",
  description:
    "Preview the Pinterest safe zone instantly. Upload your Pin design and see exactly which areas Pinterest's UI overlays will cover. Free, no login required.",
  alternates: { canonical: "/pinterest-safe-zone" },
};

export default function PinterestSafeZonePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-6xl">

          <header className="max-w-3xl mb-10">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">Pinterest Safe Zone</p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">Pinterest Safe Zone Preview</h1>
            <p className="text-lg text-slate-400">
              Upload your Pinterest Pin design and instantly see which areas are hidden behind
              Pinterest's native UI — the top logo bar, bottom Save button, and attribution overlay.
              Free, no login required.
            </p>
          </header>

          <section aria-label="Pinterest safe zone preview canvas" className="w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 mb-14">
            <SafeZoneCanvas defaultPlatform="pinterest" locked />
          </section>

          <section className="max-w-3xl mb-14">
            <h2 className="text-2xl font-bold text-white mb-4">Pinterest Safe Zone Dimensions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Canvas Size",    value: "1000 × 1500 px" },
                { label: "Aspect Ratio",   value: "2:3"            },
                { label: "Top Margin",     value: "~100 px"        },
                { label: "Bottom Margin",  value: "~200 px"        },
                { label: "Side Margins",   value: "~50 px each"    },
                { label: "Safe Height",    value: "~1200 px"       },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-800 rounded-xl border border-slate-700 p-4">
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-lg font-bold text-blue-400">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl space-y-5 text-slate-400 mb-14">
            <h2 className="text-2xl font-bold text-white">What Is the Pinterest Safe Zone?</h2>
            <p>
              The <strong className="text-slate-200">Pinterest safe zone</strong> is the area of
              your Pin image that stays fully visible after Pinterest renders its native UI on top.
              Unlike TikTok or Instagram which use a 9:16 vertical format, Pinterest Pins use a
              2:3 aspect ratio at 1000×1500px — taller and narrower than a standard phone screen,
              optimised for scroll-based discovery.
            </p>
            <p>
              Pinterest overlays a top bar with its logo and navigation, and a bottom bar with the
              Save button, Pin title, and source URL attribution. The bottom bar is the most
              critical — the red Save button sits in the lower-right corner and can obscure any
              text, price, or call to action placed too close to the bottom edge. Keep all
              important content at least 200px from the bottom of a 1500px canvas.
            </p>
            <h3 className="text-xl font-bold text-white pt-2">Pinterest Pin Design Best Practices</h3>
            <p>
              Pinterest is primarily a visual discovery platform — text overlays on images perform
              significantly better than image-only Pins. Place your headline text in the central
              safe area, away from all four edges. Use high-contrast text so it remains readable
              when the Save button and attribution overlay appear on top of the lower portion of
              your Pin.
            </p>
          </section>

          <section className="max-w-3xl">
            <h2 className="text-lg font-bold text-white mb-4">Also Check</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/tiktok-safe-zone",             label: "TikTok Safe Zone"          },
                { href: "/instagram-reels-safe-zone",    label: "Instagram Reels Safe Zone" },
                { href: "/youtube-shorts-safe-zone",     label: "YouTube Shorts Safe Zone"  },
                { href: "/facebook-reels-safe-zone",     label: "Facebook Reels Safe Zone"  },
                { href: "/",                             label: "All Platforms"             },
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
