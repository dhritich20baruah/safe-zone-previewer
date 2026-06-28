import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use – Safe Zone Preview",
  description: "Terms of use for Safe Zone Preview. Read the conditions for using this free social media safe zone checker tool.",
};

const LAST_UPDATED = "June 2026";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-900 flex flex-col items-center p-6 md:p-12">
        <div className="max-w-3xl w-full">

          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-4xl font-extrabold text-white mb-4">Terms of Use</h1>
            <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>
          </header>

          <div className="space-y-10 text-slate-400">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Acceptance of Terms</h2>
              <p>
                By accessing or using Safe Zone Preview ("the tool", "the site"), you agree to
                be bound by these Terms of Use. If you do not agree with any part of these
                terms, please discontinue use of the tool immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Description of Service</h2>
              <p>
                Safe Zone Preview is a free, browser-based tool that allows users to preview
                social media safe zone overlays for platforms including TikTok, Instagram Reels,
                Instagram Stories, YouTube Shorts, and YouTube Thumbnails. The tool is provided
                "as is" without any guarantee of accuracy, completeness, or fitness for a
                particular purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Permitted Use</h2>
              <p>You may use Safe Zone Preview for:</p>
              <ul className="space-y-2 mt-3">
                {[
                  "Personal creative projects and content production",
                  "Commercial design work for yourself or clients",
                  "Educational and research purposes",
                  "Creating reusable design templates based on the safe zone guidelines displayed",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Prohibited Use</h2>
              <p>You may not:</p>
              <ul className="space-y-2 mt-3">
                {[
                  "Attempt to reverse-engineer, scrape, or systematically extract data from the tool",
                  "Use the tool to upload, process, or distribute illegal, harmful, or infringing content",
                  "Misrepresent the tool or its output as an official product of any social media platform",
                  "Resell or sublicense access to the tool or its underlying code without permission",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Accuracy of Safe Zone Data</h2>
              <p>
                The safe zone dimensions and overlay positions displayed by this tool are based
                on publicly observed platform behaviour and best-effort measurements. Social
                media platforms may update their UI at any time without notice. We do not
                guarantee that the overlays shown will always exactly match what appears on a
                live device. Always verify critical designs on an actual device before
                publishing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Intellectual Property</h2>
              <p>
                All images you upload to Safe Zone Preview remain your property. We claim no
                ownership over any content you process using the tool. The tool's own source
                code, design, and written content are the property of the tool's creator and
                may not be copied or redistributed without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Disclaimer of Warranties</h2>
              <p>
                Safe Zone Preview is provided on an "as is" and "as available" basis without
                warranties of any kind, either express or implied, including but not limited
                to implied warranties of merchantability, fitness for a particular purpose, or
                non-infringement. We do not warrant that the tool will be uninterrupted,
                error-free, or free of harmful components.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, the creators of Safe Zone
                Preview shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages arising out of or related to your use of, or inability to
                use, the tool — including but not limited to loss of revenue, loss of data, or
                business interruption — even if advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Changes to These Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. The "Last updated" date
                at the top of this page will reflect any changes. Continued use of the tool
                after changes are posted constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with applicable
                law. Any disputes arising under these terms shall be subject to the exclusive
                jurisdiction of the courts in the relevant territory.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
              <p>
                Questions about these terms? Please reach out via the{" "}
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
