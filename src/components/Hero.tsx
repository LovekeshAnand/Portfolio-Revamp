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
  const gridMaskRef = useRef<HTMLDivElement>(null);
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

  // Dynamic grid mouse hover tracking
  React.useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!gridMaskRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gridMaskRef.current.style.setProperty("--mouse-x", `${x}px`);
      gridMaskRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // IST Live clock ticking
  React.useEffect(() => {
    const updateTime = () => {
      const el = document.getElementById("ist-live-clock");
      if (!el) return;
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      el.textContent = new Intl.DateTimeFormat("en-US", options).format(new Date());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".hero-reveal-line", {
      y: "0%",
      duration: 1.15,
      stagger: 0.1,
      delay: 0.1,
    });

    tl.to(
      ".hero-reveal-fade",
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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollDownLine {
          0% { transform: translateY(-110%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(110%); }
        }
      `}} />

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

      {/* Grid Network overlay with mouse tracking mask */}
      <div 
        ref={gridMaskRef}
        className="absolute inset-0 z-[1] pointer-events-none opacity-40 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(249, 115, 22, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(circle 200px at var(--mouse-x, -500px) var(--mouse-y, -500px), black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 200px at var(--mouse-x, -500px) var(--mouse-y, -500px), black 30%, transparent 100%)"
        }}
      />

      {/* Subtle vertical guide lines */}
      <div className="absolute left-[8%] inset-y-0 border-l border-white/5 z-[1] pointer-events-none hidden md:block" />
      <div className="absolute right-[8%] inset-y-0 border-l border-white/5 z-[1] pointer-events-none hidden md:block" />

      {/* ── HUD PANEL: Top-Left (Name & Geo) ── */}
      <div className="absolute top-8 left-8 md:left-12 z-20 flex flex-col font-mono text-[9px] text-neutral-500 tracking-[0.2em] leading-relaxed uppercase">
        <span className="font-[family-name:var(--font-bebas)] text-white tracking-[0.18em] text-base leading-none mb-1">
          Lovekesh Anand
        </span>
        <span>GEO // 28.6139° N, 77.2090° E</span>
        <span>IST // NEW DELHI, INDIA</span>
      </div>

      {/* ── HUD PANEL: Top-Right (Server Status) ── */}
      <div className="absolute top-8 right-8 md:right-12 z-20 flex flex-col items-end font-mono text-[9px] text-neutral-500 tracking-[0.2em] leading-relaxed uppercase">
        <span className="text-orange-500 font-bold mb-0.5">STATUS // DEV PIPELINE ON</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
          <span>AWS_NODE_01_DE // HTTP/3</span>
        </span>
      </div>

      {/* ── HUD PANEL: Bottom-Left (System Logs) ── */}
      <div className="absolute bottom-10 left-8 md:left-12 z-20 hidden md:flex flex-col font-mono text-[9px] text-neutral-500 tracking-[0.2em] leading-relaxed uppercase">
        <span>BUFF // 120 FPS STABLE STATE</span>
        <span>SHIELD // AES_256_GCM ACTIVE</span>
      </div>

      {/* ── HUD PANEL: Bottom-Right (Live IST Clock) ── */}
      <div className="absolute bottom-10 right-8 md:right-12 z-20 hidden md:flex flex-col items-end font-mono text-[9px] text-neutral-500 tracking-[0.2em] leading-relaxed uppercase">
        <span>LOCAL TIME (IST)</span>
        <span className="text-white text-xs font-semibold tracking-wide mt-0.5" id="ist-live-clock">
          --:--:--
        </span>
      </div>

      {/* ── Scroll Down Indicator ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none select-none">
        <span className="font-mono text-[7px] text-neutral-600 tracking-[0.3em] uppercase">SCROLL DOWN</span>
        <div className="w-[1px] h-9 bg-neutral-900 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-orange-500 rounded-full animate-[scrollDownLine_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[88%] mx-auto flex flex-col items-center text-center -mt-8 md:-mt-12">
        {/* Established Tag */}
        <div className="hero-reveal-fade opacity-0 translate-y-4 mb-5 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 font-mono text-[9px] font-bold tracking-[0.2em] uppercase select-none">
            CORE PROTOCOL ENGINEER
          </span>
        </div>

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

        <p className="hero-reveal-fade opacity-0 translate-y-4 font-author text-neutral-400 text-sm md:text-[15px] font-light tracking-wide max-w-lg mt-6 leading-relaxed">
          Specializing in sub-5ms data transactions, self-hosted offline AI architectures, and resilient AWS orchestration pipelines.
        </p>

        {/* CTAs */}
        <div className="hero-reveal-fade opacity-0 translate-y-4 flex flex-wrap items-center justify-center gap-4 mt-10">
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

