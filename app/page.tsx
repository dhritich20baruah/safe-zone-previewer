import SafeZoneCanvas from "@/components/SafeZonecanvas";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-6 md:p-12">
      {/* ── Hero / H1 Section ── */}
      <header className="max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          Free{" "}
          <span className="text-blue-600">Safe Zone Preview</span>{" "}
          Tool for TikTok, Instagram &amp; YouTube
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Upload your design and instantly preview the{" "}
          <strong>TikTok safe zone</strong>,{" "}
          <strong>Instagram Reels safe zone</strong>,{" "}
          <strong>IG Story safe zone</strong>, and{" "}
          <strong>YouTube Shorts safe zone</strong> — all in one place. No
          login, no watermark, completely free.
        </p>
      </header>

      {/* ── Interactive Safe Zone Previewer ── */}
      <section
        aria-label="Safe zone preview canvas"
        className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-slate-100 p-6"
      >
        <SafeZoneCanvas />
      </section>

      {/* ── Platform Guide Section (keyword-rich, scannable) ── */}
      <section className="max-w-4xl w-full mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <article className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            TikTok Safe Zone
          </h2>
          <p className="text-sm text-slate-600">
            TikTok overlays your video with a right-side action bar (Like,
            Comment, Share) and bottom caption text. Our{" "}
            <strong>TikTok safe zone template</strong> preview shows exactly
            which pixels are hidden so your key content stays visible.
          </p>
        </article>

        <article className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            Instagram Reels &amp; Story Safe Zone
          </h2>
          <p className="text-sm text-slate-600">
            Instagram blocks the right side with reaction icons and the bottom
            with profile info. Preview the{" "}
            <strong>IG Reel safe zone</strong> and{" "}
            <strong>Instagram Story safe zone</strong> before you post to make
            sure no critical text is cut off.
          </p>
        </article>

        <article className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            YouTube Shorts Safe Zone
          </h2>
          <p className="text-sm text-slate-600">
            YouTube Shorts overlays a timestamp pill in the bottom-right corner
            of thumbnails. Use this tool as a{" "}
            <strong>YouTube Shorts safe zone</strong> checker to keep your
            title text unobscured.
          </p>
        </article>

        <article className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            Create a Transparent Overlay Safe Zone Marking
          </h2>
          <p className="text-sm text-slate-600">
            Switch to <em>Safe-Zone Grid Only</em> mode to see a clean dashed
            boundary overlay — perfect for exporting and layering as a{" "}
            <strong>transparent safe zone marking</strong> in Canva, Figma,
            or Photoshop.
          </p>
        </article>
      </section>

      {/* ── How to Use (FAQ / instructional content for SEO) ── */}
      <section className="max-w-4xl w-full mt-10 bg-slate-50 rounded-xl p-6 border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          How to Use the Safe Zone Preview Tool
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
          <li>
            <strong>Select a platform</strong> — choose TikTok, Instagram
            Reels, or YouTube Thumbnail from the sidebar.
          </li>
          <li>
            <strong>Upload your design</strong> — drag &amp; drop or click to
            upload any PNG, JPG, or WebP file.
          </li>
          <li>
            <strong>Check the safe zone</strong> — the canvas instantly renders
            a realistic UI overlay so you can see hidden areas.
          </li>
          <li>
            <strong>Toggle grid mode</strong> — enable <em>Safe-Zone Grid
            Only</em> to display just the boundary lines for use as a template
            guide.
          </li>
        </ol>
      </section>

      {/* ── FAQ Schema-Ready Section ── */}
      <section className="max-w-4xl w-full mt-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <summary className="font-semibold text-slate-700 cursor-pointer">
              What is a safe zone in TikTok or Instagram?
            </summary>
            <p className="mt-2 text-sm text-slate-600">
              A safe zone is the area of your video frame that remains visible
              after the platform&apos;s native UI elements (action buttons,
              captions, navigation tabs) are rendered on top. Keeping important
              text and visuals inside the safe zone ensures nothing is obscured
              for viewers.
            </p>
          </details>
          <details className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <summary className="font-semibold text-slate-700 cursor-pointer">
              Is this safe zone preview tool free to use?
            </summary>
            <p className="mt-2 text-sm text-slate-600">
              Yes — completely free, no account required. Your image is
              processed entirely in your browser and is never uploaded to a
              server.
            </p>
          </details>
          <details className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <summary className="font-semibold text-slate-700 cursor-pointer">
              Which platforms does the safe zone checker support?
            </summary>
            <p className="mt-2 text-sm text-slate-600">
              Currently supported: <strong>TikTok safe zone</strong> (9:16),{" "}
              <strong>Instagram Reels / IG Reel safe zone</strong> (9:16), and{" "}
              <strong>YouTube Thumbnail / Shorts safe zone</strong> (16:9).
              Instagram Story safe zone dimensions match the Reels 9:16 format.
            </p>
          </details>
          <details className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <summary className="font-semibold text-slate-700 cursor-pointer">
              Can I use this to create an Instagram safe zone template?
            </summary>
            <p className="mt-2 text-sm text-slate-600">
              Yes. Enable <em>Safe-Zone Grid Only</em> mode and take a
              screenshot of the dashed boundary lines. You can then import
              those lines as a transparent overlay into Canva, Adobe Express,
              or Figma to create a reusable{" "}
              <strong>Instagram safe zone template</strong> or{" "}
              <strong>TikTok safe zone template</strong>.
            </p>
          </details>
        </div>
      </section>

      {/* ── 600-word SEO Article ── */}
      <section className="max-w-4xl w-full mt-14 prose prose-slate prose-sm sm:prose-base">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          What Is a Safe Zone Preview — and Why Every Creator Needs One
        </h2>

        <p className="text-slate-600">
          If you have ever published a TikTok, Instagram Reel, or YouTube Short
          only to discover that a button is sitting right on top of your title
          text, you already understand the problem. Every social platform
          renders a layer of native UI elements — like and share buttons,
          profile handles, music attribution bars, and navigation tabs — directly
          over your video or image. Those elements do not move. Your content
          does not either. The result is that anything you place in the wrong
          area simply disappears behind the interface. A <strong>safe zone
          preview</strong> tool solves this before you post, not after.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">
          Why Platform Safe Zones Differ
        </h3>
        <p className="text-slate-600">
          The tricky part is that each platform has a unique overlay layout.
          The <strong>TikTok safe zone</strong> must account for a tall
          right-side action stack (profile avatar, heart, comment, bookmark, and
          share icons) that runs from roughly the top third of the screen down
          to the audio disc near the bottom. At the same time, the bottom
          caption and hashtag area can consume up to 480 pixels of vertical
          space on a 1080×1920 canvas. That is a significant portion of your
          frame.
        </p>
        <p className="text-slate-600 mt-3">
          The <strong>Instagram Reels safe zone</strong> and{" "}
          <strong>Instagram Story safe zone</strong> follow a similar 9:16
          layout but with a slightly smaller bottom margin — approximately 380
          pixels — and a lighter icon treatment on the right side. What counts
          as safe for a TikTok upload is not always safe for an{" "}
          <strong>IG Reel safe zone</strong> or{" "}
          <strong>IG Story safe zone</strong>, which is why checking both
          separately matters if you cross-post content.
        </p>
        <p className="text-slate-600 mt-3">
          The <strong>YouTube Shorts safe zone</strong> — and YouTube thumbnails
          more broadly — works on a 16:9 landscape canvas rather than a vertical
          one. The primary hazard here is the timestamp pill that YouTube stamps
          in the bottom-right corner. Thumbnail designers who place their video
          duration or a key stat in that corner routinely find it hidden behind
          the auto-generated timestamp. Previewing your thumbnail against the
          real overlay before uploading eliminates that mistake entirely.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">
          How This Safe Zone Preview Tool Works
        </h3>
        <p className="text-slate-600">
          This tool renders a high-fidelity, pixel-accurate simulation of each
          platform's native UI directly on top of your uploaded image. There is
          no guesswork — the overlay positions are based on real device
          measurements at 1080×1920 for vertical content and 1280×720 for
          YouTube thumbnails. You upload your design, select your platform, and
          see in under a second whether any critical element falls inside a
          hidden zone.
        </p>
        <p className="text-slate-600 mt-3">
          For creators who want a reusable workflow, the{" "}
          <em>Safe-Zone Grid Only</em> mode strips away the simulated UI and
          shows just clean dashed boundary lines. This makes it easy to
          screenshot and import those lines into Canva, Figma, or Adobe Express
          as a <strong>transparent overlay safe zone marking</strong>. Once it
          is in your design tool as a locked layer, every future thumbnail or
          Reel you create will automatically respect the safe boundaries —
          effectively giving you a permanent{" "}
          <strong>TikTok safe zone template</strong>,{" "}
          <strong>Instagram safe zone template</strong>, or{" "}
          <strong>Instagram Reel safe zone template</strong> you can reuse
          indefinitely.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">
          Who Should Use a Safe Zone Checker
        </h3>
        <p className="text-slate-600">
          Any creator who cares about the first impression their content makes
          should run a safe zone check before publishing. This is especially
          critical for: designers creating branded templates for clients;
          agencies managing multiple creator accounts at once; small business
          owners running their own social media who cannot afford a
          misaligned post to undermine a product launch; and editors
          repurposing landscape videos into vertical clips for TikTok or
          Instagram Stories. In every case, the cost of checking is zero, and
          the cost of not checking is a post that looks unprofessional to every
          single viewer who sees it.
        </p>
        <p className="text-slate-600 mt-3">
          This <strong>safe zone preview</strong> tool runs entirely in your
          browser. Your images are never sent to a server, which means your
          unpublished content stays private. There is no account to create, no
          subscription to manage, and no watermark added to your work. Just
          upload, preview, and post with confidence.
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="max-w-4xl w-full mt-16 text-slate-400 text-xs border-t border-slate-200 pt-6 text-center">
        <p>
          Safe Zone Preview supports standard content dimensions: YouTube
          Thumbnails (1280×720, 16:9), TikTok Safe Zone (1080×1920, 9:16),
          Instagram Reels Safe Zone (1080×1920, 9:16), and IG Story Safe Zone
          (1080×1920, 9:16).
        </p>
        <p className="mt-2">
          Built for creators who want to design with confidence — no guessing,
          no cropped text.
        </p>
      </footer>
    </main>
  );
}
