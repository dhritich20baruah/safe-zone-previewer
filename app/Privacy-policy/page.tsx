import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Safe Zone Preview",
  description: "Safe Zone Preview privacy policy. Learn how we handle your data — spoiler: we don't collect any.",
};

const LAST_UPDATED = "June 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="max-w-3xl w-full">

          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-4xl font-extrabold text-white mb-4">Privacy Policy</h1>
            <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>
          </header>

          <div className="space-y-10 text-slate-400">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Overview</h2>
              <p>
                Safe Zone Preview ("we", "our", "the tool") is committed to your privacy. This
                page explains what data we collect, what we do not collect, and how the tool
                operates. The short version: we collect nothing. Your images never leave your
                device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Image Processing</h2>
              <p>
                All image processing happens entirely in your browser using the HTML Canvas API.
                Images you upload are read locally by your browser and are never transmitted to
                any server operated by us or any third party. When you clear an image or close
                the browser tab, the image data is released from memory immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Data We Do Not Collect</h2>
              <ul className="space-y-2">
                {[
                  "Images or files you upload to the tool",
                  "Personal information such as name, email address, or location",
                  "Account credentials — there is no account system",
                  "Payment information — the tool is free",
                  "Behavioral analytics or heatmap data",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Cookies</h2>
              <p>
                Safe Zone Preview does not use cookies, local storage, or any form of persistent
                tracking technology. Each visit to the site is stateless.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Third-Party Services</h2>
              <p>
                The site may be hosted on a third-party infrastructure provider (such as Vercel).
                That provider may log standard server-level data such as IP address and request
                timestamps as part of normal web server operation. We do not have access to or
                control over those logs beyond what the provider exposes in aggregate metrics.
                Please refer to your hosting provider's privacy policy for more detail.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Children's Privacy</h2>
              <p>
                Safe Zone Preview is a general-purpose design tool and is not directed at children
                under the age of 13. We do not knowingly collect information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Changes to This Policy</h2>
              <p>
                If this policy changes materially, the "Last updated" date at the top of this page
                will be revised. We encourage you to review this page periodically. Continued use
                of the tool after any changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
              <p>
                If you have questions about this privacy policy, please reach out via the{" "}
                <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2">
                  Contact page
                </a>.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
