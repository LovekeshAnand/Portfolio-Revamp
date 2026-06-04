"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

interface PipelineStep {
  label: string;
  desc: string;
  details: string;
  filter: string;
}

interface StackLayer {
  label: string;
  tech: string[];
  desc: string;
  filter: string;
  icon: React.ReactNode;
  telemetry: string;
}

const ArchitectureCard = ({
  layer,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: {
  layer: StackLayer;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link
      href={`/projects?filter=${layer.filter}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="block w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden border rounded-xl px-4 py-3.5 transition-all duration-500 cursor-pointer group w-full ${
          isActive
            ? "border-orange-500/40 bg-orange-500/[0.03] shadow-[0_15px_40px_rgba(249,115,22,0.06)]"
            : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
        }`}
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-0"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.08), transparent 80%)`,
          }}
        />

        {/* Corner accent decorations for high-tech look */}
        <div className="absolute top-0 left-0 w-1.5 h-[1.5px] bg-orange-500/20 group-hover:bg-orange-500/60 transition-colors duration-500" />
        <div className="absolute top-0 left-0 w-[1.5px] h-1.5 bg-orange-500/20 group-hover:bg-orange-500/60 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-1.5 h-[1.5px] bg-orange-500/20 group-hover:bg-orange-500/60 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-[1.5px] h-1.5 bg-orange-500/20 group-hover:bg-orange-500/60 transition-colors duration-500" />

        <div className="relative z-10 flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className={`transition-all duration-300 group-hover:scale-110 ${isActive ? "text-orange-400" : "text-neutral-500 group-hover:text-neutral-300"}`}>
              {layer.icon}
            </span>
            <span className={`text-[10px] md:text-[11px] font-mono tracking-[0.25em] font-medium transition-colors duration-200 ${
              isActive ? "text-orange-400" : "text-neutral-400 group-hover:text-neutral-300"
            }`}>
              {layer.label}
            </span>
          </div>
          <span className={`text-[10px] md:text-[11px] font-mono transition-colors duration-200 ${
            isActive ? "text-neutral-300" : "text-neutral-500 group-hover:text-neutral-400"
          }`}>
            {layer.desc}
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {layer.tech.map((t) => (
              <span
                key={t}
                className={`text-[11px] font-mono px-2 py-[2px] rounded border transition-all duration-300 ${
                  isActive
                    ? "border-orange-500/25 text-orange-400 bg-orange-500/5 shadow-[0_0_8px_rgba(249,115,22,0.05)]"
                    : "border-white/5 text-neutral-300 bg-white/[0.015] group-hover:border-white/10"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          
          {/* Telemetry Tag */}
          <span className={`text-[9px] font-mono px-1.5 py-[1px] rounded bg-black/40 border border-white/5 transition-all duration-300 uppercase tracking-wider ${
            isActive ? "text-orange-400/80 border-orange-500/20" : "text-neutral-600 group-hover:text-neutral-500"
          }`}>
            {layer.telemetry}
          </span>
        </div>
      </div>
    </Link>
  );
};

const HeroBento = () => {
  const [pipelineStep, setPipelineStep] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const [coords1, setCoords1] = useState({ x: 0, y: 0 });
  const cardRef1 = useRef<HTMLDivElement>(null);

  const [coords2, setCoords2] = useState({ x: 0, y: 0 });
  const cardRef2 = useRef<HTMLDivElement>(null);

  const handleMouseMove1 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef1.current) return;
    const rect = cardRef1.current.getBoundingClientRect();
    setCoords1({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove2 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef2.current) return;
    const rect = cardRef2.current.getBoundingClientRect();
    setCoords2({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const pipelineSteps: PipelineStep[] = [
    { label: "01 / RESEARCH", desc: "Bottleneck & constraint audit", details: "SLA specs, CPU limits, & DB schemas", filter: "systems" },
    { label: "02 / DECISIONS", desc: "Stack & architectural design", details: "Cache layers, indexing, & proxy routing", filter: "systems" },
    { label: "03 / DEVELOPMENT", desc: "Full-stack performance build", details: "React frontends, Node APIs, state sync", filter: "web" },
    { label: "04 / CLOUD INFRA", desc: "CI/CD automated deployment", details: "Jenkins, AWS EC2, & OpenVPN gateways", filter: "cloud" }
  ];

  const stackLayers: StackLayer[] = [
    {
      label: "CLIENT LAYER",
      tech: ["React.js", "Next.js", "Tailwind CSS"],
      desc: "SSR rendered UI",
      filter: "web",
      telemetry: "SYS: SSR_OK",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21H16" strokeLinecap="round" />
          <path d="M12 17V21" strokeLinecap="round" />
        </svg>
      )
    },
    {
      label: "API LAYER",
      tech: ["Node.js", "Express.js", "JWT Auth"],
      desc: "Rate-limited endpoints",
      filter: "systems",
      telemetry: "TPS: 10K/S",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M6 12h12" strokeLinecap="round" />
          <path d="M14 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      label: "DATA LAYER",
      tech: ["PostgreSQL", "MongoDB", "Prisma ORM"],
      desc: "Indexed schemas",
      filter: "data",
      telemetry: "RTT: <1.5MS",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" strokeLinecap="round" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" strokeLinecap="round" />
        </svg>
      )
    },
    {
      label: "INFRA LAYER",
      tech: ["AWS EC2", "PM2 Cluster", "OpenVPN"],
      desc: "Zero-downtime deploy",
      filter: "cloud",
      telemetry: "AVAIL: 99.9%",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative z-10 w-full border-t border-b border-white/5 bg-[#070707] select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06] text-left text-neutral-300">
        
        {/* ── Column 1: Core Value Statement ── */}
        <div 
          ref={cardRef1}
          onMouseMove={handleMouseMove1}
          className="relative p-10 flex flex-col justify-center lg:col-span-5 gap-5 min-h-[320px] overflow-hidden group/col1 transition-all duration-500"
        >
          {/* Spotlight Glow */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover/col1:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(350px circle at ${coords1.x}px ${coords1.y}px, rgba(249, 115, 22, 0.045), transparent 80%)`,
            }}
          />

          {/* Cyberpunk Grid Grid Pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] opacity-25 group-hover/col1:opacity-40 transition-opacity duration-500 z-0" />

          {/* Corner trims */}
          <div className="absolute top-0 left-0 w-3 h-[2px] bg-orange-500/10 group-hover/col1:bg-orange-500/50 transition-colors duration-500" />
          <div className="absolute top-0 left-0 w-[2px] h-3 bg-orange-500/10 group-hover/col1:bg-orange-500/50 transition-colors duration-500" />
          
          {/* Top Accent Orange Glow Bar */}
          <div className="absolute top-0 left-0 w-0 group-hover/col1:w-full h-[2px] bg-gradient-to-r from-orange-500/40 via-amber-500/20 to-transparent transition-all duration-700" />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-medium text-orange-500/80 tracking-[0.3em] uppercase group-hover/col1:text-orange-400 transition-colors duration-300">
                // CORE VALUE STATEMENT
              </span>
            </div>
            
            <h3 className="font-author text-3xl md:text-4xl font-normal leading-snug tracking-tight text-white/90 group-hover/col1:text-white transition-colors duration-300">
              I build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-300 font-medium">
                reliable system architecture
              </span>{" "}
              &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 font-medium">
                elegant user experiences
              </span>
              .
            </h3>
            
            <p className="font-author text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-md mt-1 transition-colors duration-300 group-hover/col1:text-neutral-300">
              A 20-year-old developer bridging complex server infrastructures with gorgeous interactive frontend code — writing fast, secure web systems built to handle heavy user traffic.
            </p>
          </div>
        </div>

        {/* ── Column 2: How I Build Systems ── */}
        <div 
          ref={cardRef2}
          onMouseMove={handleMouseMove2}
          className="relative p-10 flex flex-col justify-center lg:col-span-3 min-h-[320px] overflow-hidden group/col2 transition-all duration-500"
        >
          {/* Spotlight Glow */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover/col2:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(350px circle at ${coords2.x}px ${coords2.y}px, rgba(249, 115, 22, 0.045), transparent 80%)`,
            }}
          />

          {/* Cyberpunk Grid Grid Pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] opacity-25 group-hover/col2:opacity-40 transition-opacity duration-500 z-0" />

          {/* Top Accent Orange Glow Bar */}
          <div className="absolute top-0 left-0 w-0 group-hover/col2:w-full h-[2px] bg-gradient-to-r from-orange-500/40 via-amber-500/20 to-transparent transition-all duration-700" />

          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-medium text-orange-500/80 tracking-[0.3em] uppercase group-hover/col2:text-orange-400 transition-colors duration-300">
                // HOW I BUILD SYSTEMS
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover/col2:opacity-100 transition-opacity duration-500 font-mono text-[9px] text-neutral-500">
                <span>PIPELINE: ACTIVE</span>
              </div>
            </div>
            
            <div className="relative flex flex-col gap-6 pl-4 border-l border-white/[0.06]">
              {/* Animated active line */}
              <div 
                className="absolute left-[-1.5px] top-0 w-[2px] bg-gradient-to-b from-orange-500 to-amber-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-500 ease-out" 
                style={{
                  height: pipelineStep === null ? "0%" : `${((pipelineStep + 1) / 4) * 100}%`
                }}
              />
              
              {pipelineSteps.map((step, index) => {
                const isActive = pipelineStep === index;
                return (
                  <Link
                    key={step.label}
                    href={`/projects?filter=${step.filter}`}
                    onMouseEnter={() => setPipelineStep(index)}
                    onMouseLeave={() => setPipelineStep(null)}
                    className="relative flex flex-col gap-1 cursor-pointer group"
                  >
                    {/* Node dot with pulsing ring on active */}
                    <div 
                      className={`absolute -left-[22px] top-[5px] w-[9px] h-[9px] rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-orange-500 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)] scale-110"
                          : "border-neutral-700 bg-black group-hover:border-neutral-500"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute -inset-1.5 rounded-full border border-orange-500/40 animate-ping opacity-75" />
                      )}
                    </div>
                    
                    <span className={`text-[10px] font-mono tracking-[0.2em] transition-colors duration-200 ${
                      isActive ? "text-orange-400 font-semibold" : "text-neutral-600 group-hover:text-neutral-500"
                    }`}>
                      {step.label}
                    </span>
                    <span className={`text-sm md:text-[15px] font-author font-normal leading-tight transition-colors duration-200 ${
                      isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                    }`}>
                      {step.desc}
                    </span>
                    
                    {/* Expandable details styling */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isActive ? "max-h-6 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}>
                      <span className="text-[10px] font-mono text-orange-400/90 leading-none bg-orange-500/5 px-2 py-0.5 rounded border border-orange-500/10">
                        ↳ {step.details}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Column 3: Full-Stack Architecture ── */}
        <div className="relative p-10 flex flex-col justify-center lg:col-span-4 min-h-[320px] overflow-hidden group/col3 transition-all duration-500">
          {/* Top Accent Orange Glow Bar */}
          <div className="absolute top-0 left-0 w-0 group-hover/col3:w-full h-[2px] bg-gradient-to-r from-orange-500/40 via-amber-500/20 to-transparent transition-all duration-700" />
          
          <div className="relative z-10 flex flex-col gap-5 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-medium text-orange-500/80 tracking-[0.3em] uppercase group-hover/col3:text-orange-400 transition-colors duration-300">
                // FULL-STACK ARCHITECTURE
              </span>
            </div>

            <div className="flex flex-col gap-[10px] w-full">
              {stackLayers.map((layer, i) => (
                <ArchitectureCard
                  key={layer.label}
                  layer={layer}
                  isActive={activeLayer === i}
                  onMouseEnter={() => setActiveLayer(i)}
                  onMouseLeave={() => setActiveLayer(null)}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroBento;
