import type { Metadata } from "next";
import TareNav from "@/components/tare/tare-nav";
import TareHero from "@/components/tare/tare-hero";
import TareShowcase from "@/components/tare/tare-showcase";
import TarePrivacy from "@/components/tare/tare-privacy";
import TareReportsSection from "@/components/tare/tare-reports-section";
import TareCta from "@/components/tare/tare-cta";
import TareFooter from "@/components/tare/tare-footer";
import styles from "@/components/tare/tare.module.css";

export const metadata: Metadata = {
  title: "Tare — Private, Local-First Personal Finance",
  description:
    "A privacy-first personal finance app for tracking expenses, income, budgets, and spending insights. Your financial data stays on your device.",
  alternates: {
    canonical: "https://athuluriakhil.vercel.app/tare",
  },
  openGraph: {
    title: "Tare — Private, Local-First Personal Finance",
    description:
      "A privacy-first personal finance app for tracking expenses, income, budgets, and spending insights. Your financial data stays on your device.",
    url: "https://athuluriakhil.vercel.app/tare",
    siteName: "Tare",
    type: "website",
    images: [
      {
        url: "/assets/tare-ledger.png",
        width: 1080,
        height: 2340,
        alt: "Tare — Private, Local-First Personal Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tare — Private, Local-First Personal Finance",
    description:
      "A privacy-first personal finance app for tracking expenses, income, budgets, and spending insights. Your financial data stays on your device.",
    images: ["/assets/tare-ledger.png"],
  },
};

export default function TarePage() {
  return (
    <div className={`${styles.tareContainer} min-h-screen w-full flex flex-col`}>
      <TareNav />
      <main className="flex-grow w-full">
        <TareHero />
        <TareShowcase />
        <TarePrivacy />
        <TareReportsSection />
        <TareCta />
      </main>
      <TareFooter />
    </div>
  );
}
