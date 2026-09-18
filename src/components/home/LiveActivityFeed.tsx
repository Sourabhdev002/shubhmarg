"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const activities = [
  { name: "Priya", city: "Mumbai", action: "received Kundli reading", time: "2 hours ago" },
  { name: "Rahul", city: "Bengaluru", action: "booked Prashna consultation", time: "45 min ago" },
  { name: "Anita", city: "Delhi", action: "Muhurta report delivered", time: "just now" },
  { name: "Vikram", city: "Pune", action: "received career guidance", time: "1 hour ago" },
  { name: "Sneha", city: "Hyderabad", action: "booked compatibility reading", time: "30 min ago" },
];

export default function LiveActivityFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % activities.length), 4000);
    return () => clearInterval(t);
  }, []);

  const a = activities[index];

  return (
    <div className="py-5 border-y border-[#B8860B]/20 overflow-hidden bg-[#F5EAD6]">
      <div className="max-w-4xl mx-auto px-5 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[13px] text-[#6B5A48] text-center"
          >
            <strong className="text-[#2A1810] font-semibold">{a.name}</strong> from {a.city} {a.action} — <span className="text-[#B8860B] font-semibold">{a.time}</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}