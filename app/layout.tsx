import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { clinic } from "@/lib/content";
import "./globals.css";

// Njihove grafike koriste didone serif sa jakim kontrastom poteza — Bodoni je
// bliži tome nego Playfair i deluje skuplje u velikim veličinama.
const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-family",
  display: "swap",
  weight: ["400", "500"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${clinic.name} ${clinic.city} — ginekologija, trudnoća i ultrazvuk`,
  description:
    "Savremena ginekološka ordinacija u Nišu. Vođenje trudnoće, 4D ultrazvuk, estetska i regenerativna ginekologija.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f8f6f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${display.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
