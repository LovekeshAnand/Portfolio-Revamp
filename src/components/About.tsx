"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const [activeStackTab, setActiveStackTab] = useState<string>("all");
  const [resumeOpen, setResumeOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Refs for direct DOM class/style updates to prevent whole-page React re-renders on scroll
  const highlight1Ref = useRef<HTMLSpanElement>(null);
  const highlight2Ref = useRef<HTMLSpanElement>(null);
  const underline2Ref = useRef<HTMLSpanElement>(null);
  const bento1Ref = useRef<HTMLDivElement>(null);
  const bento1TitleRef = useRef<HTMLHeadingElement>(null);
  const bento2Ref = useRef<HTMLDivElement>(null);
  const bento2TitleRef = useRef<HTMLHeadingElement>(null);
  const timelineCardRef = useRef<HTMLDivElement>(null);
  const timelineDotRef = useRef<HTMLDivElement>(null);
  const timelineTitleRef = useRef<HTMLHeadingElement>(null);
  const achievementsCardRef = useRef<HTMLDivElement>(null);
  const resumeCardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const aboutStart = viewportHeight * 0.2;
      const aboutDuration = viewportHeight * 3.3;
      const progress = (scrollY - aboutStart) / aboutDuration;
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // 1. scrollProgress > 0.15
      if (highlight1Ref.current) {
        if (clampedProgress > 0.15) {
          highlight1Ref.current.className = "transition-all duration-700 text-orange-400 font-normal italic";
        } else {
          highlight1Ref.current.className = "transition-all duration-700 text-white";
        }
      }

      // 2. scrollProgress > 0.22
      if (highlight2Ref.current) {
        if (clampedProgress > 0.22) {
          highlight2Ref.current.className = "relative inline-block transition-all duration-700 font-normal text-orange-400";
        } else {
          highlight2Ref.current.className = "relative inline-block transition-all duration-700 font-normal text-white";
        }
      }
      if (underline2Ref.current) {
        if (clampedProgress > 0.22) {
          underline2Ref.current.className = "absolute left-0 right-0 bottom-1 h-[1.5px] bg-orange-500 rounded-full transition-transform duration-500 origin-left scale-x-100";
        } else {
          underline2Ref.current.className = "absolute left-0 right-0 bottom-1 h-[1.5px] bg-orange-500 rounded-full transition-transform duration-500 origin-left scale-x-0";
        }
      }

      // 3. scrollProgress > 0.32
      if (bento1Ref.current) {
        if (clampedProgress > 0.32) {
          bento1Ref.current.className = "p-4 border rounded-xl transition-all duration-700 backdrop-blur-md border-orange-500/30 bg-black/60 text-neutral-200 shadow-[6px_6px_0px_rgba(249,115,22,0.08)]";
        } else {
          bento1Ref.current.className = "p-4 border rounded-xl transition-all duration-700 backdrop-blur-md border-white/5 bg-white/[0.01] text-neutral-400";
        }
      }
      if (bento1TitleRef.current) {
        if (clampedProgress > 0.32) {
          bento1TitleRef.current.className = "text-xs font-medium tracking-[0.2em] uppercase mb-3 transition-colors duration-500 text-orange-400";
        } else {
          bento1TitleRef.current.className = "text-xs font-medium tracking-[0.2em] uppercase mb-3 transition-colors duration-500 text-neutral-400";
        }
      }

      // 4. scrollProgress > 0.38
      if (bento2Ref.current) {
        if (clampedProgress > 0.38) {
          bento2Ref.current.className = "p-4 border rounded-xl transition-all duration-700 backdrop-blur-md border-orange-500/30 bg-black/60 text-neutral-200 shadow-[6px_6px_0px_rgba(249,115,22,0.08)]";
        } else {
          bento2Ref.current.className = "p-4 border rounded-xl transition-all duration-700 backdrop-blur-md border-white/5 bg-white/[0.01] text-neutral-400";
        }
      }
      if (bento2TitleRef.current) {
        if (clampedProgress > 0.38) {
          bento2TitleRef.current.className = "text-xs font-medium tracking-[0.2em] uppercase mb-3 transition-colors duration-500 text-orange-400";
        } else {
          bento2TitleRef.current.className = "text-xs font-medium tracking-[0.2em] uppercase mb-3 transition-colors duration-500 text-neutral-400";
        }
      }

      // 5. scrollProgress > 0.58
      if (timelineCardRef.current) {
        if (clampedProgress > 0.58) {
          timelineCardRef.current.className = "relative transition-all duration-700 p-4 rounded-xl backdrop-blur-md border bg-white/[0.02] border-orange-500/40 shadow-[4px_4px_0px_rgba(249,115,22,0.08)]";
        } else {
          timelineCardRef.current.className = "relative transition-all duration-700 p-4 rounded-xl backdrop-blur-md border bg-white/[0.01] border-white/5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]";
        }
      }
      if (timelineDotRef.current) {
        if (clampedProgress > 0.58) {
          timelineDotRef.current.className = "absolute -left-[31px] top-5.5 w-4 h-4 rounded-full border-2 bg-black transition-all duration-500 border-orange-500 scale-110";
        } else {
          timelineDotRef.current.className = "absolute -left-[31px] top-5.5 w-4 h-4 rounded-full border-2 bg-black transition-all duration-500 border-neutral-700";
        }
      }
      if (timelineTitleRef.current) {
        if (clampedProgress > 0.58) {
          timelineTitleRef.current.className = "font-author text-lg font-semibold mt-1 transition-colors duration-500 text-orange-400";
        } else {
          timelineTitleRef.current.className = "font-author text-lg font-semibold mt-1 transition-colors duration-500 text-white";
        }
      }

      // 6. scrollProgress > 0.65
      if (achievementsCardRef.current) {
        if (clampedProgress > 0.65) {
          achievementsCardRef.current.className = "border p-5 relative group transition-all duration-700 rounded-xl backdrop-blur-md border-orange-500/40 bg-white/[0.02] shadow-[6px_6px_0px_rgba(249,115,22,0.08)] text-white";
        } else {
          achievementsCardRef.current.className = "border p-5 relative group transition-all duration-700 rounded-xl backdrop-blur-md border-white/5 bg-white/[0.01] text-neutral-400";
        }
      }

      // 7. scrollProgress > 0.72
      if (resumeCardRef.current) {
        if (clampedProgress > 0.72) {
          resumeCardRef.current.className = "group relative w-full rounded-xl overflow-hidden border transition-all duration-700 text-left border-orange-500/40 shadow-[12px_12px_0px_rgba(249,115,22,0.08)] hover:border-orange-500/50 hover:shadow-[0_12px_48px_rgba(249,115,22,0.15)] hover:scale-[1.01] cursor-pointer";
        } else {
          resumeCardRef.current.className = "group relative w-full rounded-xl overflow-hidden border transition-all duration-700 text-left border-white/5 shadow-[12px_12px_0px_rgba(0,0,0,0.2)] hover:border-orange-500/50 hover:shadow-[0_12px_48px_rgba(249,115,22,0.15)] hover:scale-[1.01] cursor-pointer";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial state run

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(() => {
    const headings = gsap.utils.toArray<HTMLElement>(".about-heading-reveal");
    headings.forEach((heading) => {
      gsap.fromTo(heading.querySelectorAll("span > span"), {
        y: "100%"
      }, {
        y: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });

    // Fade-in technology grid cards on scroll
    gsap.fromTo(".about-fade-in", {
      opacity: 0,
      y: 35
    }, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-fade-in-trigger",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: sectionRef });

  const skillCategories = [
    {
      id: "languages",
      title: "Languages",
      skills: ["JavaScript", "Python", "C", "Bash", "HTML", "CSS"]
    },
    {
      id: "backend",
      title: "Backend Systems",
      skills: ["Node.js", "Express.js", "FastAPI", "Prisma ORM", "REST APIs", "JWT Auth", "RBAC"]
    },
    {
      id: "frontend",
      title: "Frontend Engineering",
      skills: ["React.js", "Next.js", "Vite", "Tailwind CSS"]
    },
    {
      id: "cloud",
      title: "Cloud & Security",
      skills: ["AWS EC2", "Jenkins (CI/CD)", "PM2", "OpenVPN", "DNS Routing", "API Security", "Linux Server Admin"]
    },
    {
      id: "databases",
      title: "Databases & Ops",
      skills: ["PostgreSQL", "MongoDB", "SQLite", "Git / GitHub", "Postman", "WebSockets", "Performance Monitoring"]
    }
  ];

  const allSkills = skillCategories.flatMap(cat => cat.skills);

  return (
    <div ref={sectionRef} className="relative bg-neutral-950 text-neutral-200 border-t border-white/5">

      {/* â”€â”€ SECTION 01: ABOUT ME (PROFILE) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="about" className="relative grid grid-cols-1 lg:grid-cols-12 border-b border-white/5 z-10">
        
        {/* Sticky Column Left */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/5 p-8 md:p-12 lg:sticky lg:top-24 h-fit">
          <span className="font-sans text-xs font-medium text-orange-500 tracking-[0.3em] uppercase block mb-3">
            01 / PROFILE
          </span>
          <h2 className="about-heading-reveal font-author text-5xl md:text-6.5vw xl:text-6rem font-normal tracking-tight text-white leading-none">
            <span className="block overflow-hidden"><span className="block translate-y-[100%] transition-transform duration-100">About</span></span>
            <span className="block overflow-hidden"><span className="block translate-y-[100%] transition-transform duration-100"><em className="italic font-serif text-orange-400">Me</em></span></span>
          </h2>
          <p className="font-author text-sm text-neutral-400 font-normal mt-4 leading-relaxed max-w-xs">
            A 20-year-old full-stack developer who builds products end-to-end — from UIs to the cloud infrastructure behind them.
          </p>
        </div>

        {/* Dynamic Content Right with Sleek Dark Glassmorphism Backing */}
        <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-center select-text bg-black/40 backdrop-blur-md border-b lg:border-b-0 lg:border-l border-white/5">
          {/* Chronatic Color-Shift Text Sync with Scroll */}
          <p className="font-author text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.2] text-white tracking-normal font-normal mb-8 max-w-4xl transition-colors duration-500">
            I am a <span ref={highlight1Ref} className="transition-all duration-700 text-white">20-year-old full-stack developer</span> with a growing obsession for the infrastructure that powers software. I don't just write code — I care deeply about <span ref={highlight2Ref} className="relative inline-block transition-all duration-700 font-normal text-white">
              how it deploys, scales, and survives
              <span ref={underline2Ref} className="absolute left-0 right-0 bottom-1 h-[1.5px] bg-orange-500 rounded-full transition-transform duration-500 origin-left scale-x-0" />
            </span> — designing architectures that run efficiently under real CPU, memory, and network pressure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8 mt-4 font-author">
            {/* Core Philosophy dynamic highlight */}
            <div ref={bento1Ref} className="p-4 border rounded-xl transition-all duration-700 backdrop-blur-md border-white/5 bg-white/[0.01] text-neutral-400">
              <h4 ref={bento1TitleRef} className="text-xs font-medium tracking-[0.2em] uppercase mb-3 transition-colors duration-500 text-neutral-400">CORE PHILOSOPHY</h4>
              <p className="text-sm leading-relaxed font-light">
                I believe the best engineers understand what happens after `git push`. Great products are shaped by their deployment constraints — the right caching strategy, a well-tuned reverse proxy, and a resilient CI/CD pipeline make all the difference.
              </p>
            </div>

            {/* What I Do dynamic highlight */}
            <div ref={bento2Ref} className="p-4 border rounded-xl transition-all duration-700 backdrop-blur-md border-white/5 bg-white/[0.01] text-neutral-400">
              <h4 ref={bento2TitleRef} className="text-xs font-medium tracking-[0.2em] uppercase mb-3 transition-colors duration-500 text-neutral-400">WHAT I DO</h4>
              <p className="text-sm leading-relaxed font-light">
                Building full-stack web applications with React, Next.js, and Node.js — while managing the cloud infrastructure they live on. Currently configuring AWS EC2 instances, automating Jenkins pipelines, and hardening OpenVPN gateways at EaseInfra.
              </p>
            </div>
          </div>
        </div>

      </section> 

      {/* â”€â”€ SECTION 02: TECH STACK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="stack" className="relative grid grid-cols-1 lg:grid-cols-12 border-b border-white/5 z-10">
        
        {/* Sticky Column Left */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/5 p-8 md:p-12 lg:sticky lg:top-24 h-fit">
          <span className="font-sans text-xs font-medium text-orange-500 tracking-[0.3em] uppercase block mb-3">
            02 / TOOLKIT
          </span>
          <h2 className="about-heading-reveal font-author text-5xl md:text-6.5vw xl:text-6rem font-normal tracking-tight text-white leading-none">
            <span className="block overflow-hidden"><span className="block translate-y-[100%] transition-transform duration-100">Tech</span></span>
            <span className="block overflow-hidden"><span className="block translate-y-[100%] transition-transform duration-100"><em className="italic font-serif text-orange-400">Stack</em></span></span>
          </h2>
          
          {/* Tab filter triggers */}
          <div className="flex flex-col gap-2 mt-8 font-sans">
            <button 
              onClick={() => setActiveStackTab("all")}
              className={`text-left text-xs font-medium tracking-[0.2em] uppercase py-2 transition-all duration-300 ${
                activeStackTab === "all" ? "text-orange-400 translate-x-2" : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              // Show All Stack ({allSkills.length})
            </button>
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveStackTab(cat.id)}
                className={`text-left text-xs font-medium tracking-[0.2em] uppercase py-2 transition-all duration-300 ${
                  activeStackTab === cat.id ? "text-orange-400 translate-x-2" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {cat.title} ({cat.skills.length})
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Right */}
        <div className="lg:col-span-8 p-8 md:p-16 about-fade-in-trigger">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skillCategories.map((category) => {
              const isFiltered = activeStackTab !== "all" && activeStackTab !== category.id;
              return category.skills.map((skill) => (
                <div
                  key={skill}
                  className={`about-fade-in border border-white/5 p-6 flex flex-col justify-between aspect-[1.4] transition-all duration-500 bg-white/[0.01] backdrop-blur-md relative overflow-hidden select-none group ${
                    isFiltered ? "opacity-25 scale-95" : "opacity-100 hover:border-orange-500/40 hover:shadow-[8px_8px_0px_rgba(249,115,22,0.08)]"
                  }`}
                >
                  <span className="text-[10px] font-medium text-neutral-400 tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-orange-400">
                    {category.title}
                  </span>
                  <h3 className="font-author text-2xl md:text-3xl text-white font-normal mt-4 transition-transform duration-300 group-hover:translate-x-1">
                    {skill}
                  </h3>
                  <div className="absolute right-3 bottom-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-mono text-xs text-orange-500 font-medium">✓</span>
                  </div>
                </div>
              ));
            })}
          </div>
        </div>

      </section>

      {/* â”€â”€ SECTION 03: INTERACTIVE RESUME & TIMELINE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="experience" className="relative grid grid-cols-1 lg:grid-cols-12 z-10">
        
        {/* Sticky Column Left */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/5 p-8 md:p-12 lg:sticky lg:top-24 h-fit">
          <span className="font-sans text-xs font-medium text-orange-500 tracking-[0.3em] uppercase block mb-3">
            03 / DOSSIER
          </span>
          <h2 className="about-heading-reveal font-author text-5xl md:text-6.5vw xl:text-6rem font-normal tracking-tight text-white leading-none">
            <span className="block overflow-hidden"><span className="block translate-y-[100%] transition-transform duration-100">Experience</span></span>
            <span className="block overflow-hidden"><span className="block translate-y-[100%] transition-transform duration-100"><em className="italic font-serif text-orange-400">&amp; Resume</em></span></span>
          </h2>
        </div>

        {/* Dynamic Content Right */}
        <div className="lg:col-span-8 p-8 md:p-16 grid grid-cols-1 xl:grid-cols-12 gap-12 select-text bg-black/40 backdrop-blur-md lg:border-l border-white/5">
          {/* Column A: Timeline */}
          <div className="xl:col-span-5 flex flex-col gap-12">
            
            {/* TIMELINE EXPERIENCES */}
            <div>
              <h3 className="text-xs font-medium text-neutral-400 tracking-[0.25em] uppercase mb-6 flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                PROFESSIONAL EXPERIENCE
              </h3>
              
              <div className="relative border-l border-white/5 pl-6 ml-2 flex flex-col gap-8">
                
                {/* Job 1: EaseInfra */}
                <div ref={timelineCardRef} className="relative transition-all duration-700 p-4 rounded-xl backdrop-blur-md border bg-white/[0.01] border-white/5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                  <div ref={timelineDotRef} className="absolute -left-[31px] top-5.5 w-4 h-4 rounded-full border-2 bg-black transition-all duration-500 border-neutral-700" />
                  <span className="text-[10px] font-medium text-neutral-400 tracking-wider">
                    DEC 2025 – PRESENT · IN-OFFICE
                  </span>
                  <h4 ref={timelineTitleRef} className="font-author text-lg font-semibold mt-1 transition-colors duration-500 text-white">
                    IT Intern
                  </h4>
                  <p className="text-xs font-semibold text-orange-400 tracking-wide">
                    EaseInfra
                  </p>
                  <ul className="text-xs text-neutral-400 mt-3 flex flex-col gap-2 list-disc pl-4 leading-relaxed font-light">
                    <li>Manage <strong className="text-neutral-200 font-medium">AWS EC2</strong>, VPC configs, and security groups.</li>
                    <li>Configure <strong className="text-neutral-200 font-medium">OpenVPN</strong> secure admin gateways.</li>
                    <li>Deploy Node.js microservices with <strong className="text-neutral-200 font-medium">PM2</strong>.</li>
                    <li>Set CI/CD automation with <strong className="text-neutral-200 font-medium">Jenkins</strong>.</li>
                    <li>Handle port conflict and DNS production debugging.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div>
              <h3 className="text-xs font-medium text-neutral-400 tracking-[0.25em] uppercase mb-4 flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                ACHIEVEMENTS
              </h3>
              <div ref={achievementsCardRef} className="border p-5 relative group transition-all duration-700 rounded-xl backdrop-blur-md border-white/5 bg-white/[0.01] text-neutral-400">
                <span className="text-[10px] font-medium text-neutral-400 tracking-wider block">
                  IIT JANAKPURI · HACKATHON WINNER
                </span>
                <h4 className="font-author text-sm font-semibold text-white mt-1">
                  Winner, Matrix 3.0
                </h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-light">
                  Clinched the 1st position at the prestigious 36-hour physical hackathon in Delhi. Explore my project profile on{" "}
                  <a 
                    href="https://matrix-3.devfolio.co/projects" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-400 font-medium hover:underline"
                  >
                    Devfolio
                  </a>.
                </p>
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <h3 className="text-xs font-medium text-neutral-400 tracking-[0.25em] uppercase mb-4 flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                EDUCATION
              </h3>
              <div className="flex flex-col gap-4 pl-2">
                <div>
                  <span className="text-[10px] font-medium text-neutral-400 tracking-wider">
                    2023 – 2027 · ROHTAK
                  </span>
                  <h4 className="font-author text-sm font-semibold text-white mt-0.5">
                    B.Tech in Computer Science
                  </h4>
                  <p className="text-xs text-neutral-400 font-light">
                    Maharishi Dayanand University
                  </p>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <span className="text-[10px] font-medium text-neutral-400 tracking-wider">
                    COMPLETED MAY 2023 · NEW DELHI
                  </span>
                  <h4 className="font-author text-sm font-semibold text-white mt-0.5">
                    Secondary &amp; Senior Secondary (CBSE)
                  </h4>
                  <p className="text-xs text-neutral-400 font-light">
                    Andhra Education Society School
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Column B: Resume Image */}
          <div className="xl:col-span-7 flex flex-col gap-4">
            <h3 className="text-xs font-medium text-neutral-400 tracking-[0.25em] uppercase mb-2 flex items-center font-author">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
              RESUME
            </h3>

            {/* Resume image card — click to expand lightbox */}
            <button
              ref={resumeCardRef}
              onClick={() => setResumeOpen(true)}
              className="group relative w-full rounded-xl overflow-hidden border transition-all duration-700 text-left border-white/5 shadow-[12px_12px_0px_rgba(0,0,0,0.2)] hover:border-orange-500/50 hover:shadow-[0_12px_48px_rgba(249,115,22,0.15)] hover:scale-[1.01] cursor-pointer"
              aria-label="View full resume"
            >
              <Image
                src="/images/resume.jpg"
                alt="Lovekesh Anand Resume"
                width={794}
                height={1123}
                className="w-full h-auto block"
                priority
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full border border-orange-500/60 flex items-center justify-center bg-orange-500/10">
                  <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-orange-400">Click to expand</span>
              </div>
            </button>

            {/* Open in new tab link */}
            <a
              href="https://drive.google.com/file/d/1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-neutral-600 hover:text-orange-400 transition-colors duration-200 w-fit"
            >
              Open in new tab
              <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
              </svg>
            </a>
          </div>

          {/* Resume Lightbox */}
          {resumeOpen && (
            <div
              className="fixed inset-0 z-[999] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setResumeOpen(false)}
            >
              <div
                className="relative max-w-2xl w-full max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src="/images/resume.jpg"
                  alt="Lovekesh Anand Resume — Full View"
                  width={794}
                  height={1123}
                  className="w-full h-auto block rounded-2xl"
                  priority
                />
                {/* Close button */}
                <button
                  onClick={() => setResumeOpen(false)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-orange-500/40 transition-all duration-200"
                  aria-label="Close resume"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
                {/* Open in tab */}
                <a
                  href="https://drive.google.com/file/d/1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/20 text-[10px] font-mono tracking-widest uppercase text-neutral-300 hover:text-orange-400 hover:border-orange-500/40 transition-all duration-200"
                >
                  Open ↗
                </a>
              </div>
            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default About;

