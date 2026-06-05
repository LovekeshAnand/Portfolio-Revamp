"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface ProjectData {
  id: string;
  index: string;
  category: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  linkText: string;
  linkUrl: string;
  imageUrl: string;
}

const projects: ProjectData[] = [
  {
    id: "nyaya-ai",
    index: "01",
    category: "OFFLINE AI / SYSTEM INTEGRATION",
    title: "NyayaAI",
    role: "Indian Legal Intelligence Platform",
    description:
      "A privacy-first, self-hosted legal drafting and document intelligence pipeline designed to operate 100% offline. Built defensively to support modern Indian legal codes (BNS, BNSS, BSA) with a custom OCR document ingestion pipeline.",
    tech: ["Python", "FastAPI", "llama.cpp", "SQLite", "PyMuPDF", "Tesseract OCR"],
    linkText: "EXPLORE REPOSITORY / GITHUB",
    linkUrl: "https://github.com/LovekeshAnand/nyaya-ai",
    imageUrl: "/images/nyaya_ai.png",
  },
  {
    id: "service-flow",
    index: "02",
    category: "FULL-STACK / WEB UTILITY",
    title: "ServiceFlow",
    role: "Real-Time Priority Feedback Portal",
    description:
      "A robust client-facing issue tracker and priority management dashboard built to optimize QA cycles across staging instances. Integrates real-time state sync, high-efficiency caching, and automated email alerts on high-severity events.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "WebSockets", "Tailwind CSS"],
    linkText: "LAUNCH APPLICATION / LIVE",
    linkUrl: "https://serviceflow-five.vercel.app/",
    imageUrl: "/images/serviceflow.png",
  },
];

/* ─── Math ───────────────────────────────────────────────────────────────────── */
function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }
function remap(p: number, a: number, b: number) { return clamp01((p - a) / (b - a)); }
// Cubic ease-in-out
function ease(t: number) {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */
const Projects = () => {
  const containerRef  = useRef<HTMLDivElement>(null);

  // DOM refs for imperative style writes — ZERO React re-renders during animation
  const titleRef      = useRef<HTMLDivElement>(null);
  const laptopRef     = useRef<HTMLDivElement>(null);
  const sidebarRef    = useRef<HTMLDivElement>(null);
  const screen0Ref    = useRef<HTMLDivElement>(null);
  const screen1Ref    = useRef<HTMLDivElement>(null);
  const screen2Ref    = useRef<HTMLDivElement>(null);
  const bar0Ref       = useRef<HTMLDivElement>(null);
  const bar1Ref       = useRef<HTMLDivElement>(null);
  const bar2Ref       = useRef<HTMLDivElement>(null);

  // Only state used → discrete phase change (card swap) — minimal re-renders
  const [activeProject, setActiveProject] = useState(0);

  const rawRef  = useRef(0);
  const smoothRef = useRef(0);
  const rafRef  = useRef<number | null>(null);
  const prevPhaseRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);

  /* ── Resize ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Imperative animation loop — writes styles directly to DOM refs ── */
  const tick = useCallback(() => {
    // Lerp: smooth = smooth + (raw - smooth) * factor
    // factor 0.1 = silky; 0.2 = snappy
    const raw = rawRef.current;
    const prev = smoothRef.current;
    const next = Math.abs(raw - prev) < 0.00005 ? raw : prev + (raw - prev) * 0.07; // Slowed down from 0.12 for premium weight/inertia
    smoothRef.current = next;

    const P = next;

    /* ── Title: starts visible, exits 0.12–0.25 ── */
    const tOut = ease(remap(P, 0.12, 0.25));
    const tOp  = clamp01(1 - tOut);
    const tY   = -(60 * tOut);
    if (titleRef.current) {
      titleRef.current.style.opacity = String(tOp);
      titleRef.current.style.transform = `translateY(${tY}px)`;
    }

    /* ── Laptop: enters 0.15–0.35 vertically, shifts left 0.30–0.48 ── */
    const lIn    = ease(remap(P, 0.15, 0.35));
    const lShift = ease(remap(P, 0.30, 0.48));
    const lY     = 80 * (1 - lIn);
    const lX     = 25 * (1 - lShift); // 25%→0%: centers 8-col in 12-col grid
    if (laptopRef.current) {
      laptopRef.current.style.opacity = String(lIn);
      laptopRef.current.style.transform = `translateY(${lY}px) translateX(${lX}%)`;
    }

    /* ── Sidebar: enters 0.38–0.48 ── */
    const sIn = ease(remap(P, 0.38, 0.48));
    if (sidebarRef.current) {
      sidebarRef.current.style.opacity = String(sIn);
      sidebarRef.current.style.transform = `translateX(${55 * (1 - sIn)}px)`;
    }

    /* ── Laptop screens ── */
    const nyayaReveal   = P >= 0.48;
    const serviceReveal = P >= 0.74;
    if (screen0Ref.current) screen0Ref.current.style.opacity = nyayaReveal ? "0" : "1";
    if (screen1Ref.current)
      screen1Ref.current.style.clipPath = nyayaReveal ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)";
    if (screen2Ref.current)
      screen2Ref.current.style.clipPath = serviceReveal ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)";

    /* ── Progress bars ── */
    const b0 = ease(clamp01(remap(P, 0.00, 0.48)));
    const b1 = ease(remap(P, 0.48, 0.74));
    const b2 = ease(remap(P, 0.74, 1.00));
    if (bar0Ref.current) bar0Ref.current.style.transform = `scaleX(${b0})`;
    if (bar1Ref.current) bar1Ref.current.style.transform = `scaleX(${b1})`;
    if (bar2Ref.current) bar2Ref.current.style.transform = `scaleX(${b2})`;

    /* ── Active project card (discrete state — minimal re-render) ── */
    const phase = P >= 0.74 ? 2 : P >= 0.48 ? 1 : 0;
    if (phase !== prevPhaseRef.current) {
      prevPhaseRef.current = phase;
      setActiveProject(phase);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /* ── Scroll listener + start rAF loop ── */
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      rawRef.current = clamp01(-rect.top / scrollable);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, tick]);

  /* ─── MOBILE ──────────────────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <div id="projects" className="bg-transparent text-neutral-200 border-t border-white/5 py-16 px-6">
        <section className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-medium text-orange-500 tracking-[0.3em] uppercase block mb-2">
              04 / PORTFOLIO
            </span>
            <h2 className="font-author text-4xl md:text-5xl font-normal tracking-tight text-white">
              Selected <em className="italic font-serif text-orange-400">Projects</em>
            </h2>
            <p className="font-author text-base text-neutral-400 font-light mt-2 max-w-md">
              A curation of high-performance backend pipelines and web applications built under tight resource limits.
            </p>
          </div>
          <div className="flex flex-col gap-16 mt-12">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col border border-white/5 p-6 bg-white/[0.01]">
                <a href={project.linkUrl} target="_blank" rel="noopener noreferrer"
                   className="block w-full overflow-hidden border border-white/5 aspect-[16/10] bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                </a>
                <div className="mt-6">
                  <span className="text-xs font-medium text-neutral-400 tracking-wider">
                    {project.index} / {project.category}
                  </span>
                  <h3 className="font-author text-3xl font-normal text-white mt-1">{project.title}</h3>
                  <p className="text-xs font-medium text-orange-400 tracking-wide">{project.role}</p>
                  <p className="font-author text-sm md:text-base text-neutral-400 leading-relaxed mt-3 font-light">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.map((s) => (
                      <span key={s} className="text-[11px] font-mono font-medium text-neutral-400 border border-white/5 bg-white/[0.01] px-2 py-0.5">{s}</span>
                    ))}
                  </div>
                  <a href={project.linkUrl} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1 mt-5 text-xs font-medium text-orange-400 hover:underline tracking-wider uppercase group">
                     {project.linkText}
                     <svg className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
                     </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  /* ─── DESKTOP ─────────────────────────────────────────────────────────────── */
  return (
    <div id="projects" ref={containerRef}
      className="relative h-[650vh] bg-transparent text-white border-t border-white/5">

      <section className="sticky top-0 h-screen w-full flex items-center overflow-hidden px-12 xl:px-24">

        {/* ── Centered title layer (phases 0–1, exits phase 2) ── */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-40 pointer-events-none"
          style={{ opacity: 1, willChange: "transform, opacity" }}
        >
          <span className="font-sans text-xs font-semibold text-orange-500 tracking-[0.4em] uppercase block mb-4">
            04 / PORTFOLIO
          </span>
          <h2 className="font-author font-normal tracking-tight text-white leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            Selected&nbsp;<em className="italic font-serif text-orange-400">Projects</em>
          </h2>
          <p className="font-author text-base text-neutral-400 font-light mt-6 leading-relaxed max-w-xl">
            Bespoke systems engineering codebases designed under hardware, security, and network constraints.
          </p>
        </div>

        {/* ── 12-col grid ── */}
        <div className="grid grid-cols-12 w-full gap-8 xl:gap-12 items-center relative z-10">

          {/* Laptop — col-span-8 */}
          <div
            ref={laptopRef}
            className="col-span-8 flex items-center justify-center relative select-none"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            <div className="relative w-full max-w-3xl mx-auto">
              {/* Bezel */}
              <div className="border-[14px] border-neutral-800 rounded-[20px] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.85)] aspect-[16/10] overflow-hidden bg-black relative">
                {/* Camera */}
                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-neutral-700 z-50" />

                {/* Screen 0: idle */}
                <div
                  ref={screen0Ref}
                  className="absolute inset-0 flex flex-col justify-center items-center bg-[#060606]"
                  style={{ transition: "opacity 700ms ease" }}
                >
                  <div className="absolute inset-0 opacity-[0.07]" style={{
                    backgroundImage: "linear-gradient(to right,#f97316 1px,transparent 1px),linear-gradient(to bottom,#f97316 1px,transparent 1px)",
                    backgroundSize: "32px 32px"
                  }} />
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full border border-orange-500/25 flex items-center justify-center bg-orange-500/5 animate-pulse">
                      <span className="font-mono text-[11px] text-orange-400 font-medium">SYSTEMS</span>
                    </div>
                    <div className="font-mono text-[10px] text-neutral-600 tracking-[0.3em] uppercase">
                      Lovekesh Anand / Project Core
                    </div>
                  </div>
                </div>

                {/* Screen 1: NyayaAI */}
                <div
                  ref={screen1Ref}
                  className="absolute inset-0 z-20"
                  style={{
                    clipPath: "inset(100% 0% 0% 0%)",
                    transition: "clip-path 900ms cubic-bezier(0.16,1,0.3,1)"
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={projects[0].imageUrl} alt="NyayaAI" className="w-full h-full object-cover" loading="lazy" />
                </div>

                {/* Screen 2: ServiceFlow */}
                <div
                  ref={screen2Ref}
                  className="absolute inset-0 z-30"
                  style={{
                    clipPath: "inset(100% 0% 0% 0%)",
                    transition: "clip-path 900ms cubic-bezier(0.16,1,0.3,1)"
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={projects[1].imageUrl} alt="ServiceFlow" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              {/* Bottom lip */}
              <div className="w-[96%] mx-auto h-[10px] bg-neutral-800 rounded-b-xl border-t border-neutral-700" />
            </div>
          </div>

          {/* Sidebar — col-span-4 */}
          <div
            ref={sidebarRef}
            className="col-span-4 h-[560px] flex flex-col justify-between px-8 py-6 bg-black/60 border border-white/5 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            {/* Index */}
            <div className="font-mono text-xs font-medium text-neutral-400 tracking-[0.2em] uppercase">
              INDEX /{" "}
              <span className="text-orange-500 font-semibold">
                {activeProject === 0 ? "00" : `0${activeProject}`}
              </span>
            </div>

            {/* Cards */}
            <div className="relative flex-1 mt-4 overflow-hidden">

              {/* Card 0 */}
              <div className="absolute inset-0 flex flex-col justify-center"
                style={{
                  opacity: activeProject === 0 ? 1 : 0,
                  transform: activeProject === 0 ? "translateY(0)" : "translateY(-18px)",
                  transition: "opacity 450ms ease, transform 450ms ease",
                  pointerEvents: activeProject === 0 ? "auto" : "none"
                }}>
                <span className="font-sans text-xs font-medium text-orange-500 tracking-[0.3em] uppercase block mb-3">04 / PORTFOLIO</span>
                <h2 className="font-author text-4xl xl:text-5xl font-normal tracking-tight text-white leading-none">
                  Selected <br /><em className="italic font-serif text-orange-400">Projects</em>
                </h2>
                <p className="font-author text-base text-neutral-400 font-light mt-4 leading-relaxed">
                  Scroll to review bespoke systems engineering codebases designed under hardware and network constraints.
                </p>
              </div>

              {/* Card 1: NyayaAI */}
              <div className="absolute inset-0 flex flex-col justify-center"
                style={{
                  opacity: activeProject === 1 ? 1 : 0,
                  transform: activeProject === 1 ? "translateY(0)" : activeProject < 1 ? "translateY(20px)" : "translateY(-20px)",
                  transition: "opacity 450ms ease, transform 450ms ease",
                  pointerEvents: activeProject === 1 ? "auto" : "none"
                }}>
                <div className="text-xs font-medium text-neutral-400 tracking-[0.2em] uppercase mb-1">{projects[0].category}</div>
                <h3 className="font-author text-4xl xl:text-5xl font-normal tracking-wide text-white leading-none">{projects[0].title}</h3>
                <div className="text-xs font-medium text-orange-400 tracking-wide uppercase mt-1">{projects[0].role}</div>
                <p className="font-author text-sm md:text-base text-neutral-400 leading-relaxed mt-3 font-light">{projects[0].description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {projects[0].tech.map((s) => (
                    <span key={s} className="text-[11px] font-mono font-medium text-neutral-400 border border-white/5 bg-white/[0.01] px-2 py-0.5">{s}</span>
                  ))}
                </div>
                <a href={projects[0].linkUrl} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-orange-400 hover:underline tracking-wider uppercase group">
                  {projects[0].linkText}
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
                  </svg>
                </a>
              </div>

              {/* Card 2: ServiceFlow */}
              <div className="absolute inset-0 flex flex-col justify-center"
                style={{
                  opacity: activeProject === 2 ? 1 : 0,
                  transform: activeProject === 2 ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 450ms ease, transform 450ms ease",
                  pointerEvents: activeProject === 2 ? "auto" : "none"
                }}>
                <div className="text-xs font-medium text-neutral-400 tracking-[0.2em] uppercase mb-1">{projects[1].category}</div>
                <h3 className="font-author text-4xl xl:text-5xl font-normal tracking-wide text-white leading-none">{projects[1].title}</h3>
                <div className="text-xs font-medium text-orange-400 tracking-wide uppercase mt-1">{projects[1].role}</div>
                <p className="font-author text-sm md:text-base text-neutral-400 leading-relaxed mt-3 font-light">{projects[1].description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {projects[1].tech.map((s) => (
                    <span key={s} className="text-[11px] font-mono font-medium text-neutral-400 border border-white/5 bg-white/[0.01] px-2 py-0.5">{s}</span>
                  ))}
                </div>
                <a href={projects[1].linkUrl} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-orange-400 hover:underline tracking-wider uppercase group">
                  {projects[1].linkText}
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
                  </svg>
                </a>
              </div>

            </div>

            {/* Progress lines */}
            <div className="flex items-center gap-5 mt-4 font-mono text-[10px] font-medium text-neutral-400 tracking-wider">
              {[
                { label: "INTRO",       ref: bar0Ref, active: activeProject === 0 },
                { label: "NYAYAAI",     ref: bar1Ref, active: activeProject === 1 },
                { label: "SERVICEFLOW", ref: bar2Ref, active: activeProject === 2 },
              ].map(({ label, ref, active }) => (
                <div key={label} className="flex items-center gap-2 select-none">
                  <div className="relative w-8 h-[2px] bg-neutral-800 overflow-hidden rounded-full">
                    <div ref={ref} className="absolute inset-y-0 left-0 w-full bg-orange-500 origin-left"
                         style={{ transform: "scaleX(0)" }} />
                  </div>
                  <span className={active ? "text-orange-500 font-semibold" : ""}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
