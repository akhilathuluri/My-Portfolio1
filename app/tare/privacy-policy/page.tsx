import type { Metadata } from "next";
import Link from "next/link";
import TareNav from "@/components/tare/tare-nav";
import TareFooter from "@/components/tare/tare-footer";
import TareStoreButtons from "@/components/tare/tare-store-buttons";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Database, 
  EyeOff, 
  CloudOff, 
  Lock, 
  BellRing, 
  FileCheck, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Mail,
  Smartphone,
  ExternalLink
} from "lucide-react";
import styles from "@/components/tare/tare.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Tare — 100% Local-First Personal Finance",
  description:
    "Tare is built with zero telemetry, zero servers, and total offline privacy by design. Read our comprehensive data sovereignty and privacy disclosures.",
  alternates: {
    canonical: "https://athuluriakhil.vercel.app/tare/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Tare — Private, Local-First Personal Finance",
    description:
      "Zero telemetry, zero servers, and 100% on-device data sovereignty. Official privacy policy for Tare.",
    url: "https://athuluriakhil.vercel.app/tare/privacy-policy",
    siteName: "Tare",
    type: "website",
    images: [
      {
        url: "/assets/tare-privacy-security.png",
        width: 1080,
        height: 2340,
        alt: "Tare Privacy and Security Specification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Tare — Private, Local-First Personal Finance",
    description:
      "Zero telemetry, zero servers, and 100% on-device data sovereignty. Official privacy policy for Tare.",
    images: ["/assets/tare-privacy-security.png"],
  },
};

export default function TarePrivacyPolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className={`${styles.tareContainer} min-h-screen w-full flex flex-col`}>
      <TareNav />

      <main className="flex-grow w-full pt-32 sm:pt-40 pb-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Breadcrumb & Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/tare"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Tare Launch Overview</span>
            </Link>

            <span className="text-xs font-mono text-neutral-500">
              Effective: {lastUpdated}
            </span>
          </div>

          {/* Document Header */}
          <div className="space-y-4 pb-12 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <ShieldCheck size={14} />
              <span>Zero-Telemetry Architectural Guarantee</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-neutral-100 leading-[1.08]">
              Tare Privacy Policy &amp; Data Sovereignty
            </h1>

            <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
              Tare is built around a single unshakeable premise: <strong className="text-neutral-200">your financial life belongs exclusively to you.</strong> We do not operate databases, collect email addresses, track behavior, or monetize your records.
            </p>
          </div>

          {/* 5 Core Pillars from In-App Specification */}
          <div className="my-12 p-6 sm:p-8 rounded-3xl bg-[#0e0e11] border border-white/10 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                In-App Privacy Specification (At a Glance)
              </h2>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">
                Verified On-Device
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                  <Database size={16} />
                  <span>100% Local-First Storage</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  All transactions, budgets, and accounts remain solely on your device inside an offline SQLite database.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                  <EyeOff size={16} />
                  <span>Zero Analytics &amp; Trackers</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  No third-party SDKs, tracking pixels, advertising IDs, or behavioral analytics are present in Tare.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                  <CloudOff size={16} />
                  <span>No Cloud Accounts or Servers</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Tare has no servers. No email, phone number, passwords, or personal identity are ever collected.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                  <Lock size={16} />
                  <span>AES-256 Encrypted Backups</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Exported .tare backups can be encrypted using industry-standard AES-256 with PBKDF2 key derivation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 sm:col-span-2">
                <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                  <BellRing size={16} />
                  <span>On-Device Detection Sandbox</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Transaction alert parsing runs strictly on-device. No notification text or balance data ever leaves your phone.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Legal and Technical Sections */}
          <div className="space-y-16 text-neutral-300 leading-relaxed text-sm sm:text-base">

            {/* Section 1 */}
            <section id="philosophy" className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-100 flex items-center gap-2">
                <span className="text-neutral-500 font-mono text-lg">01.</span>
                <span>The Philosophy of Tare</span>
              </h2>
              <blockquote className="p-4 rounded-xl bg-neutral-900/60 border-l-2 border-emerald-400 text-neutral-300 italic text-sm">
                &ldquo;Remove the noise. See the true number.&rdquo;
              </blockquote>
              <p>
                The name <strong>&ldquo;Tare&rdquo;</strong> comes from the physical and accounting concept of zeroing a scale to subtract the container&apos;s weight, revealing the exact net weight of what&apos;s inside.
              </p>
              <p>
                Modern financial applications are heavily burdened by container weight: predatory loans, upsells, invasive third-party telemetry, credit-score cross-selling, and central databases prone to security breaches. Tare eliminates all container weight by delivering an air-gapped, offline personal ledger.
              </p>
            </section>

            {/* Section 2 */}
            <section id="data-storage" className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-100 flex items-center gap-2">
                <span className="text-neutral-500 font-mono text-lg">02.</span>
                <span>Data Storage &amp; Collection (Zero Outbound Transmission)</span>
              </h2>
              <p>
                Tare does not operate an application backend, financial server, or cloud synchronization pipeline. All data generated during your use of Tare is stored exclusively in your device&apos;s sandboxed local storage:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400 text-sm">
                <li><strong className="text-neutral-200">Ledger Transactions:</strong> Amounts, dates, expense/income tags, merchant labels, and personal notes.</li>
                <li><strong className="text-neutral-200">Budget Configurations:</strong> Monthly caps, active budget categories, and over-budget thresholds.</li>
                <li><strong className="text-neutral-200">Category Mappings:</strong> Custom icons, sub-categories, and ranking structures.</li>
                <li><strong className="text-neutral-200">Analytical Aggregates:</strong> Cash flow calculations and date-range metrics computed dynamically on-device using integer minor-unit math.</li>
              </ul>
              <div className="p-4 rounded-2xl bg-[#0e0e11] border border-white/5 flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-mono text-neutral-400">
                  Total data sent to external servers: <strong className="text-neutral-200">0 bytes</strong>.
                </span>
              </div>
            </section>

            {/* Section 3 */}
            <section id="trackers" className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-100 flex items-center gap-2">
                <span className="text-neutral-500 font-mono text-lg">03.</span>
                <span>Zero Trackers, Advertising IDs, or Analytics SDKs</span>
              </h2>
              <p>
                Many apps claim to care about privacy while bundling silent telemetry SDKs. Tare contains:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 flex items-center gap-2 text-neutral-300">
                  <XCircle size={14} className="text-red-400 shrink-0" />
                  <span>No Google Analytics or Firebase</span>
                </div>
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 flex items-center gap-2 text-neutral-300">
                  <XCircle size={14} className="text-red-400 shrink-0" />
                  <span>No Meta / Facebook Pixel</span>
                </div>
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 flex items-center gap-2 text-neutral-300">
                  <XCircle size={14} className="text-red-400 shrink-0" />
                  <span>No Advertising IDs (IDFA / GAID)</span>
                </div>
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 flex items-center gap-2 text-neutral-300">
                  <XCircle size={14} className="text-red-400 shrink-0" />
                  <span>No Crash-Reporting Event Telemetry</span>
                </div>
              </div>
              <p className="text-xs text-neutral-400 pt-1">
                Your financial patterns, spending speed, merchant names, and balances are never profiled, logged, or monetized.
              </p>
            </section>

            {/* Section 4 */}
            <section id="permissions" className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-100 flex items-center gap-2">
                <span className="text-neutral-500 font-mono text-lg">04.</span>
                <span>Operating System Permissions Explained</span>
              </h2>
              <p>
                Tare requests only the minimum OS permissions necessary to provide its local utilities:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-neutral-200 font-semibold">
                      Bank &amp; UPI Notification Listener (`BIND_NOTIFICATION_LISTENER_SERVICE`)
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                      Optional User Opt-In
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    <strong>Purpose:</strong> Allows Tare to recognize transactional notifications (such as UPI debits or bank withdrawal alerts) and automatically pre-fill transaction amounts.
                    <br />
                    <strong>Protection:</strong> Parsing executes strictly in volatile device RAM within the local app sandbox. Notification text is immediately discarded after parsing. No message content, OTPs, or bank account balances are ever sent outside your device.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-neutral-200 font-semibold">
                      File &amp; Document Storage Access
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                      Scoped by System Picker
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    <strong>Purpose:</strong> Only activated when you explicitly trigger <code className="text-neutral-300 font-mono">Export .tare Backup</code> or <code className="text-neutral-300 font-mono">Import .tare Backup</code>. Tare uses the OS native file picker to read or save your chosen backup snapshot.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="backups" className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-100 flex items-center gap-2">
                <span className="text-neutral-500 font-mono text-lg">05.</span>
                <span>AES-256 Encrypted Backups &amp; Custody</span>
              </h2>
              <p>
                Because Tare never stores copies of your data on cloud servers, full data portability is provided through atomic <code className="text-neutral-200 font-mono">.tare</code> files:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400 text-sm">
                <li><strong className="text-neutral-200">Encryption Standard:</strong> When password protection is chosen, exported backups are encrypted with AES-256 using PBKDF2 key derivation.</li>
                <li><strong className="text-neutral-200">User Custody:</strong> Once exported, your backup file is solely in your possession. You can store it on an encrypted flash drive, personal storage, or transfer it to another device.</li>
                <li><strong className="text-neutral-200">Device Security Notice:</strong> Local storage provides protection against server breaches, but you remain responsible for physical phone passcode security and keeping your exported backup files safe.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="compliance" className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-100 flex items-center gap-2">
                <span className="text-neutral-500 font-mono text-lg">06.</span>
                <span>App Store &amp; Google Play Data Safety Disclosures</span>
              </h2>
              <p>
                For official App Store and Google Play Console declarations:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border border-white/10 rounded-2xl overflow-hidden">
                  <thead className="bg-white/5 text-neutral-300">
                    <tr>
                      <th className="p-3 border-b border-white/10">Data Safety Question</th>
                      <th className="p-3 border-b border-white/10">Official Response</th>
                      <th className="p-3 border-b border-white/10">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-400">
                    <tr>
                      <td className="p-3 font-semibold text-neutral-200">Data Collected?</td>
                      <td className="p-3 text-emerald-400">NO</td>
                      <td className="p-3">0 bytes collected by developer</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-neutral-200">Data Shared with 3rd Parties?</td>
                      <td className="p-3 text-emerald-400">NO</td>
                      <td className="p-3">Zero third-party integrations</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-neutral-200">Data Encrypted in Transit?</td>
                      <td className="p-3 text-neutral-300">N/A</td>
                      <td className="p-3">Data never leaves device sandbox</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-neutral-200">Account Deletion Mechanism?</td>
                      <td className="p-3 text-emerald-400">Instant</td>
                      <td className="p-3">No account exists; uninstalling deletes all records</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 7 */}
            <section id="deletion" className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-100 flex items-center gap-2">
                <span className="text-neutral-500 font-mono text-lg">07.</span>
                <span>User Rights &amp; Complete Data Erasure</span>
              </h2>
              <p>
                You retain complete, instantaneous control over your records at all times:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-400 text-sm">
                <li><strong className="text-neutral-200">Instant Purge:</strong> You may clear app data via system settings or uninstall the Tare app from your device. All SQLite tables, settings, and cached balances are immediately and permanently destroyed.</li>
                <li><strong className="text-neutral-200">No Deletion Requests Required:</strong> Because we never received your data in the first place, you do not need to submit &ldquo;Right to be Forgotten&rdquo; tickets or wait 30 days for server deletion cycles.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="contact" className="space-y-4 pt-8 border-t border-white/10">
              <h2 className="text-2xl font-semibold text-neutral-100 flex items-center gap-2">
                <span className="text-neutral-500 font-mono text-lg">08.</span>
                <span>Developer Contact &amp; Questions</span>
              </h2>
              <p>
                Tare is developed as an independent, privacy-first software project by <strong>Athuluri Akhil</strong>. If you have questions regarding this privacy policy or technical architecture:
              </p>
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase text-neutral-400">Direct Inquiries</span>
                  <div className="text-sm font-semibold text-neutral-200 mt-0.5">8309889800a@gmail.com</div>
                </div>
                <a
                  href="mailto:8309889800a@gmail.com?subject=Tare%20Privacy%20Inquiry"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors"
                >
                  <Mail size={14} />
                  <span>Contact Akhil</span>
                </a>
              </div>
            </section>

          </div>

          {/* Download & Closing CTAs */}
          <div className="mt-20 pt-12 border-t border-white/10 flex flex-col items-center text-center space-y-6">
            <h3 className="text-2xl font-semibold text-neutral-200">
              Experience Private Personal Finance
            </h3>
            <p className="text-xs font-mono text-neutral-400 max-w-md">
              Download Tare on your phone and take complete control of your financial records.
            </p>
            <TareStoreButtons />

            <div className="pt-4">
              <Link
                href="/tare"
                className="text-xs font-mono text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
              >
                Return to Tare Launch Page
              </Link>
            </div>
          </div>

        </div>
      </main>

      <TareFooter />
    </div>
  );
}
