"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
}

// ── Terminal command registry ──────────────────────────────────────────
type TermLine = { type: "cmd" | "out" | "blank" | "error"; text: string };

const COMMANDS: Record<string, TermLine[]> = {
  "whoami": [
    { type: "out", text: "Lovekesh Anand" },
    { type: "out", text: "Role    : Full-Stack Developer & Cloud Engineer" },
    { type: "out", text: "Age     : 20" },
    { type: "out", text: "Based   : India" },
    { type: "blank", text: "" },
  ],
  "skills": [
    { type: "out", text: "── Frontend ──────────────────────────────" },
    { type: "out", text: "  React.js · Next.js · TypeScript · Tailwind" },
    { type: "out", text: "── Backend ───────────────────────────────" },
    { type: "out", text: "  Node.js · Express.js · REST APIs · JWT" },
    { type: "out", text: "── Databases ─────────────────────────────" },
    { type: "out", text: "  PostgreSQL · MongoDB · Prisma ORM" },
    { type: "out", text: "── Cloud & DevOps ────────────────────────" },
    { type: "out", text: "  AWS EC2 · PM2 · Jenkins · OpenVPN · Nginx" },
    { type: "blank", text: "" },
  ],
  "experience": [
    { type: "out", text: "── Projects & Work ───────────────────────" },
    { type: "out", text: "  ∟ Built production-grade SaaS platforms" },
    { type: "out", text: "  ∟ Deployed multi-tenant apps on AWS EC2" },
    { type: "out", text: "  ∟ Engineered secure JWT auth systems" },
    { type: "out", text: "  ∟ Automated CI/CD pipelines via Jenkins" },
    { type: "out", text: "  ∟ Optimised DB queries to < 5ms response" },
    { type: "blank", text: "" },
  ],
  "contact": [
    { type: "out", text: "Email   : lovekeshanand.dev@gmail.com" },
    { type: "out", text: "GitHub  : github.com/lovekeshanand" },
    { type: "out", text: "LinkedIn: linkedin.com/in/lovekeshanand" },
    { type: "blank", text: "" },
  ],
  "download-resume": [
    { type: "out", text: "Establishing secure connection to storage..." },
    { type: "out", text: "[████████████████████] 100% — Transfer complete" },
    { type: "out", text: "Opening LovekeshAnand_Resume.pdf in a new tab..." },
    { type: "blank", text: "" },
  ],
  "help": [
    { type: "out", text: "Available commands:" },
    { type: "out", text: "  whoami           — Identity & overview" },
    { type: "out", text: "  skills           — Technical stack" },
    { type: "out", text: "  experience       — Work & projects" },
    { type: "out", text: "  contact          — Reach me" },
    { type: "out", text: "  download-resume  — Get my resume PDF" },
    { type: "out", text: "  clear            — Clear terminal" },
    { type: "blank", text: "" },
  ],
};

const TelemetryMesh = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Terminal state ──────────────────────────────
  const [termLines, setTermLines]   = useState<TermLine[]>([]);
  const [inputVal,  setInputVal]    = useState("");
  const [isTyping,  setIsTyping]    = useState(false);
  const [cursorOn,  setCursorOn]    = useState(true);
  const termBodyRef = useRef<HTMLDivElement>(null);



  // Compass rotation scroll inertia
  const compassRef = useRef<HTMLDivElement>(null);

  // 1. Scroll-inertia Compass Rotation Trigger
  useGSAP(() => {
    if (compassRef.current) {
      gsap.to(compassRef.current, {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }

    // Fade-in bento grid slots staggeringly
    gsap.fromTo(
      ".telemetry-bento-cell",
      {
        opacity: 0,
        y: 40,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".telemetry-bento-grid",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  // ── Blinking cursor ────────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setCursorOn(p => !p), 530);
    return () => clearInterval(t);
  }, []);

  // ── Auto-scroll terminal body ──────────────────────────────────────────
  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [termLines]);

  // ── Typewrite helper ───────────────────────────────────────────────────
  const typeCommand = (cmd: string, onDone?: () => void) => {
    setIsTyping(true);
    let i = 0;
    // first add an empty cmd line to fill character by character
    setTermLines(prev => [...prev, { type: "cmd", text: "" }]);
    const iv = setInterval(() => {
      i++;
      setTermLines(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { type: "cmd", text: cmd.slice(0, i) };
        return copy;
      });
      if (i >= cmd.length) {
        clearInterval(iv);
        // append output lines
        setTimeout(() => {
          const output = COMMANDS[cmd] ?? [{ type: "error" as const, text: `command not found: ${cmd}` }, { type: "blank", text: "" }];
          setTermLines(prev => [...prev, ...output]);
          setIsTyping(false);
          onDone?.();
        }, 220);
      }
    }, 55);
  };

  // ── Initialize terminal with welcome & commands description ───────────
  useEffect(() => {
    setTermLines([
      { type: "out", text: "PORTFOLIO OS [Version 2.1.0]" },
      { type: "out", text: "(c) 2026 Lovekesh Anand. All rights reserved." },
      { type: "blank", text: "" },
      { type: "out", text: "Available commands:" },
      { type: "out", text: "  whoami           — Identity & overview" },
      { type: "out", text: "  skills           — Technical stack" },
      { type: "out", text: "  experience       — Work & projects" },
      { type: "out", text: "  contact          — Reach me" },
      { type: "out", text: "  download-resume  — View/Get resume document" },
      { type: "out", text: "  clear            — Clear terminal screen" },
      { type: "blank", text: "" },
      { type: "out", text: "Type a command below to begin." },
      { type: "blank", text: "" },
    ]);
  }, []);

  // ── Handle user-typed commands ─────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim().toLowerCase().replace(/\s+/g, "-");
    if (!raw) return;
    setInputVal("");
    if (raw === "clear") {
      setTermLines([
        { type: "out", text: "PORTFOLIO OS [Version 2.1.0]" },
        { type: "out", text: "(c) 2026 Lovekesh Anand. All rights reserved." },
        { type: "blank", text: "" },
        { type: "out", text: "Available commands:" },
        { type: "out", text: "  whoami           — Identity & overview" },
        { type: "out", text: "  skills           — Technical stack" },
        { type: "out", text: "  experience       — Work & projects" },
        { type: "out", text: "  contact          — Reach me" },
        { type: "out", text: "  download-resume  — View/Get resume document" },
        { type: "out", text: "  clear            — Clear terminal screen" },
        { type: "blank", text: "" },
        { type: "out", text: "Type a command below to begin." },
        { type: "blank", text: "" },
      ]);
      return;
    }
    if (raw === "download-resume") {
      typeCommand("download-resume", () => {
        // Trigger direct download
        const a = document.createElement("a");
        a.href = "https://drive.google.com/uc?export=download&id=1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G";
        a.download = "LovekeshAnand_Resume.pdf";
        a.click();
        
        // Open viewer in a new tab
        window.open("https://drive.google.com/file/d/1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G/view?usp=sharing", "_blank", "noopener,noreferrer");
      });
      return;
    }
    typeCommand(raw);
  };



  return (
    <div 
      ref={containerRef}
      className="relative bg-neutral-950/70 backdrop-blur-sm text-white border-t border-b border-white/5 py-24 select-none overflow-hidden z-10"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes terminalBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-terminal-blink {
          animation: terminalBlink 1.2s step-end infinite;
        }
      `}} />
      {/* â”€â”€ Subtle warm orange grid matrix backdrop matching the design system â”€â”€â”€â”€â”€â”€ */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(249, 115, 22, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Visual Heading Framing */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <span className="font-sans text-xs font-medium text-orange-500 tracking-[0.3em] uppercase block mb-3">
            01.5 / KINETIC MESH
          </span>
          <h2 className="font-author text-5xl md:text-6.5vw xl:text-6rem font-normal tracking-tight text-white leading-[1.05]">
            Engineering <br /><em className="italic font-serif text-orange-400">Matrix</em>
          </h2>
          <p className="font-author text-sm text-neutral-400 font-normal mt-4 leading-relaxed max-w-xs">
            An interactive dashboard mapping structural systems infrastructure, AWS topology orbits, and coordinate-sensitive physics wave guides.
          </p>
        </div>

        {/* Right Column: High-Density Interactive Bento Grid Deck */}
        <div className="lg:col-span-8 telemetry-bento-grid grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
          
          {/* CELL 1: Interactive Personal Terminal */}
          <div className="telemetry-bento-cell md:col-span-12 border border-white/[0.08] rounded-2xl bg-[#0a0a0a] font-mono text-xs leading-relaxed shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] flex flex-col min-h-[340px] relative z-10 overflow-hidden">
            
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02] select-none shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="text-[9px] text-neutral-600 tracking-[0.25em] uppercase font-medium ml-3">
                lovekesh@portfolio — bash
              </span>
              {/* Quick command chips */}
              <div className="ml-auto flex items-center gap-1.5">
                {["whoami","skills","experience","contact"].map(cmd => (
                  <button
                    key={cmd}
                    disabled={isTyping}
                    onClick={() => { if (!isTyping) typeCommand(cmd); }}
                    className="px-2 py-0.5 rounded border border-white/[0.07] text-[8px] text-neutral-500 hover:border-orange-500/40 hover:text-orange-400 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-wider"
                  >
                    {cmd}
                  </button>
                ))}
                <button
                  disabled={isTyping}
                  onClick={() => {
                    if (isTyping) return;
                    typeCommand("download-resume", () => {
                      // Trigger direct download
                      const a = document.createElement("a");
                      a.href = "https://drive.google.com/uc?export=download&id=1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G";
                      a.download = "LovekeshAnand_Resume.pdf";
                      a.click();

                      // Open viewer in a new tab
                      window.open("https://drive.google.com/file/d/1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G/view?usp=sharing", "_blank", "noopener,noreferrer");
                    });
                  }}
                  className="px-2 py-0.5 rounded border border-orange-500/30 text-[8px] text-orange-400 hover:bg-orange-500/10 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-wider"
                >
                  download-resume
                </button>
              </div>
            </div>

            {/* Terminal body — scrollable */}
            <div
              ref={termBodyRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-[2px] scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {termLines.map((line, i) => {
                if (line.type === "blank") return <div key={i} className="h-2" />;
                if (line.type === "cmd") return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-orange-500 shrink-0">❯</span>
                    <span className="text-white">{line.text}</span>
                    {i === termLines.length - 1 && isTyping && (
                      <span className={`inline-block w-[7px] h-[13px] bg-orange-500 ml-0.5 transition-opacity duration-75 ${cursorOn ? "opacity-100" : "opacity-0"}`} />
                    )}
                  </div>
                );
                if (line.type === "error") return (
                  <div key={i} className="text-orange-500/70 pl-5">{line.text}</div>
                );
                return (
                  <div key={i} className="text-neutral-400 pl-5 leading-[1.6]">{line.text}</div>
                );
              })}
              {/* Ready for input */}
            </div>

            {/* Input row */}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center gap-3 px-5 py-3 border-t border-white/[0.06] bg-white/[0.015] shrink-0 cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <span className="text-orange-500 text-[13px] shrink-0 select-none">❯</span>
              
              {/* Custom Display Area with Custom Blinking Cursor */}
              <div className="flex-1 flex items-center font-mono text-xs text-white pointer-events-none select-none relative overflow-hidden h-[18px]">
                {inputVal ? (
                  <span>{inputVal}</span>
                ) : (
                  <span className="text-neutral-700">type a command...</span>
                )}
                {/* Custom Blinking Cursor - constantly blinking */}
                <span className="inline-block w-[7px] h-[13px] bg-orange-500/80 ml-1 animate-terminal-blink" />
              </div>

              {/* Invisible native input for input capture */}
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                disabled={isTyping}
                onChange={e => setInputVal(e.target.value)}
                className="absolute inset-y-0 left-12 right-20 bg-transparent text-transparent outline-none border-none caret-transparent"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-[8px] text-neutral-700 tracking-widest uppercase hidden sm:block select-none">↵ enter</span>
            </form>
          </div>

          {/* CELL 2: Core Metrics Orb (col-span-4) */}
          <div className="telemetry-bento-cell md:col-span-4 border border-white/[0.08] rounded-2xl bg-[#0a0a0a] p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] flex flex-col h-[280px] overflow-hidden">
            <span className="text-[8px] font-mono text-neutral-600 tracking-[0.25em] uppercase font-medium mb-3 select-none">
              MATRIX // CORE ORBITAL LOAD
            </span>
            <div className="flex-1 flex items-center justify-center relative">
              <svg className="w-28 h-28" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(249,115,22,0.15)" strokeWidth="1.5"
                        strokeDasharray="251" strokeDashoffset="140" className="animate-[spin_10s_linear_infinite]" style={{ transformOrigin: "50% 50%" }} />
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"
                        strokeDasharray="188" strokeDashoffset="65" className="animate-[spin_5s_linear_infinite_reverse]" style={{ transformOrigin: "50% 50%" }} />
                <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(249,115,22,0.3)" strokeWidth="2"
                        strokeDasharray="125" strokeDashoffset="35" className="animate-[spin_2.5s_linear_infinite]" style={{ transformOrigin: "50% 50%" }} />
                
                <circle cx="50" cy="50" r="3.5" fill="#f97316" className="animate-pulse" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono select-none">
                <span className="text-[12px] text-white font-bold mt-1">48.2%</span>
                <span className="text-[7px] text-neutral-500 uppercase tracking-widest mt-0.5">SYS MEM LOAD</span>
              </div>
            </div>
            <div className="flex justify-between font-mono text-[8px] text-neutral-500 pt-2.5 border-t border-white/[0.04] select-none">
              <span>CORES // 8 ACTIVE</span>
              <span className="text-orange-400">THREAD SECURE</span>
            </div>
          </div>

          {/* CELL 3: AWS Node Telemetry (col-span-8) */}
          <div className="telemetry-bento-cell md:col-span-8 border border-white/[0.08] rounded-2xl bg-[#0a0a0a] p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] flex flex-col h-[280px] overflow-hidden">
            <div className="flex items-center justify-between mb-4 select-none">
              <span className="text-[8px] font-mono text-neutral-600 tracking-[0.25em] uppercase font-medium">
                AWS // TOPOLOGY PORT MATRIX
              </span>
              <span className="px-2 py-0.5 rounded border border-green-500/20 bg-green-500/5 text-[7px] font-mono text-green-400 uppercase tracking-wider">
                ACTIVE STATE
              </span>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-3 font-mono text-[9px] text-neutral-400 select-none">
              {[
                { label: "JENKINS RUNNERS", status: "ONLINE", value: "3/3 EXEC IDLE", color: "text-green-400" },
                { label: "OPENVPN GATEWAY", status: "ESTABLISHED", value: "14.2 ms LATENCY", color: "text-green-400" },
                { label: "DOCKER RUNNERS", status: "SANDBOXED", value: "12 CONTAINERS", color: "text-orange-400" },
                { label: "DB GATE QUERY", status: "OPTIMIZED", value: "PORT 5432 (PG)", color: "text-orange-400" }
              ].map(node => (
                <div key={node.label} className="border border-white/[0.04] bg-white/[0.01] p-3 rounded-lg flex flex-col justify-between hover:border-orange-500/25 transition-colors duration-300">
                  <span className="text-neutral-500 text-[8px] uppercase tracking-wider">{node.label}</span>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-white text-[10px] font-semibold">{node.value}</span>
                    <span className={`text-[7px] font-bold ${node.color}`}>{node.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between font-mono text-[7px] text-neutral-500 pt-3 border-t border-white/[0.04] mt-2 select-none">
              <span>VPN_ENC // AES_256_CBC</span>
              <span>Uptime: 99.982%</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default TelemetryMesh;

