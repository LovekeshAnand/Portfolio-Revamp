"use client";

import React, { useState, useEffect } from "react";

const HeroBento = () => {
  const [pipelineStep, setPipelineStep] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);


  const pipelineSteps = [
    { label: "01 / RESEARCH", desc: "Bottleneck & constraint audit", details: "SLA specs, CPU limits, & DB schemas", filter: "systems" },
    { label: "02 / DECISIONS", desc: "Stack & architectural design", details: "Cache layers, indexing, & proxy routing", filter: "systems" },
    { label: "03 / DEVELOPMENT", desc: "Full-stack performance build", details: "React frontends, Node APIs, state sync", filter: "web" },
    { label: "04 / CLOUD INFRA", desc: "CI/CD automated deployment", details: "Jenkins, AWS EC2, & OpenVPN gateways", filter: "cloud" }
  ];

  const stackLayers = [
    {
      label: "CLIENT LAYER",
      tech: ["React.js", "Next.js", "Tailwind CSS"],
      desc: "SSR rendered UI",
      filter: "web"
    },
    {
      label: "API LAYER",
      tech: ["Node.js", "Express.js", "JWT Auth"],
      desc: "Rate-limited endpoints",
      filter: "systems"
    },
    {
      label: "DATA LAYER",
      tech: ["PostgreSQL", "MongoDB", "Prisma ORM"],
      desc: "Indexed schemas",
      filter: "data"
    },
    {
      label: "INFRA LAYER",
      tech: ["AWS EC2", "PM2 Cluster", "OpenVPN"],
      desc: "Zero-downtime deploy",
      filter: "cloud"
    }
  ];

  return (
    <div className="relative z-10 w-full border-t border-b border-white/10 bg-black select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06] text-left text-neutral-300">
        
        {/* ── Column 1: Core Value Statement ── */}
        <div className="p-10 flex flex-col justify-center lg:col-span-5 gap-5 min-h-[240px]">
          <span className="text-[8px] font-mono font-medium text-orange-500/70 tracking-[0.3em] uppercase">
            // CORE VALUE STATEMENT
          </span>
          <h3 className="font-author text-[1.6rem] md:text-[1.85rem] font-light text-white leading-[1.25] tracking-tight">
            I build reliable system architecture &amp; elegant user experiences.
          </h3>
          <p className="font-author text-[11.5px] text-neutral-500 font-normal leading-relaxed max-w-sm">
            A 20-year-old developer bridging complex server infrastructures with gorgeous interactive frontend code — writing fast, secure web systems built to handle heavy user traffic.
          </p>
        </div>

        {/* ── Column 2: How I Build Systems ── */}
        <div className="p-10 flex flex-col justify-between lg:col-span-3 min-h-[240px]">
          <div className="flex flex-col gap-5">
            <span className="text-[8px] font-mono font-medium text-orange-500/70 tracking-[0.3em] uppercase">
              // HOW I BUILD SYSTEMS
            </span>
            
            <div className="relative flex flex-col gap-5 pl-4 border-l border-white/[0.06]">
              {/* Animated active line */}
              <div 
                className="absolute left-[-1px] top-0 w-px bg-gradient-to-b from-orange-500 to-orange-500/0 transition-all duration-500 ease-out" 
                style={{
                  height: pipelineStep === null ? "0%" : `${((pipelineStep + 1) / 4) * 100}%`
                }}
              />
              
              {pipelineSteps.map((step, index) => {
                const isActive = pipelineStep === index;
                return (
                  <a
                    key={step.label}
                    href={`/projects?filter=${step.filter}`}
                    onMouseEnter={() => setPipelineStep(index)}
                    onMouseLeave={() => setPipelineStep(null)}
                    className="relative flex flex-col gap-0.5 cursor-pointer group block"
                  >
                    {/* Node dot */}
                    <div 
                      className={`absolute -left-[21px] top-[5px] w-[7px] h-[7px] rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-orange-500 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)] scale-110"
                          : "border-neutral-700 bg-black"
                      }`}
                    />
                    
                    <span className={`text-[8px] font-mono tracking-[0.2em] transition-colors duration-200 ${
                      isActive ? "text-orange-400 font-bold" : "text-neutral-600"
                    }`}>
                      {step.label}
                    </span>
                    <span className={`text-[12px] font-author font-normal leading-tight transition-colors duration-200 ${
                      isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                    }`}>
                      {step.desc}
                    </span>
                    
                    {/* Expandable details */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isActive ? "max-h-5 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                    }`}>
                      <span className="text-[9px] font-mono text-orange-400/70 leading-none">
                        ↳ {step.details}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          

        </div>

        {/* ── Column 3: Full-Stack Architecture ── */}
        <div className="p-10 flex flex-col justify-between lg:col-span-4 min-h-[240px]">
          <div className="flex flex-col gap-4">
            <span className="text-[8px] font-mono font-medium text-orange-500/70 tracking-[0.3em] uppercase">
              // FULL-STACK ARCHITECTURE
            </span>

            <div className="flex flex-col gap-[5px]">
              {stackLayers.map((layer, i) => {
                const isActive = activeLayer === i;
                return (
                  <a
                    key={layer.label}
                    href={`/projects?filter=${layer.filter}`}
                    onMouseEnter={() => setActiveLayer(i)}
                    onMouseLeave={() => setActiveLayer(null)}
                    className={`block border rounded-md px-3.5 py-2.5 transition-all duration-250 cursor-pointer ${
                      isActive
                        ? "border-orange-500/40 bg-orange-500/[0.05] shadow-[0_0_16px_rgba(249,115,22,0.08)]"
                        : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[8px] font-mono tracking-[0.2em] font-medium transition-colors duration-200 ${
                        isActive ? "text-orange-400" : "text-neutral-500"
                      }`}>
                        {layer.label}
                      </span>
                      <span className={`text-[8px] font-mono transition-colors duration-200 ${
                        isActive ? "text-neutral-400" : "text-neutral-700"
                      }`}>
                        {layer.desc}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {layer.tech.map((t) => (
                        <span
                          key={t}
                          className={`text-[9px] font-mono px-2 py-[2px] rounded border transition-all duration-200 ${
                            isActive
                              ? "border-orange-500/25 text-neutral-200 bg-orange-500/5"
                              : "border-white/5 text-neutral-500 bg-white/[0.02]"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>


        </div>

      </div>
    </div>
  );
};

export default HeroBento;
