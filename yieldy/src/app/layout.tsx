import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yieldy — Certified Refurbished Enterprise Tech | Circular ITAD",
  description: "Enterprise-grade refurbished laptops & workstations. Blancco data-wiped, 50-point tested, 1-year warranty. Save up to 70% on ThinkPads, Latitudes, EliteBooks & MacBooks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body className="min-h-screen bg-neutral-50 text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
