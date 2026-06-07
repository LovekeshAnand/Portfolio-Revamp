"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { projectsData } from "@/utils/projectData";

const categories = [
  { id: "all", label: "ALL PROJECTS" },
  { id: "ai", label: "AI & LOCAL LLM" },
  { id: "web", label: "WEB PLATFORMS" },
  { id: "tools", label: "TOOLS & PACKAGES" },
];

// GitHub icon SVG
const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

// External link icon SVG
const ExternalIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
  </svg>
);

function ProjectsGallery() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterQuery = searchParams ? (searchParams.get("filter") || "all") : "all";
  const [activeCategory, setActiveCategory] = useState<string>(filterQuery);

  useEffect(() => {
    setActiveCategory(filterQuery);
  }, [filterQuery]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
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

        {/* Page Header */}
        <div className="mb-14">
          <h1 className="font-author text-5xl md:text-7xl font-normal tracking-tight text-white leading-none">
            All <em className="italic font-serif text-orange-400">projects</em>
          </h1>
          <p className="font-author text-base text-neutral-400 font-light mt-5 max-w-xl leading-relaxed">
            {projectsData.length} projects — from offline AI pipelines and legal platforms to multiplayer games and developer tools.
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

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group border border-white/[0.06] rounded-2xl bg-[#0d0d0d]/80 backdrop-blur-md p-6 flex flex-col shadow-[0_15px_45px_rgba(0,0,0,0.6)] hover:border-orange-500/30 hover:shadow-[0_15px_45px_rgba(249,115,22,0.06)] hover:scale-[1.01] transition-all duration-500 select-text overflow-hidden relative"
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-5 pointer-events-none select-none">
                <span className="text-[10px] font-mono font-bold text-neutral-500 tracking-[0.2em] uppercase">
                  {project.category}
                </span>
              </div>

              {/* Title & Role */}
              <div className="mb-3 select-none pointer-events-none">
                <h3 className="font-author text-2xl font-semibold text-white tracking-tight group-hover:text-orange-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-orange-400/80 font-mono text-[11px] uppercase tracking-wider mt-1.5">
                  {project.role}
                </p>
              </div>

              {/* Description */}
              <p className="font-author text-sm text-neutral-400 leading-relaxed font-light mb-4 flex-1 select-text">
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

              {/* Metrics */}
              {project.metrics && (
                <div className="border-t border-white/[0.04] pt-3 flex justify-between font-mono text-xs text-neutral-600 select-none pointer-events-none mb-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col">
                      <span className="text-neutral-500/70 text-[10px] tracking-wider">{metric.label}</span>
                      <span className="text-xs text-neutral-400 group-hover:text-orange-400 transition-colors duration-300 mt-0.5">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/[0.04]">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-neutral-400 hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    <GithubIcon />
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-orange-400 hover:text-orange-300 border border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/5 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    <ExternalIcon />
                    Live Site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="border border-dashed border-white/10 rounded-2xl py-20 text-center font-mono text-xs text-neutral-500">
            NO PROJECTS FOUND IN THIS CATEGORY.
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
          LOADING PROJECTS...
        </div>
      }>
        <ProjectsGallery />
      </Suspense>
    </>
  );
}
