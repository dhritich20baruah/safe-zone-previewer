import SafeZoneCanvas from "@/components/SafeZonecanvas";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snapchat Spotlight Safe Zone – Free Preview Tool | SafeZonePreview",
  description:
    "Preview the Snapchat Spotlight safe zone instantly. Upload your design and see which areas Snapchat's ghost logo, timer, reaction icons, and bottom nav will cover. Free, no login required.",
  alternates: { canonical: "/snapchat-safe-zone" },
};

export default function SnapchatSafeZonePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-6xl">

          <header className="max-w-3xl mb-10">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">
              Snapchat Spotlight Safe Zone
            </p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              Snapchat Spotlight Safe Zone Preview
            </h1>
            <p className="text-lg text-slate-400">
              Upload your Snapchat Spotlight design and instantly see which areas are hidden
              behind Snapchat's native UI — the ghost logo, countdown timer, reaction icons,
              username bar, and bottom navigation tabs. Free, no login required.
            </p>
          </header>

          <section
            aria-label="Snapchat Spotlight safe zone preview canvas"
            className="w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 mb-14"
          >
            <SafeZoneCanvas defaultPlatform="snapchat" locked />
          </section>

          <section className="max-w-3xl mb-14">
            <h2 className="text-2xl font-bold text-white mb-4">
              Snapchat Spotlight Safe Zone Dimensions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Canvas Size",   value: "1080 × 1920 px" },
                { label: "Aspect Ratio",  value: "9:16"           },
                { label: "Right Margin",  value: "~120 px"        },
                { label: "Top Margin",    value: "~160 px"        },
                { label: "Bottom Margin", value: "~320 px"        },
                { label: "Safe Width",    value: "~960 px"        },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-800 rounded-xl border border-slate-700 p-4">
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="text-lg font-bold text-blue-400">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl space-y-5 text-slate-400 mb-14">
            <h2 className="text-2xl font-bold text-white">
              What Is the Snapchat Spotlight Safe Zone?
            </h2>
            <p>
              The <strong className="text-slate-200">Snapchat Spotlight safe zone</strong> is
              the area of your 9:16 video frame that stays fully visible after Snapchat renders
              its native Spotlight UI on top. Snapchat Spotlight is the platform's short-form
              video feed — equivalent to TikTok's For You Page — and it has a unique overlay
              layout that differs significantly from other vertical video platforms.
            </p>
            <p>
              The most distinctive Snapchat UI element is the ghost logo and countdown timer
              at the top of the frame. The ghost icon appears center-top, and a video duration
              timer shows in the top-right corner. Together these elements mean the top 160px
              of your canvas should be treated as a restricted zone for critical text or logos.
            </p>
            <p>
              The right side of the Spotlight frame features a smaller icon stack than TikTok
              or Instagram — primarily reaction emoji, a comment button, and a share button —
              occupying approximately 120px from the right edge. This is the smallest right
              margin of any platform the tool supports, which means Snapchat gives you slightly
              more usable horizontal width than competitors.
            </p>
            <p>
              The bottom of the frame reserves around 320px for the creator's username, a
              yellow Subscribe button, and the caption. Below that sits Snapchat's bottom
              navigation bar — a row of four icons (Camera, Search, Chat, Profile) — which
              adds an additional 80px of hard UI at the very bottom. Combined, the effective
              bottom safe zone margin is approximately 320px from the bottom of your canvas.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              Snapchat Spotlight vs TikTok Safe Zone
            </h3>
            <p>
              Both use the 9:16 canvas at 1080×1920px. Snapchat has a smaller right margin
              (120px vs TikTok's 140px) and a smaller bottom margin (320px vs TikTok's 480px),
              making Snapchat Spotlight the most generous vertical video safe zone of any major
              platform in terms of usable canvas area. However, the top area is more restricted
              on Snapchat due to the prominent ghost logo and timer placement.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              Snapchat Spotlight Design Tips
            </h3>
            <p>
              Snapchat's audience skews younger than LinkedIn or Facebook — bold visuals, bright
              colors, and fast-moving content perform best. Keep your most important visual
              element (a face, a product, a reaction) centred vertically in the safe zone. Avoid
              placing the Subscribe CTA or pricing information near the bottom where the yellow
              Subscribe button will overlap. The distinctive Snapchat yellow (#FFFC00) is used
              for the Subscribe button, so avoid using that color in your design's lower portion
              to prevent visual confusion.
            </p>
          </section>

          <section className="max-w-3xl">
            <h2 className="text-lg font-bold text-white mb-4">Also Check</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/linkedin-safe-zone",           label: "LinkedIn Video Safe Zone"     },
                { href: "/tiktok-safe-zone",             label: "TikTok Safe Zone"             },
                { href: "/instagram-reels-safe-zone",    label: "Instagram Reels Safe Zone"    },
                { href: "/youtube-shorts-safe-zone",     label: "YouTube Shorts Safe Zone"     },
                { href: "/facebook-reels-safe-zone",     label: "Facebook Reels Safe Zone"     },
                { href: "/",                             label: "All Platforms"                },
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
