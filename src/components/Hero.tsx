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
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black text-sm font-medium tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]"
          >
            <span className="relative z-10">View My Work</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="https://drive.google.com/file/d/1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/15 text-white/80 text-sm font-medium tracking-wide bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:text-white hover:bg-white/10 hover:scale-[1.02]"
          >
            View Resume
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;

