import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-base font-extrabold tracking-tight text-white hover:text-blue-400 transition-colors"
        >
          Safe<span className="text-blue-400">Zone</span>Preview
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/privacy-policy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-slate-800"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
