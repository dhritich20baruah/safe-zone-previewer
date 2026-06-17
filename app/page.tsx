import SafeZoneCanvas from "@/components/SafeZonecanvas";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-6 md:p-12">
      {/* Search Engine Optimized Header Section */}
      <header className="max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          Social Media <span className="text-blue-600">Safe-Zone</span> Hub
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Drag and drop your thumbnail or vertical video design below to verify
          that profile pictures, button overlays, and timestamps won't block
          your text.
        </p>
      </header>

      {/* The actual interactive engine */}
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
        <SafeZoneCanvas />
      </section>

      {/* Keyword-Rich Explainer Section for SEO positioning */}
      <footer className="max-w-4xl mt-16 text-slate-500 text-sm border-t border-slate-200 pt-6 text-center">
        <p>
          Optimized for standard dimensions: YouTube Thumbnails (16:9), TikTok &
          Instagram Reels (9:16).
        </p>
      </footer>
    </main>
  );
}
