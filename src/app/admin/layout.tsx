import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import Link from "next/link";
import { LayoutDashboard, MessageSquare, Calendar } from "lucide-react";
import * as motion from "framer-motion/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col pb-16 md:pb-0">
      <header className="bg-white border-b border-brand-gold/20 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-8">
              <span className="text-lg font-bold text-brand-maroon font-serif tracking-wide">ShubhMarg Admin</span>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-2">
                <Link
                  href="/admin/guidance-requests"
                  className="text-brand-charcoal/80 hover:text-brand-maroon hover:bg-brand-saffron/5 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Guidance Requests
                </Link>
                <Link
                  href="/admin/support-requests"
                  className="text-brand-charcoal/80 hover:text-brand-maroon hover:bg-brand-saffron/5 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  Support Requests
                </Link>
                <Link
                  href="/admin/calendar"
                  className="text-brand-charcoal/80 hover:text-brand-maroon hover:bg-brand-saffron/5 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  Calendar
                </Link>
              </nav>
            </div>
            
            <div className="hidden md:flex">
               <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold-dark">
                 Dashboard
               </span>
            </div>
          </div>
        </div>
      </header>

      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1"
      >
        {children}
      </motion.main>
      
      {/* Mobile Bottom Nav */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brand-gold/20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30 flex justify-around items-center h-16 px-4"
      >
        <Link 
          href="/admin/guidance-requests" 
          className="flex flex-col items-center justify-center w-full h-full text-brand-charcoal/60 hover:text-brand-maroon active:text-brand-maroon transition-colors"
        >
          <LayoutDashboard className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium tracking-wide uppercase">Guidance</span>
        </Link>
        <Link 
          href="/admin/support-requests" 
          className="flex flex-col items-center justify-center w-full h-full text-brand-charcoal/60 hover:text-brand-maroon active:text-brand-maroon transition-colors relative"
        >
          <MessageSquare className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium tracking-wide uppercase">Support</span>
        </Link>
        <Link 
          href="/admin/calendar" 
          className="flex flex-col items-center justify-center w-full h-full text-brand-charcoal/60 hover:text-brand-maroon active:text-brand-maroon transition-colors relative"
        >
          <Calendar className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium tracking-wide uppercase">Calendar</span>
        </Link>
      </motion.nav>
    </div>
  );
}
