"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { projectsData } from "@/utils/projectData";

const categories = [
  { id: "all", label: "ALL DISPATCHES" },
  { id: "systems", label: "SYSTEMS & KERNEL" },
  { id: "cloud", label: "CLOUD & MATRIX" },
  { id: "data", label: "AI & PIPELINES" },
  { id: "web", label: "WEB UTILITIES" }
];

function ProjectsGallery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Set default active tab based on query param or 'all'
  const filterQuery = searchParams ? (searchParams.get("filter") || "all") : "all";
  const [activeCategory, setActiveCategory] = useState<string>(filterQuery);

  useEffect(() => {
    setActiveCategory(filterQuery);
  }, [filterQuery]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    // Push state without page refresh
    router.push(`/projects?filter=${catId}`, { scroll: false });
  };

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });

  return (
    <div className="relative min-h-screen bg-[#070707] text-white flex flex-col select-none overflow-hidden pt-32">
      {/* Background Matrix Orange Line Grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(249, 115, 22, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Radial ambient glow */}
      <div className="absolute top-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-24">
        
        {/* Header Header */}
        <div className="mb-14">
          <span className="font-mono text-xs font-semibold text-orange-500 tracking-[0.35em] uppercase block mb-3 animate-[pulse_3s_infinite]">
            DATABASE / SELECTED WORK
          </span>
          <h1 className="font-author text-5xl md:text-7xl font-normal tracking-tight text-white leading-none">
            Selected <em className="italic font-serif text-orange-400">Engineering</em>
          </h1>
          <p className="font-author text-base text-neutral-400 font-light mt-4 max-w-xl leading-relaxed">
            A comprehensive registry of {projectsData.length} active dispatches, detailing backend orchestrations, AWS cloud topology nodes, offline LLMs, and low-latency database engines.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 border-b border-white/5 pb-6 mb-10 font-mono text-[11px] md:text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 border rounded-full tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "border-orange-500 bg-orange-500/10 text-orange-400 font-bold shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                  : "border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <a
              key={project.id}
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-white/[0.06] rounded-2xl bg-[#0d0d0d]/80 backdrop-blur-md p-6 flex flex-col justify-between h-[340px] shadow-[0_15px_45px_rgba(0,0,0,0.6)] hover:border-orange-500/30 hover:shadow-[0_15px_45px_rgba(249,115,22,0.06)] hover:scale-[1.01] transition-all duration-500 cursor-pointer select-text overflow-hidden relative"
            >
              <div className="flex items-center justify-between mb-4 pointer-events-none select-none">
                <span className="text-[10px] font-mono font-bold text-neutral-500 tracking-[0.2em] uppercase">
                  {project.category} / DISPATCH {project.id.slice(0, 3)}
                </span>
                <span className="text-[10px] font-mono text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1">
                  EXPLORE
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
                  </svg>
                </span>
              </div>

              {/* Title & Role */}
              <div className="mb-2 select-none pointer-events-none">
                <h3 className="font-author text-2.5xl font-semibold text-white tracking-tight group-hover:text-orange-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-orange-400 font-mono text-[11px] uppercase tracking-wider mt-1">
                  {project.role}
                </p>
              </div>

              {/* Description */}
              <p className="font-author text-sm text-neutral-400 leading-relaxed font-light mb-4 select-text">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1 mb-4 select-none pointer-events-none">
                {project.tech.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-mono px-2 py-[2px] rounded border border-white/5 bg-white/[0.01] text-neutral-500 group-hover:border-orange-500/10 group-hover:text-neutral-300 transition-colors duration-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* System Telemetry Metrics */}
              {project.metrics && (
                <div className="border-t border-white/[0.04] pt-3 flex justify-between font-mono text-xs text-neutral-600 select-none pointer-events-none">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col">
                      <span className="text-neutral-500/70 text-[11px] tracking-wider">{metric.label}</span>
                      <span className="text-xs text-neutral-400 group-hover:text-orange-400 transition-colors duration-300 mt-0.5">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredProjects.length === 0 && (
          <div className="border border-dashed border-white/10 rounded-2xl py-20 text-center font-mono text-xs text-neutral-500">
            NO DISPATCH NODES REGISTERED UNDER THIS NODE SPEC.
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}

export default function ProjectsPageClient() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center font-mono text-xs select-none">
          CONNECTING CORE REGISTRY ENGINE...
        </div>
      }>
        <ProjectsGallery />
      </Suspense>
    </>
  );
}
