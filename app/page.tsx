import SafeZoneCanvas from "@/components/SafeZonecanvas";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center p-6 md:p-12 bg-slate-900">

        {/* ── Hero ── */}
        <header className="max-w-4xl text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-white">
            Free{" "}
            <span className="text-blue-400">Safe Zone Preview</span>{" "}
            Tool for TikTok, Instagram &amp; YouTube
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Upload your design and instantly preview the{" "}
            <strong className="text-slate-200">TikTok safe zone</strong>,{" "}
            <strong className="text-slate-200">Instagram Reels safe zone</strong>,{" "}
            <strong className="text-slate-200">IG Story safe zone</strong>, and{" "}
            <strong className="text-slate-200">YouTube Shorts safe zone</strong> — all in one
            place. No login, no watermark, completely free.
          </p>
        </header>

        {/* ── Canvas Tool ── */}
        <section
          aria-label="Safe zone preview canvas"
          className="w-full max-w-6xl bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6"
        >
          <SafeZoneCanvas />
        </section>

        {/* ── Platform Cards ── */}
        <section className="max-w-4xl w-full mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "TikTok Safe Zone",
              body: (
                <>
                  TikTok overlays your video with a right-side action bar (Like, Comment, Share)
                  and bottom caption text. Our{" "}
                  <strong className="text-slate-200">TikTok safe zone template</strong> preview
                  shows exactly which pixels are hidden so your key content stays visible.
                </>
              ),
            },
            {
              title: "Instagram Reels & Story Safe Zone",
              body: (
                <>
                  Instagram blocks the right side with reaction icons and the bottom with profile
                  info. Preview the{" "}
                  <strong className="text-slate-200">IG Reel safe zone</strong> and{" "}
                  <strong className="text-slate-200">Instagram Story safe zone</strong> before you
                  post to make sure no critical text is cut off.
                </>
              ),
            },
            {
              title: "YouTube Shorts Safe Zone",
              body: (
                <>
                  YouTube Shorts overlays a timestamp pill in the bottom-right corner. Use this
                  tool as a{" "}
                  <strong className="text-slate-200">YouTube Shorts safe zone</strong> checker to
                  keep your title text unobscured.
                </>
              ),
            },
            {
              title: "Create a Transparent Overlay Safe Zone Marking",
              body: (
                <>
                  Switch to <em>Safe-Zone Grid Only</em> mode to see clean dashed boundary lines —
                  perfect for exporting as a{" "}
                  <strong className="text-slate-200">transparent safe zone marking</strong> in
                  Canva, Figma, or Photoshop.
                </>
              ),
            },
          ].map(({ title, body }) => (
            <article
              key={title}
              className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm p-5"
            >
              <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
              <p className="text-sm text-slate-400">{body}</p>
            </article>
          ))}
        </section>

        {/* ── How to Use ── */}
        <section className="max-w-4xl w-full mt-10 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">
            How to Use the Safe Zone Preview Tool
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-400">
            <li>
              <strong className="text-slate-200">Select a platform</strong> — choose TikTok,
              Instagram Reels, or YouTube Thumbnail from the sidebar.
            </li>
            <li>
              <strong className="text-slate-200">Upload your design</strong> — drag &amp; drop or
              click to upload any PNG, JPG, or WebP file.
            </li>
            <li>
              <strong className="text-slate-200">Check the safe zone</strong> — the canvas
              instantly renders a realistic UI overlay so you can see hidden areas.
            </li>
            <li>
              <strong className="text-slate-200">Toggle grid mode</strong> — enable{" "}
              <em>Safe-Zone Grid Only</em> to display just the boundary lines for use as a template
              guide.
            </li>
          </ol>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-4xl w-full mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What is a safe zone in TikTok or Instagram?",
                a: "A safe zone is the area of your video frame that remains visible after the platform's native UI elements (action buttons, captions, navigation tabs) are rendered on top. Keeping important text and visuals inside the safe zone ensures nothing is obscured for viewers.",
              },
              {
                q: "Is this safe zone preview tool free to use?",
                a: "Yes — completely free, no account required. Your image is processed entirely in your browser and is never uploaded to a server.",
              },
              {
                q: "Which platforms does the safe zone checker support?",
                a: "Currently supported: TikTok safe zone (9:16), Instagram Reels / IG Reel safe zone (9:16), and YouTube Thumbnail / Shorts safe zone (16:9). Instagram Story safe zone dimensions match the Reels 9:16 format.",
              },
              {
                q: "Can I use this to create an Instagram safe zone template?",
                a: "Yes. Enable Safe-Zone Grid Only mode and screenshot the dashed boundary lines. Import them as a transparent overlay into Canva, Adobe Express, or Figma to create a reusable Instagram safe zone template or TikTok safe zone template.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm p-5 group"
              >
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                  {q}
                  <span className="ml-2 text-slate-500 group-open:rotate-180 transition-transform duration-200 text-lg leading-none">
                    ›
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-400">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── SEO Article ── */}
        <section className="max-w-4xl w-full mt-14 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">
            What Is a Safe Zone Preview — and Why Every Creator Needs One
          </h2>
          <p className="text-slate-400">
            If you have ever published a TikTok, Instagram Reel, or YouTube Short only to discover
            that a button is sitting right on top of your title text, you already understand the
            problem. Every social platform renders a layer of native UI elements — like and share
            buttons, profile handles, music attribution bars, and navigation tabs — directly over
            your video or image. Those elements do not move. Your content does not either. The
            result is that anything you place in the wrong area simply disappears behind the
            interface. A <strong className="text-slate-200">safe zone preview</strong> tool solves
            this before you post, not after.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Why Platform Safe Zones Differ</h3>
          <p className="text-slate-400">
            The tricky part is that each platform has a unique overlay layout. The{" "}
            <strong className="text-slate-200">TikTok safe zone</strong> must account for a tall
            right-side action stack (profile avatar, heart, comment, bookmark, and share icons) that
            runs from roughly the top third of the screen down to the audio disc near the bottom. At
            the same time, the bottom caption and hashtag area can consume up to 480 pixels of
            vertical space on a 1080×1920 canvas.
          </p>
          <p className="text-slate-400">
            The <strong className="text-slate-200">Instagram Reels safe zone</strong> and{" "}
            <strong className="text-slate-200">Instagram Story safe zone</strong> follow a similar
            9:16 layout but with a slightly smaller bottom margin — approximately 380 pixels — and a
            lighter icon treatment on the right side. What counts as safe for a TikTok upload is not
            always safe for an <strong className="text-slate-200">IG Reel safe zone</strong> or{" "}
            <strong className="text-slate-200">IG Story safe zone</strong>, which is why checking
            both separately matters if you cross-post content.
          </p>
          <p className="text-slate-400">
            The <strong className="text-slate-200">YouTube Shorts safe zone</strong> — and YouTube
            thumbnails more broadly — works on a 16:9 landscape canvas. The primary hazard here is
            the timestamp pill that YouTube stamps in the bottom-right corner. Thumbnail designers
            who place their video duration or a key stat in that corner routinely find it hidden
            behind the auto-generated timestamp. Previewing your thumbnail against the real overlay
            before uploading eliminates that mistake entirely.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            How This Safe Zone Preview Tool Works
          </h3>
          <p className="text-slate-400">
            This tool renders a high-fidelity, pixel-accurate simulation of each platform's native
            UI directly on top of your uploaded image. There is no guesswork — the overlay positions
            are based on real device measurements at 1080×1920 for vertical content and 1280×720 for
            YouTube thumbnails. You upload your design, select your platform, and see in under a
            second whether any critical element falls inside a hidden zone.
          </p>
          <p className="text-slate-400">
            For creators who want a reusable workflow, the <em>Safe-Zone Grid Only</em> mode strips
            away the simulated UI and shows just clean dashed boundary lines. This makes it easy to
            screenshot and import those lines into Canva, Figma, or Adobe Express as a{" "}
            <strong className="text-slate-200">transparent overlay safe zone marking</strong> —
            effectively giving you a permanent{" "}
            <strong className="text-slate-200">TikTok safe zone template</strong>,{" "}
            <strong className="text-slate-200">Instagram safe zone template</strong>, or{" "}
            <strong className="text-slate-200">Instagram Reel safe zone template</strong> you can
            reuse indefinitely.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            Who Should Use a Safe Zone Checker
          </h3>
          <p className="text-slate-400">
            Any creator who cares about the first impression their content makes should run a safe
            zone check before publishing. This is especially critical for designers creating branded
            templates for clients; agencies managing multiple creator accounts; small business owners
            who cannot afford a misaligned post to undermine a product launch; and editors
            repurposing landscape videos into vertical clips for TikTok or Instagram Stories. In
            every case, the cost of checking is zero, and the cost of not checking is a post that
            looks unprofessional to every single viewer who sees it.
          </p>
          <p className="text-slate-400">
            This <strong className="text-slate-200">safe zone preview</strong> tool runs entirely in
            your browser. Your images are never sent to a server, which means your unpublished
            content stays private. There is no account to create, no subscription to manage, and no
            watermark added to your work. Just upload, preview, and post with confidence.
          </p>
        </section>

        {/* ── Footer ── */}
        <footer className="max-w-4xl w-full mt-16 border-t border-slate-700 pt-8 pb-4">
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-5">
            {[
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Use" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-slate-600 text-center">
            Supports: YouTube Thumbnails (1280×720, 16:9) · TikTok Safe Zone (1080×1920, 9:16) ·
            Instagram Reels Safe Zone (1080×1920, 9:16) · IG Story Safe Zone (1080×1920, 9:16)
          </p>
          <p className="text-xs text-slate-600 text-center mt-2">
            Built for creators who want to design with confidence — no guessing, no cropped text.
          </p>
        </footer>
      </main>
    </>
  );
}
