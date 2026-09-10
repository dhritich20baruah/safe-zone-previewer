import SafeZoneCanvas from "@/components/SafeZonecanvas";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Video Safe Zone – Free Preview Tool | SafeZonePreview",
  description:
    "Preview the LinkedIn video safe zone instantly. Upload your design and see exactly which areas LinkedIn's reaction bar, profile info, and UI overlays will cover. Free, no login required.",
  alternates: { canonical: "/linkedin-safe-zone" },
};

export default function LinkedInSafeZonePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-6xl">

          <header className="max-w-3xl mb-10">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">
              LinkedIn Video Safe Zone
            </p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              LinkedIn Video Safe Zone Preview
            </h1>
            <p className="text-lg text-slate-400">
              Upload your LinkedIn video design and instantly see which areas are hidden behind
              LinkedIn's native UI — the right-side reaction bar, bottom profile info, caption
              area, and engagement buttons. Free, no login required.
            </p>
          </header>

          <section
            aria-label="LinkedIn video safe zone preview canvas"
            className="w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 mb-14"
          >
            <SafeZoneCanvas defaultPlatform="linkedin" locked />
          </section>

          <section className="max-w-3xl mb-14">
            <h2 className="text-2xl font-bold text-white mb-4">
              LinkedIn Video Safe Zone Dimensions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Canvas Size",   value: "1080 × 1920 px" },
                { label: "Aspect Ratio",  value: "9:16"           },
                { label: "Right Margin",  value: "~140 px"        },
                { label: "Top Margin",    value: "~160 px"        },
                { label: "Bottom Margin", value: "~360 px"        },
                { label: "Safe Width",    value: "~940 px"        },
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
              What Is the LinkedIn Video Safe Zone?
            </h2>
            <p>
              The <strong className="text-slate-200">LinkedIn video safe zone</strong> is the
              area of your vertical video frame that remains fully visible after LinkedIn renders
              its native UI on top. LinkedIn's vertical video feed — introduced to compete with
              TikTok and Instagram Reels — uses the standard 9:16 format at 1080×1920px, but
              with a distinct overlay layout shaped by LinkedIn's professional design language.
            </p>
            <p>
              The right side of the LinkedIn video frame features a reaction icon stack — Like,
              Celebrate, Support, Funny, Love, Insightful — along with Comment and Share buttons.
              This stack occupies approximately 140px from the right edge and runs from the
              midpoint of the frame downward. Placing key content too close to the right edge
              risks it being hidden behind these interaction elements.
            </p>
            <p>
              The bottom of the frame is reserved for the creator's name, job title, company,
              video caption, and engagement count display. This area spans approximately 360px
              from the bottom on a 1920px-tall canvas — slightly smaller than TikTok or Instagram
              but still significant. Unlike other platforms, LinkedIn also displays a "Follow"
              button in the lower-left corner which can overlap with any content placed there.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              LinkedIn Video vs Instagram Reels Safe Zone
            </h3>
            <p>
              Both use the 9:16 canvas at 1080×1920px, but LinkedIn's bottom margin (360px) is
              smaller than Instagram Reels (380px). The right-side icon stack positions are also
              different — LinkedIn's icons are spaced more widely and positioned slightly lower
              than Instagram's. If you cross-post the same vertical video to both LinkedIn and
              Instagram Reels, design to Instagram's margins which are the more conservative of
              the two.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">
              LinkedIn Video Best Practices for Safe Zones
            </h3>
            <p>
              LinkedIn's audience skews professional — captions, titles, and job-relevant text
              overlays perform particularly well. Keep all text in the central safe zone and
              avoid the right 140px and bottom 360px of the canvas. The top 160px is also
              partially overlaid by the LinkedIn navigation bar and ghost menu in some views,
              so treat the first 160px as a no-text zone for critical information.
            </p>
          </section>

          <section className="max-w-3xl">
            <h2 className="text-lg font-bold text-white mb-4">Also Check</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/snapchat-safe-zone",           label: "Snapchat Spotlight Safe Zone" },
                { href: "/instagram-reels-safe-zone",    label: "Instagram Reels Safe Zone"    },
                { href: "/tiktok-safe-zone",             label: "TikTok Safe Zone"             },
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
