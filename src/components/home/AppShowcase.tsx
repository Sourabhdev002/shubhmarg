import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function AppShowcase() {
  return (
    <div className="hidden md:block">
    <section 
      className="relative overflow-hidden bg-brand-ivory py-24 sm:py-32 border-b-8 border-brand-maroon/20 perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #6B1C23 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <SectionHeading 
            title="Guidance anywhere you go."
            subheading="Cross-Platform Experience"
            subtitle="Whether at your desk or on the move, ShubhMarg offers a seamless, beautiful digital sanctuary across all your devices."
            align="center"
          />
        </div>

        <div className="relative mx-auto max-w-5xl h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center transform-style-3d group">
          
          {/* Desktop Centerpiece */}
          <div
            className="absolute z-10 w-[80%] md:w-[70%] max-w-[800px] shadow-2xl rounded-lg overflow-hidden border border-brand-gold/20 transition-transform duration-700 ease-out hover:scale-[1.02]"
          >
            <div className="relative w-full pb-[100%] md:pb-[75%]"> {/* Aspect ratio container */}
              <Image 
                src="/images/desktop_mockup.jpg" 
                alt="ShubhMarg on Desktop" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 70vw"
                priority
              />
            </div>
          </div>

          {/* iPhone Floating Left */}
          <div
            className="absolute z-20 left-[5%] md:left-[10%] w-[35%] md:w-[25%] max-w-[300px] shadow-2xl rounded-[15%] overflow-hidden border border-brand-gold/30 bg-brand-ivory -rotate-6 -translate-y-8 transition-transform duration-700 ease-out hover:scale-[1.05] hover:-translate-y-12 hover:rotate-0"
          >
            <div className="relative w-full pb-[100%]">
              <Image 
                src="/images/iphone_mockup.jpg" 
                alt="ShubhMarg on iPhone" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 35vw, 25vw"
              />
            </div>
          </div>

          {/* Android Floating Right */}
          <div
            className="absolute z-20 right-[5%] md:right-[10%] w-[35%] md:w-[25%] max-w-[300px] shadow-2xl rounded-[15%] overflow-hidden border border-brand-gold/30 bg-brand-ivory rotate-6 translate-y-8 transition-transform duration-700 ease-out hover:scale-[1.05] hover:translate-y-4 hover:rotate-0"
          >
            <div className="relative w-full pb-[100%]">
              <Image 
                src="/images/android_mockup.jpg" 
                alt="ShubhMarg on Android" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 35vw, 25vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
    </div>
  );
}
