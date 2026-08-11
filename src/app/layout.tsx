import type { Metadata } from "next";
import { Playfair_Display, Inter, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tiro = Tiro_Devanagari_Hindi({
  weight: "400",
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
});

export const metadata: Metadata = {
  title: "ShubhMarg — Traditional Vedic Guidance for Modern Life",
  description: "Personalized Vedic guidance and traditional spiritual services for modern life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${tiro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-ivory text-charcoal">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
