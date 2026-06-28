import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – Safe Zone Preview",
  description: "Learn about Safe Zone Preview — a free browser-based tool that helps creators check TikTok, Instagram Reels, and YouTube safe zones before publishing.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="max-w-3xl w-full">

          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">About</p>
            <h1 className="text-4xl font-extrabold text-white mb-4">
              What Is Safe Zone Preview?
            </h1>
            <p className="text-lg text-slate-400">
              A free, browser-based tool that helps content creators, designers, and social media
              managers verify that their designs stay inside the visible area on TikTok, Instagram
              Reels, Instagram Stories, and YouTube before publishing.
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-10">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Why This Tool Exists</h2>
              <p className="text-slate-400">
                Every social platform overlays native UI elements — action buttons, captions,
                subscribe bars, music attribution — directly on top of your content. These
                elements are invisible during design but very visible to your audience. A
                single misplaced headline can make an otherwise great post look broken.
              </p>
              <p className="text-slate-400 mt-3">
                Safe Zone Preview was built to eliminate that guesswork. Upload your design,
                pick your platform, and see exactly which areas are blocked — before you hit
                publish.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">How It Works</h2>
              <p className="text-slate-400">
                Everything runs in your browser. Your images are never uploaded to a server —
                they are processed locally using the HTML Canvas API. This means your
                unpublished creative assets stay completely private.
              </p>
              <p className="text-slate-400 mt-3">
                The safe zone overlays are based on real device measurements at standard
                resolutions: 1080×1920 for vertical content (TikTok, Reels, Shorts, Stories)
                and 1280×720 for YouTube thumbnails.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Supported Platforms</h2>
              <ul className="space-y-2 text-slate-400">
                {[
                  ["TikTok", "9:16 · 1080×1920 — right-side action bar, bottom caption area"],
                  ["Instagram Reels", "9:16 · 1080×1920 — reaction icons, profile info overlay"],
                  ["Instagram Stories", "9:16 · 1080×1920 — matches Reels safe zone dimensions"],
                  ["YouTube Shorts", "9:16 · 1080×1920 — like/share sidebar, bottom channel bar"],
                  ["YouTube Thumbnails", "16:9 · 1280×720 — auto-generated timestamp pill"],
                ].map(([platform, detail]) => (
                  <li key={platform} className="flex gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>
                      <strong className="text-slate-200">{platform}</strong> — {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Who It Is For</h2>
              <p className="text-slate-400">
                Safe Zone Preview is built for anyone who creates visual content for social
                media — solo creators, freelance designers, marketing agencies, and small
                business owners who manage their own accounts. If you design thumbnails,
                Reels, TikToks, or Shorts, this tool is for you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Built With</h2>
              <p className="text-slate-400">
                Next.js, Tailwind CSS, and the HTML Canvas API. No third-party analytics,
                no cookies, no tracking. Just a fast, private tool that does one thing well.
              </p>
            </section>

          </div>

          {/* CTA */}
          <div className="mt-14 p-6 bg-slate-800 rounded-xl border border-slate-700 text-center">
            <p className="text-slate-300 mb-4">Ready to check your design?</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
            >
              Open the Safe Zone Previewer →
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
