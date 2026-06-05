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
    { type: "out", text: "Role  : Full-Stack Developer & DevOps" },
    { type: "out", text: "Age   : 20" },
    { type: "out", text: "Based : India" },
    { type: "blank", text: "" },
  ],
  "skills": [
    { type: "out", text: "── Frontend ──────────────────" },
    { type: "out", text: "  React · Next · TS · Tailwind" },
    { type: "out", text: "── Backend ───────────────────" },
    { type: "out", text: "  Node · Express · REST · JWT" },
    { type: "out", text: "── Databases ─────────────────" },
    { type: "out", text: "  Postgres · MongoDB · Prisma" },
    { type: "out", text: "── Cloud & DevOps ────────────" },
    { type: "out", text: "  AWS · PM2 · Jenkins · Nginx" },
    { type: "blank", text: "" },
  ],
  "experience": [
    { type: "out", text: "── Projects & Work ───────────" },
    { type: "out", text: "  ∟ Built production SaaS apps" },
    { type: "out", text: "  ∟ Deployed scale apps on AWS" },
    { type: "out", text: "  ∟ Secured JWT auth systems" },
    { type: "out", text: "  ∟ Configured Jenkins CI/CD" },
    { type: "out", text: "  ∟ Optimized DB queries < 5ms" },
    { type: "blank", text: "" },
  ],
  "contact": [
    { type: "out", text: "Email   : lovekeshanand6@gmail.com" },
    { type: "out", text: "GitHub  : github.com/LovekeshAnand" },
    { type: "out", text: "LinkedIn: linkedin.com/in/lovekesh-anand-443138318" },
    { type: "blank", text: "" },
  ],
  "download-resume": [
    { type: "out", text: "Connecting to secure storage..." },
    { type: "out", text: "[████████████████████] 100% — Done" },
    { type: "out", text: "Opening Resume PDF in a new tab..." },
    { type: "blank", text: "" },
  ],
  "help": [
    { type: "out", text: "Available commands:" },
    { type: "out", text: "  whoami           — Overview" },
    { type: "out", text: "  skills           — Tech stack" },
    { type: "out", text: "  experience       — Projects" },
    { type: "out", text: "  contact          — Reach me" },
    { type: "out", text: "  download-resume  — Resume PDF" },
    { type: "out", text: "  clear            — Clear screen" },
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
  const [isFocused, setIsFocused]   = useState(false);
  const termBodyRef = useRef<HTMLDivElement>(null);

  // Command History Navigation
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

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

  // ── Auto-type simulation for chips ─────────────────────────────────────
  const typeCommand = (cmd: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setInputVal("");
    inputRef.current?.focus();
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setInputVal(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(iv);
        setTimeout(() => {
          setInputVal("");
          setIsTyping(false);
          // Add to history
          setHistory(prev => [...prev, cmd]);
          setHistoryIndex(-1);
          executeCommand(cmd);
        }, 220);
      }
    }, 45);
  };

  // ── Execute command immediately ────────────────────────────────────────
  const executeCommand = (cmd: string) => {
    const raw = cmd.trim().toLowerCase().replace(/\s+/g, "-");
    
    // Add command line
    setTermLines(prev => [...prev, { type: "cmd", text: cmd }]);
    
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
      // Trigger direct download
      const a = document.createElement("a");
      a.href = "https://drive.google.com/uc?export=download&id=1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G";
      a.download = "LovekeshAnand_Resume.pdf";
      a.click();
      
      // Open viewer in a new tab
      window.open("https://drive.google.com/file/d/1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G/view?usp=sharing", "_blank", "noopener,noreferrer");
    }

    setIsTyping(true);
    setTimeout(() => {
      let output: TermLine[] = [];
      if (raw === "sudo") {
        output = [
          { type: "error", text: "guest is not in the sudoers file. This incident will be reported." },
          { type: "blank", text: "" },
        ];
      } else if (COMMANDS[raw]) {
        output = COMMANDS[raw];
      } else {
        output = [
          { type: "error", text: `command not found: ${raw}. Type 'help' for options.` },
          { type: "blank", text: "" },
        ];
      }
      setTermLines(prev => [...prev, ...output]);
      setIsTyping(false);
    }, 150);
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
    if (isTyping) return;
    const raw = inputVal.trim();
    if (!raw) return;
    setInputVal("");

    // Add to history
    setHistory(prev => [...prev, raw]);
    setHistoryIndex(-1);

    executeCommand(raw);
  };

  // ── Keyboard key navigation ───────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isTyping) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      
      const available = [...Object.keys(COMMANDS), "clear", "help"];
      const match = available.find(cmd => cmd.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
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
      {/* ── Subtle warm orange grid matrix backdrop matching the design system ── */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Visual Heading Framing */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <span className="font-sans text-xs font-medium text-orange-500 tracking-[0.3em] uppercase block mb-3">
            01.5 / KINETIC MESH
          </span>
          <h2 className="font-author text-5xl md:text-6.5vw xl:text-6rem font-normal tracking-tight text-white leading-[1.05]">
            Engineering <br /><em className="italic font-serif text-orange-400">Matrix</em>
          </h2>
          <p className="font-author text-base text-neutral-400 font-normal mt-4 leading-relaxed max-w-xs">
            An interactive dashboard mapping structural systems infrastructure, AWS topology orbits, and coordinate-sensitive physics wave guides.
          </p>
        </div>

        {/* Right Column: High-Density Interactive Bento Grid Deck */}
        <div className="lg:col-span-8 telemetry-bento-grid grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
          
          {/* CELL 1: Interactive Personal Terminal */}
          <div className="telemetry-bento-cell md:col-span-12 border border-white/[0.08] rounded-2xl bg-[#0a0a0a] font-mono text-xs leading-relaxed shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] flex flex-col min-h-[340px] relative z-10 overflow-hidden">
            
            {/* Title bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:px-5 border-b border-white/[0.06] bg-white/[0.02] select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="text-[11px] text-neutral-500 tracking-[0.25em] uppercase font-medium ml-3">
                  lovekesh@portfolio
                </span>
              </div>
              {/* Quick command chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {["whoami","skills","experience","contact"].map(cmd => (
                  <button
                    key={cmd}
                    disabled={isTyping}
                    onClick={() => { if (!isTyping) typeCommand(cmd); }}
                    className="px-2 py-0.5 rounded border border-white/[0.07] text-[10px] text-neutral-500 hover:border-orange-500/40 hover:text-orange-400 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-wider"
                  >
                    {cmd}
                  </button>
                ))}
                <button
                  disabled={isTyping}
                  onClick={() => {
                    if (isTyping) return;
                    typeCommand("download-resume");
                  }}
                  className="px-2 py-0.5 rounded border border-orange-500/30 text-[10px] text-orange-400 hover:bg-orange-500/10 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-wider"
                >
                  download-resume
                </button>
              </div>
            </div>

            {/* Terminal body — scrollable */}
            <div
              ref={termBodyRef}
              className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 space-y-[2px] scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {termLines.map((line, i) => {
                if (line.type === "blank") return <div key={i} className="h-2" />;
                if (line.type === "cmd") return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-orange-500 shrink-0">❯</span>
                    <span className="text-white whitespace-pre-wrap break-words">{line.text}</span>
                  </div>
                );
                if (line.type === "error") return (
                  <div key={i} className="text-orange-500/70 pl-5 whitespace-pre-wrap break-words">{line.text}</div>
                );
                return (
                  <div key={i} className="text-neutral-400 pl-5 leading-[1.6] whitespace-pre-wrap break-words">{line.text}</div>
                );
              })}
            </div>

            {/* Input row */}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center gap-3 px-4 py-3 sm:px-5 border-t border-white/[0.06] bg-white/[0.015] shrink-0 cursor-text"
            >
              <span className="text-orange-500 text-[13px] shrink-0 select-none">❯</span>
              
              {/* Custom Display Area with Custom Blinking Cursor */}
              <div className="flex-1 flex items-center font-mono text-xs text-white pointer-events-none select-none relative overflow-hidden h-[18px]">
                {inputVal ? (
                  <div className="flex items-center">
                    <span>{inputVal}</span>
                    {isFocused ? (
                      <span className={`inline-block w-[7px] h-[13px] bg-orange-500/80 ml-0.5 ${cursorOn ? "opacity-100" : "opacity-0"}`} />
                    ) : (
                      <span className="inline-block w-[7px] h-[13px] border border-neutral-700 ml-0.5" />
                    )}
                  </div>
                ) : (
                  <div className="relative flex items-center w-full h-full">
                    {/* Active/Inactive cursor overlaying first character 't' */}
                    {isFocused ? (
                      <span className={`absolute left-0 w-[7px] h-[13px] bg-orange-500/80 ${cursorOn ? "opacity-100" : "opacity-0"} z-10`} />
                    ) : (
                      <span className="absolute left-0 w-[7px] h-[13px] border border-neutral-700 z-10" />
                    )}
                    {/* Placeholder text */}
                    <span className="text-neutral-700 relative z-0">type a command...</span>
                  </div>
                )}
              </div>

              {/* Invisible native input for input capture - stretched to cover entire container for click reliability */}
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                disabled={isTyping}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent outline-none border-none caret-transparent z-20 cursor-text"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-[10px] text-neutral-700 tracking-widest uppercase hidden sm:block select-none z-30 pointer-events-none">↵ enter</span>
            </form>
          </div>





        </div>

      </div>

    </div>
  );
};

export default TelemetryMesh;

