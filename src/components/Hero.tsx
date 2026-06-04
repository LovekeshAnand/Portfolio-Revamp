"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GrainGradient } from "@paper-design/shaders-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".hero-reveal-line", {
      y: "0%",
      duration: 1.15,
      stagger: 0.1,
      delay: 0.1,
    });

    tl.fromTo(
      ".hero-reveal-fade",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
      "-=0.65"
    );

    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-transparent flex flex-col justify-center pt-16 select-none overflow-hidden"
    >
      {/* Grain Gradient Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {inView && (
          <GrainGradient
            style={{ height: "100%", width: "100%" }}
            colorBack="hsl(0, 0%, 0%)"
            softness={0.76}
            intensity={0.45}
            noise={0}
            shape="corners"
            offsetX={0}
            offsetY={0}
            scale={1}
            rotation={0}
            speed={1}
            colors={["hsl(14, 100%, 57%)", "hsl(45, 100%, 51%)", "hsl(340, 82%, 52%)"]}
          />
        )}
      </div>

      {/* Subtle vertical guide lines */}
      <div className="absolute left-[8%] inset-y-0 border-l border-orange-500/10 z-0 pointer-events-none hidden md:block" />
      <div className="absolute right-[8%] inset-y-0 border-l border-orange-500/10 z-0 pointer-events-none hidden md:block" />

      {/* ── Name wordmark — top left ── */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-10 select-none">
        <span className="font-[family-name:var(--font-bebas)] text-white/80 tracking-[0.18em] uppercase text-sm md:text-base leading-none">
          Lovekesh Anand
        </span>
      </div>

      {/* ── Email address — bottom left ── */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 z-10 font-mono text-sm md:text-base text-white tracking-wider hero-reveal-fade opacity-0 select-text">
        <a 
          href="mailto:lovekeshanand6@gmail.com"
          className="hover:text-sky-400 transition-colors duration-300 flex items-center gap-2.5 cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)] animate-pulse shrink-0" />
          <span>lovekeshanand6@gmail.com</span>
        </a>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[88%] mx-auto flex flex-col items-center text-center -mt-8 md:-mt-16">

        {/* Main headline — two lines only */}
        <h1
          ref={parallaxRef}
          className="font-[family-name:var(--font-instrument)] font-normal text-white w-full leading-[1.12] tracking-[-0.01em] mb-0"
          style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.4rem)" }}
        >
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="hero-reveal-line block translate-y-[105%] text-white">
              Full-stack engineer crafting
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="hero-reveal-line block translate-y-[105%] text-white">
              scalable systems &amp; precise interfaces.
            </span>
          </span>
        </h1>

        {/* CTAs */}
        <div className="hero-reveal-fade opacity-0 flex flex-wrap items-center justify-center gap-4 mt-12">
          <a
            href="/projects"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-neutral-950 border border-white/10 text-white text-sm font-semibold tracking-wider uppercase overflow-hidden transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] hover:scale-[1.02]"
          >
            {/* Ambient Background Glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Tech grid overlay */}
            <span className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Glowing active dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse shrink-0" />
            
            <span className="relative z-10">View My Work</span>
            <svg 
              className="relative z-10 w-4 h-4 text-orange-500 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 16 16" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="https://drive.google.com/file/d/1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.06] text-neutral-200 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:border-orange-500/40 hover:text-white hover:bg-orange-500/10 hover:scale-[1.02] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          >
            {/* Laser light line animation on hover */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-[70%] h-[1px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent transition-all duration-500" />

            <span className="relative z-10">View Resume</span>
            <svg 
              className="w-4 h-4 text-neutral-400 group-hover:text-orange-400 transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 12 12" 
              stroke="currentColor" 
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
