"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const words = [
  "THINK",
  "DESIGN",
  "DEVELOP",
  "CRAFT",
  "OBSESS",
  "CONSTRAINTS",
  "LOVEKESH ANAND"
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isExit, setIsExit] = useState<boolean>(false);
  const [isDestroyed, setIsDestroyed] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (wordIndex < words.length - 1) {
      // Dynamic timing weight: let constraints stand out slightly longer
      const delay = words[wordIndex] === "CONSTRAINTS" ? 380 : 260;
      const timer = setTimeout(() => {
        setWordIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Hold your name centered for maximum impact as the preloader climax
      const timer = setTimeout(() => {
        setIsExit(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [wordIndex]);

  // Handle premium GSAP Liquid morph curtain exit
  useEffect(() => {
    if (!isExit || !containerRef.current || !svgPathRef.current) return;

    const initialPath = "M 0 0 Q 50 0 100 0 V 100 H 0 Z";
    const curvedPath = "M 0 0 Q 50 85 100 0 V 100 H 0 Z";
    const finalPath = "M 0 0 Q 50 0 100 0 V 100 H 0 Z";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDestroyed(true);
        onComplete();
      }
    });

    // 1. Pull the center of the preloader curtain bottom downwards to create elastic surface tension
    tl.to(svgPathRef.current, {
      attr: { d: curvedPath },
      duration: 0.38,
      ease: "power2.out"
    })
    // 2. Slide the entire preloader container up out of the viewport
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.95,
      ease: "power4.inOut"
    }, 0)
    // 3. Snap the curve back to flat as it gains exit velocity
    .to(svgPathRef.current, {
      attr: { d: finalPath },
      duration: 0.55,
      ease: "power3.inOut"
    }, 0.38);

  }, [isExit, onComplete]);

  if (isDestroyed) return null;

  const activeWord = words[wordIndex];
  
  // Highlight "CONSTRAINTS" and your name in warm orange to coordinate branding
  const isSpecialWord = activeWord === "CONSTRAINTS" || activeWord === "LOVEKESH ANAND";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex flex-col justify-between p-8 md:p-16 bg-neutral-950 text-white select-none pointer-events-none"
    >
      {/* ── Subtle warm orange background grid mask lines ────────────────────────── */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(249, 115, 22, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
        }}
      />

      {/* ── Top Grid Framing ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-between items-center w-full font-sans text-xs font-medium text-neutral-500 tracking-[0.35em] uppercase">
        <span>LOVEKESH ANAND</span>
        <span className="hidden sm:inline">STAGE: SYSTEM_INITIALIZE</span>
      </div>

      {/* ── Centering Masterpiece Word Reveal ─────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center justify-center overflow-hidden py-10">
        <h2 
          key={wordIndex}
          className={`font-[family-name:var(--font-bebas)] text-[clamp(2.5rem,10.5vw,10.5rem)] font-normal uppercase leading-none tracking-[0.05em] text-center select-none animate-word-reveal transition-colors duration-300 ${
            isSpecialWord 
              ? "text-orange-500" 
              : "text-white"
          }`}
          style={{
            // Give your name a sharp flat offset shadow matching the Hero section!
            textShadow: activeWord === "LOVEKESH ANAND" 
              ? "4px 4px 0px rgba(249, 115, 22, 0.25)" 
              : "none"
          }}
        >
          {activeWord}
        </h2>
      </div>

      {/* ── Bottom Grid Framing ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-between items-center w-full font-sans text-xs font-medium text-neutral-500 tracking-[0.35em] uppercase">
        <span>CRAFTING INTERFACES</span>
        <span>NEW DELHI, INDIA</span>
      </div>

      {/* â”€â”€ Dynamic SVG curtain curve tail â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-[12vh] overflow-visible pointer-events-none fill-neutral-950 translate-y-[99%]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path 
          ref={svgPathRef} 
          d="M 0 0 Q 50 0 100 0 V 100 H 0 Z" 
        />
      </svg>

    </div>
  );
};

export default Preloader;

