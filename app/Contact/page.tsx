import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – Safe Zone Preview",
  description: "Get in touch with the Safe Zone Preview team. Reach out via email, LinkedIn, or GitHub.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="max-w-3xl w-full">

          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">Contact</p>
            <h1 className="text-4xl font-extrabold text-white mb-4">Get in Touch</h1>
            <p className="text-lg text-slate-400">
              Have a question, found a bug, or want to suggest a new platform? Reach out through
              any of the channels below.
            </p>
          </header>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            {/* Email */}
            <a
              href="mailto:YOUR_EMAIL@example.com"
              className="group flex flex-col items-center text-center bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 rounded-xl p-6 transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-700 group-hover:bg-blue-600 transition-colors mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-bold text-white mb-1">Email</h2>
              <p className="text-sm text-blue-400 group-hover:text-blue-300 transition-colors break-all">
                YOUR_EMAIL@example.com
              </p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/YOUR_LINKEDIN_HANDLE"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 rounded-xl p-6 transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-700 group-hover:bg-blue-600 transition-colors mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.869 0-2.155 1.46-2.155 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.608v5.588z"/>
                </svg>
              </div>
              <h2 className="font-bold text-white mb-1">LinkedIn</h2>
              <p className="text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                YOUR_LINKEDIN_HANDLE
              </p>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/YOUR_GITHUB_HANDLE"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 rounded-xl p-6 transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-700 group-hover:bg-blue-600 transition-colors mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h2 className="font-bold text-white mb-1">GitHub</h2>
              <p className="text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                YOUR_GITHUB_HANDLE
              </p>
            </a>

          </div>

          {/* Note */}
          <p className="mt-10 text-sm text-slate-500 text-center">
            Typical response time is 1–2 business days. For bug reports, please include your
            browser, OS, and the platform you were previewing.
          </p>

        </div>
      </main>
    </>
  );
}
