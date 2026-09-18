"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Capacitor } from "@capacitor/core";
import { waLink } from "@/config/contact";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
  </svg>
);

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/services", icon: BookOpen },
  { name: "Guidance", href: "/request-guidance", icon: Compass },
];

export default function FloatingNav() {
  const pathname = usePathname();

  const handleNavClick = () => {
    // Native app only — Capacitor Haptics throws in a browser (Facebook in-app etc).
    if (Capacitor.isNativePlatform()) {
      try { Haptics.impact({ style: ImpactStyle.Light }).catch(() => {}); } catch { /* ignore */ }
    }
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-50 md:hidden w-[calc(100%-1.5rem)] max-w-[360px] pointer-events-none"
    >
      <nav className="nav-3d-bar pointer-events-auto flex items-center justify-between rounded-full p-1.5 px-2 mx-auto w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-[74px] h-[50px] rounded-full transition-colors duration-300",
                isActive ? "text-white" : "text-[#F3E5C0]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="navbubble"
                  className="nav-3d-knob absolute inset-0 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className="w-[18px] h-[18px] mb-0.5 z-10 relative" strokeWidth={isActive ? 2.6 : 2.2} />
              <span className={cn("text-[9.5px] font-bold tracking-wider z-10 relative uppercase", isActive ? "text-white" : "text-[#F3E5C0]")}>{item.name}</span>
            </Link>
          );
        })}
        {/* WhatsApp — filled emerald pill so it reads as a clear action */}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleNavClick}
          className="relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-[74px] h-[50px] rounded-full text-white bg-gradient-to-b from-[#25D366] to-[#1EB955] shadow-[0_6px_16px_-4px_rgba(30,185,85,0.55),inset_0_1px_0_rgba(255,255,255,0.4)] active:scale-95 transition-transform"
        >
          <WhatsAppIcon />
          <span className="text-[9px] font-bold tracking-wider uppercase text-white mt-0.5">Chat</span>
        </a>
      </nav>
    </motion.div>
  );
}
