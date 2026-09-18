import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MetaPixel from "@/components/analytics/MetaPixel";
import Clarity from "@/components/analytics/Clarity";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FloatingNav from "@/components/layout/FloatingNav";
import SmoothScroller from "@/components/layout/SmoothScroller";
import MagneticCursor from "@/components/layout/MagneticCursor";
import StickyGuidanceCta from "@/components/layout/StickyGuidanceCta";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Chatbot from "@/components/layout/Chatbot";
import SacredLiveSankalpTicker from "@/components/shared/SacredLiveSankalpTicker";
import ChromeGate from "@/components/layout/ChromeGate";
import FestivalGreeting from "@/components/shared/FestivalGreeting";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { getTodayEvent } from "@/lib/calendar";

export const viewport: Viewport = {
  themeColor: "#FBF6EC",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/shubhmarg-favicon-32.png", sizes: "32x32" },
      { url: "/icons/shubhmarg-favicon-48.png", sizes: "48x48" },
    ],
    apple: "/icons/shubhmarg-apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ShubhMarg",
  },
  metadataBase: new URL("https://shubhmarg.com"),
  title: "ShubhMarg — Traditional Vedic Guidance for Modern Life",
  description: "Personalized Vedic guidance and traditional spiritual services for modern life.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ShubhMarg — Traditional Vedic Guidance for Modern Life",
    description: "Personalized Vedic guidance and traditional spiritual services for modern life.",
    url: "https://shubhmarg.com",
    type: "website",
  },
  twitter: {
    title: "ShubhMarg — Traditional Vedic Guidance for Modern Life",
    description: "Personalized Vedic guidance and traditional spiritual services for modern life.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Today's calendar festival (if any) drives the celebratory greeting popup.
  const todayEvent = await getTodayEvent();
  return (
    <html lang="en" className={`h-full antialiased ${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-full font-sans bg-[#FBF6EC] text-[#2A1810] relative selection:bg-[#E8791E]/25 selection:text-[#C25E10]">
        <LanguageProvider>
          <AuthProvider>
          <div className="flex flex-col min-h-screen w-full overflow-x-clip relative">
            <SmoothScroller>
              <MetaPixel />
              <Clarity />
              <MagneticCursor />
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <ChromeGate>
                <FloatingNav />
                <StickyGuidanceCta />
                <SacredLiveSankalpTicker />
                <WhatsAppButton />
                <Footer />
              </ChromeGate>
              <Chatbot />
            </SmoothScroller>
          </div>
          <FestivalGreeting event={todayEvent} />
          <Analytics />
          <SpeedInsights />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}