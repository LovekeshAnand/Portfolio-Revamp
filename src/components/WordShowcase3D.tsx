"use client";

import React, { useRef, useState, useEffect } from "react";

const WordShowcase3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      
      if (scrollHeight <= 0) return;

      const currentProgress = -rect.top / scrollHeight;
      setProgress(Math.max(0, Math.min(1, currentProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Map scroll progress into phases:
  // Phase 1 (0.0 to 0.25): Word 1 (OPTIMIZE) flies in from below and sits in the center.
  // Phase 2 (0.25 to 0.50): Word 2 (ENGINEER) slides in diagonally from bottom-right (X/Y) to the center,
  //                          while Word 1 (OPTIMIZE) exits by rotating inside (concave / negative depth) and fading out.
  // Phase 3 (0.50 to 0.75): Word 3 (ARCHITECT) slides in diagonally from bottom-right (X/Y) to the center,
  //                          while Word 2 (ENGINEER) exits by rotating outside (convex / positive depth) and fading out.
  // Phase 4 (0.75 to 1.00): Word 4 (DEPLOY) slides in diagonally from bottom-right (X/Y) to the center,
  //                          while Word 3 (ARCHITECT) exits by rotating outside (convex / positive depth) and fading out.

  // Calculations for translations and rotations per word:

  // Word 1: OPTIMIZE
  let w1X = 0;
  let w1Y = 0;
  let w1RotateX = 0;
  let w1RotateY = 0;
  let w1RotateZ = 0;
  let w1Z = 0;
  let w1Opacity = 1;

  if (progress <= 0.20) {
    // Entrance: come from below with a slight backward 3D tilt
    const t = progress / 0.20;
    w1Y = 80 * (1 - t);
    w1RotateX = 40 * (1 - t);
    w1Opacity = t;
  } else if (progress > 0.20 && progress <= 0.25) {
    // Active / Rest
    w1Y = 0;
    w1Opacity = 1;
  } else if (progress > 0.25 && progress <= 0.45) {
    // Exit: rotate inside (concave)
    const t = (progress - 0.25) / 0.20;
    w1RotateY = -75 * t;
    w1RotateX = 15 * t;
    w1Z = -26 * t;
    w1Opacity = 1 - t;
    w1X = -20 * t;
  } else {
    w1Opacity = 0;
  }

  // Word 2: ENGINEER
  let w2X = 80;
  let w2Y = 80;
  let w2RotateX = -15;
  let w2RotateY = 75;
  let w2RotateZ = 10;
  let w2Z = 0;
  let w2Opacity = 0;

  if (progress > 0.25 && progress <= 0.45) {
    // Entrance: diagonal from bottom-right, rotating from tilt into flat alignment
    const t = (progress - 0.25) / 0.20;
    w2X = 80 * (1 - t);
    w2Y = 80 * (1 - t);
    w2RotateY = 75 * (1 - t);
    w2RotateX = -15 * (1 - t);
    w2RotateZ = 10 * (1 - t);
    w2Opacity = t;
  } else if (progress > 0.45 && progress <= 0.50) {
    // Active / Rest
    w2X = 0;
    w2Y = 0;
    w2RotateX = 0;
    w2RotateY = 0;
    w2RotateZ = 0;
    w2Opacity = 1;
  } else if (progress > 0.50 && progress <= 0.70) {
    // Exit: rotate outside (convex, popping towards user)
    const t = (progress - 0.50) / 0.20;
    w2RotateY = 75 * t;
    w2RotateX = -15 * t;
    w2RotateZ = 10 * t;
    w2Z = 35 * t;
    w2Opacity = 1 - t;
    w2X = -20 * t;
  } else if (progress > 0.70) {
    w2Opacity = 0;
  }

  // Word 3: ARCHITECT
  let w3X = 80;
  let w3Y = 80;
  let w3RotateX = -15;
  let w3RotateY = 75;
  let w3RotateZ = 10;
  let w3Z = 0;
  let w3Opacity = 0;

  if (progress > 0.50 && progress <= 0.70) {
    // Entrance: diagonal from bottom-right, rotating into alignment
    const t = (progress - 0.50) / 0.20;
    w3X = 80 * (1 - t);
    w3Y = 80 * (1 - t);
    w3RotateY = 75 * (1 - t);
    w3RotateX = -15 * (1 - t);
    w3RotateZ = 10 * (1 - t);
    w3Opacity = t;
  } else if (progress > 0.70 && progress <= 0.75) {
    // Active / Rest
    w3X = 0;
    w3Y = 0;
    w3RotateX = 0;
    w3RotateY = 0;
    w3RotateZ = 0;
    w3Opacity = 1;
  } else if (progress > 0.75 && progress <= 0.95) {
    // Exit: rotate outside (convex, popping towards user)
    const t = (progress - 0.75) / 0.20;
    w3RotateY = 75 * t;
    w3RotateX = -15 * t;
    w3RotateZ = 10 * t;
    w3Z = 35 * t;
    w3Opacity = 1 - t;
    w3X = -20 * t;
  } else if (progress > 0.95) {
    w3Opacity = 0;
  }

  // Word 4: DEPLOY
  let w4X = 80;
  let w4Y = 80;
  let w4RotateX = -15;
  let w4RotateY = 75;
  let w4RotateZ = 10;
  let w4Z = 0;
  let w4Opacity = 0;

  if (progress > 0.75 && progress <= 0.95) {
    // Entrance: diagonal from bottom-right, rotating into alignment
    const t = (progress - 0.75) / 0.20;
    w4X = 80 * (1 - t);
    w4Y = 80 * (1 - t);
    w4RotateY = 75 * (1 - t);
    w4RotateX = -15 * (1 - t);
    w4RotateZ = 10 * (1 - t);
    w4Opacity = t;
  } else if (progress > 0.95) {
    // Active / Rest
    w4X = 0;
    w4Y = 0;
    w4RotateX = 0;
    w4RotateY = 0;
    w4RotateZ = 0;
    w4Opacity = 1;
  }

  // Premium transition style for high-end organic motion feel
  const transitionStyle = "opacity 0.15s ease-out, transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-transparent text-neutral-900 border-t border-neutral-200 z-20 overflow-visible">
      
      {/* Self-contained organic floating animation styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatWord {
          0% {
            transform: translateY(0px) rotate(0deg) rotateX(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(1.5deg) rotateX(2deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg) rotateX(0deg);
          }
        }
        .animate-float-1 { animation: floatWord 6s ease-in-out infinite; }
        .animate-float-2 { animation: floatWord 5.5s ease-in-out infinite; animation-delay: -1.5s; }
        .animate-float-3 { animation: floatWord 6.5s ease-in-out infinite; animation-delay: -3s; }
        .animate-float-4 { animation: floatWord 5.8s ease-in-out infinite; animation-delay: -4.5s; }
      `}} />

      {/* Pinned Sticky Section Wrapper */}
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 lg:px-12">
        
        {/* Subtle grid background matrix matching Navbar identity */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(14, 165, 233, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(14, 165, 233, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Section title header */}
        <div className="absolute top-24 left-8 lg:left-24 z-10 select-none">
          <span className="font-sans text-xs font-semibold text-blue-500 tracking-[0.3em] uppercase block mb-2">
            01.5 / COGNITIVE WEAVE
          </span>
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl font-bold tracking-tight text-neutral-950 uppercase">
            3D CORE METHODOLOGY
          </h2>
        </div>

        {/* â”€â”€ 3D CONTAINER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div 
          className="relative w-full max-w-7xl h-[450px] flex items-center justify-center z-10 overflow-visible"
          style={{ perspective: "2000px" }}
        >
          {/* Preserve 3D Context Wrapper */}
          <div 
            className="relative w-full h-[300px]"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* FACE 1 (OPTIMIZE) */}
            <div 
              className="absolute inset-0 flex items-center justify-center select-none"
              style={{
                backfaceVisibility: "hidden",
                transform: `translateX(${w1X}vw) translateY(${w1Y}vh) rotateY(${w1RotateY}deg) rotateX(${w1RotateX}deg) rotateZ(${w1RotateZ}deg) translateZ(${w1Z}vw)`,
                opacity: w1Opacity,
                transition: transitionStyle,
              }}
            >
              <div className="animate-float-1 w-full flex justify-center">
                <h1 className="font-[family-name:var(--font-bebas)] text-[19vw] lg:text-[18rem] md:text-[15rem] leading-none text-neutral-950 tracking-wider uppercase font-bold text-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                  OPTIMIZE
                </h1>
              </div>
            </div>

            {/* FACE 2 (ENGINEER) */}
            <div 
              className="absolute inset-0 flex items-center justify-center select-none"
              style={{
                backfaceVisibility: "hidden",
                transform: `translateX(${w2X}vw) translateY(${w2Y}vh) rotateY(${w2RotateY}deg) rotateX(${w2RotateX}deg) rotateZ(${w2RotateZ}deg) translateZ(${w2Z}vw)`,
                opacity: w2Opacity,
                transition: transitionStyle,
              }}
            >
              <div className="animate-float-2 w-full flex justify-center">
                <h1 className="font-[family-name:var(--font-bebas)] text-[18vw] lg:text-[17rem] md:text-[14rem] leading-none text-blue-500 tracking-wider uppercase font-bold text-center drop-shadow-[0_20px_50px_rgba(14,165,233,0.15)]">
                  ENGINEER
                </h1>
              </div>
            </div>

            {/* FACE 3 (ARCHITECT) */}
            <div 
              className="absolute inset-0 flex items-center justify-center select-none"
              style={{
                backfaceVisibility: "hidden",
                transform: `translateX(${w3X}vw) translateY(${w3Y}vh) rotateY(${w3RotateY}deg) rotateX(${w3RotateX}deg) rotateZ(${w3RotateZ}deg) translateZ(${w3Z}vw)`,
                opacity: w3Opacity,
                transition: transitionStyle,
              }}
            >
              <div className="animate-float-3 w-full flex justify-center">
                <h1 className="font-[family-name:var(--font-bebas)] text-[18vw] lg:text-[17rem] md:text-[14rem] leading-none text-neutral-900 tracking-wider uppercase font-bold text-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                  ARCHITECT
                </h1>
              </div>
            </div>

            {/* FACE 4 (DEPLOY) */}
            <div 
              className="absolute inset-0 flex items-center justify-center select-none"
              style={{
                backfaceVisibility: "hidden",
                transform: `translateX(${w4X}vw) translateY(${w4Y}vh) rotateY(${w4RotateY}deg) rotateX(${w4RotateX}deg) rotateZ(${w4RotateZ}deg) translateZ(${w4Z}vw)`,
                opacity: w4Opacity,
                transition: transitionStyle,
              }}
            >
              <div className="animate-float-4 w-full flex justify-center">
                <h1 className="font-[family-name:var(--font-bebas)] text-[18vw] lg:text-[17rem] md:text-[14rem] leading-none text-blue-500 tracking-wider uppercase font-bold text-center drop-shadow-[0_20px_50px_rgba(14,165,233,0.15)]">
                  DEPLOY
                </h1>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic instructions at the bottom of the sticky screen */}
        <div className="absolute bottom-24 flex flex-col items-center select-none">
          <span className="font-mono text-[9px] text-neutral-400 font-semibold uppercase tracking-[0.25em] animate-pulse">
            // INTERACTIVE SCROLL TELEMETRY ACTIVE
          </span>
          <div className="flex items-center gap-2 mt-4 font-mono text-[10px] text-neutral-400 font-semibold tracking-widest uppercase">
            <span className={`${progress <= 0.25 ? "text-blue-500 font-bold" : ""}`}>1. INCEPTION</span>
            <span>â†’</span>
            <span className={`${progress > 0.25 && progress <= 0.50 ? "text-blue-500 font-bold" : ""}`}>2. ALIGN</span>
            <span>â†’</span>
            <span className={`${progress > 0.50 && progress <= 0.75 ? "text-blue-500 font-bold" : ""}`}>3. INTEGRATE</span>
            <span>â†’</span>
            <span className={`${progress > 0.75 && progress <= 0.95 ? "text-blue-500 font-bold" : ""}`}>4. ROTATE</span>
            <span>â†’</span>
            <span className={`${progress > 0.95 ? "text-blue-500 font-bold" : ""}`}>5. DISPATCH</span>
          </div>
        </div>

      </section>

    </div>
  );
};

export default WordShowcase3D;

