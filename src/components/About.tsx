"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  skills: string[];
  desc: string;
  icon: React.ReactNode;
}

const TechCard = ({
  category,
  index,
  isLast,
}: {
  category: SkillCategory;
  index: number;
  isLast: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`about-fade-in relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-900/10 p-6 md:p-8 backdrop-blur-md transition-all duration-500 group hover:border-orange-500/30 hover:bg-[#0a0a0a]/90 hover:shadow-[0_20px_50px_rgba(249,115,22,0.05)] ${
        isLast ? "md:col-span-2" : "col-span-1"
      }`}
    >
      {/* Dynamic Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
        style={{
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.08), transparent 80%)`,
        }}
      />

      {/* Cyberpunk Grid Grid Pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0" />

      {/* Corner trims */}
      <div className="absolute top-0 left-0 w-2.5 h-[2px] bg-orange-500/40 group-hover:bg-orange-500 transition-colors duration-500" />
      <div className="absolute top-0 left-0 w-[2px] h-2.5 bg-orange-500/40 group-hover:bg-orange-500 transition-colors duration-500" />
      
      <div className="absolute top-0 right-0 w-2.5 h-[2px] bg-orange-500/0 group-hover:bg-orange-500/40 transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-[2px] h-2.5 bg-orange-500/0 group-hover:bg-orange-500/40 transition-colors duration-500" />
      
      <div className="absolute bottom-0 left-0 w-2.5 h-[2px] bg-orange-500/0 group-hover:bg-orange-500/40 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-[2px] h-2.5 bg-orange-500/0 group-hover:bg-orange-500/40 transition-colors duration-500" />

      <div className="absolute bottom-0 right-0 w-2.5 h-[2px] bg-orange-500/40 group-hover:bg-orange-500 transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-[2px] h-2.5 bg-orange-500/40 group-hover:bg-orange-500 transition-colors duration-500" />

      {/* Top Accent Orange Glow Bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-[80%] h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all duration-700" />

      {/* Card Header: Subtitle & Status */}
      <div className="relative z-10 flex items-center justify-between mb-6 select-none font-mono text-[10px] md:text-xs">
        <span className="tracking-[0.2em] text-orange-500/80 font-semibold uppercase group-hover:text-orange-400 transition-colors duration-300">
          {category.subtitle}
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
          <span className="text-neutral-500 font-medium tracking-widest uppercase">
            SYS.{category.status}
          </span>
        </div>
      </div>

      {/* Card Title & Icon Layout */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div>
          <span className="text-[10px] font-mono text-neutral-500 block mb-1">
            02.{index + 1} / TECH STACK
          </span>
          <h3 className="font-author text-2xl md:text-3xl font-semibold tracking-tight text-white group-hover:text-orange-400 transition-colors duration-300">
            {category.title}
          </h3>
        </div>
        <div className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-orange-500/80 group-hover:text-orange-400 group-hover:border-orange-500/20 group-hover:bg-orange-500/5 transition-all duration-500">
          {category.icon}
        </div>
      </div>

      {/* Description */}
      <p className="relative z-10 font-author text-sm md:text-base text-neutral-400 leading-relaxed font-light mb-6">
        {category.desc}
      </p>

      {/* Skill Tags */}
      <div className="relative z-10 flex flex-wrap gap-2 md:gap-2.5">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-neutral-300 font-mono text-xs md:text-sm hover:border-orange-500/30 hover:text-orange-400 hover:bg-orange-500/5 transition-all duration-300 cursor-default"
          >
            + {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProfileCard = ({
  title,
  subtitle,
  desc,
  icon,
  className = "",
}: {
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`profile-fade-in relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-900/10 p-6 md:p-8 backdrop-blur-md transition-all duration-500 group hover:border-orange-500/30 hover:bg-[#0a0a0a]/90 hover:shadow-[0_20px_50px_rgba(249,115,22,0.05)] ${className}`}
    >
      {/* Dynamic Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
        style={{
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.08), transparent 80%)`,
        }}
      />

      {/* Cyberpunk Grid Grid Pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0" />

      {/* Corner trims */}
      <div className="absolute top-0 left-0 w-2.5 h-[2px] bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />
      <div className="absolute top-0 left-0 w-[2px] h-2.5 bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-2.5 h-[2px] bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-[2px] h-2.5 bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />

      {/* Top Accent Orange Glow Bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-[80%] h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all duration-700" />

      <div className="relative z-10 flex items-start justify-between mb-4">
        <div>
          <span className="text-[10px] font-mono text-orange-500/80 tracking-widest block uppercase mb-1">
            {subtitle}
          </span>
          <h4 className="font-author text-2xl font-semibold tracking-tight text-white group-hover:text-orange-400 transition-colors duration-300">
            {title}
          </h4>
        </div>
        <div className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-orange-500/80 group-hover:text-orange-400 group-hover:border-orange-500/20 group-hover:bg-orange-500/5 transition-all duration-500">
          {icon}
        </div>
      </div>

      <p className="relative z-10 font-author text-sm md:text-base text-neutral-400 leading-relaxed font-light">
        {desc}
      </p>
    </div>
  );
};

const TimelineCard = ({
  dates,
  role,
  company,
  locationInfo,
  bullets,
}: {
  dates: string;
  role: string;
  company: string;
  locationInfo?: string;
  bullets: React.ReactNode[];
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="relative pl-8 group/item experience-fade-in">
      {/* Node Dot with pulse ring */}
      <div className="absolute left-[6px] -translate-x-1/2 top-[28px] w-3 h-3 rounded-full border-2 bg-black border-neutral-700 group-hover/item:border-orange-500 group-hover/item:bg-orange-500 group-hover/item:shadow-[0_0_8px_rgba(249,115,22,0.8)] group-hover/item:scale-110 transition-all duration-500 z-10">
        <span className="absolute -inset-1.5 rounded-full border border-orange-500/30 animate-ping opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden transition-all duration-500 p-6 rounded-2xl border border-white/5 bg-neutral-900/10 backdrop-blur-md group hover:border-orange-500/30 hover:bg-[#0a0a0a]/90 hover:shadow-[0_20px_50px_rgba(249,115,22,0.05)] w-full"
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
          style={{
            background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.08), transparent 80%)`,
          }}
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0" />

        {/* Cyber trims */}
        <div className="absolute top-0 left-0 w-2.5 h-[1.5px] bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />
        <div className="absolute top-0 left-0 w-[1.5px] h-2.5 bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-2.5 h-[1.5px] bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-[1.5px] h-2.5 bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />

        {/* Top Accent Glow Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-[80%] h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent transition-all duration-700" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-neutral-400 tracking-wider group-hover:text-orange-400/80 transition-colors">
              {dates} {locationInfo && `· ${locationInfo}`}
            </span>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
              <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">VERIFIED</span>
            </div>
          </div>

          <h4 className="font-author text-xl font-semibold tracking-tight text-white group-hover:text-orange-400 transition-colors duration-300">
            {role}
          </h4>
          <p className="text-sm font-semibold text-orange-400/90 tracking-wide mt-0.5">
            {company}
          </p>

          <ul className="text-sm text-neutral-400 mt-4 flex flex-col gap-2 list-disc pl-4 leading-relaxed font-light group-hover:text-neutral-300 transition-colors">
            {bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const AchievementCard = ({
  category,
  title,
  desc,
  linkText,
  linkUrl,
}: {
  category: string;
  title: string;
  desc: string;
  linkText: string;
  linkUrl: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden transition-all duration-500 p-6 rounded-2xl border border-white/5 bg-neutral-900/10 backdrop-blur-md group hover:border-orange-500/30 hover:bg-[#0a0a0a]/90 hover:shadow-[0_20px_50px_rgba(249,115,22,0.05)] w-full experience-fade-in"
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
        style={{
          background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.08), transparent 80%)`,
        }}
      />
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0" />

      {/* Cyber trims */}
      <div className="absolute top-0 left-0 w-2.5 h-[1.5px] bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />
      <div className="absolute top-0 left-0 w-[1.5px] h-2.5 bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-2.5 h-[1.5px] bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-[1.5px] h-2.5 bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500" />

      {/* Top Accent Glow Bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-[80%] h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent transition-all duration-700" />

      <div className="relative z-10">
        <span className="text-[10px] font-mono text-neutral-400 tracking-wider group-hover:text-orange-400 transition-colors block mb-1">
          {category}
        </span>
        <h4 className="font-author text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed font-light group-hover:text-neutral-300 transition-colors">
          {desc}{" "}
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 font-medium hover:underline inline-flex items-center gap-1 group/link"
          >
            {linkText}
            <svg className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
};

const EducationCard = ({
  dates,
  degree,
  school,
  locationInfo,
}: {
  dates: string;
  degree: string;
  school: string;
  locationInfo?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden transition-all duration-500 p-5 rounded-xl border border-white/5 bg-neutral-900/10 backdrop-blur-md group hover:border-orange-500/20 hover:bg-[#0a0a0a]/80 w-full experience-fade-in"
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-0"
        style={{
          background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.05), transparent 80%)`,
        }}
      />
      {/* Corner accent decorations */}
      <div className="absolute top-0 left-0 w-2 h-[1px] bg-orange-500/10 group-hover:bg-orange-500/40 transition-colors" />
      <div className="absolute top-0 left-0 w-[1px] h-2 bg-orange-500/10 group-hover:bg-orange-500/40 transition-colors" />

      <div className="relative z-10">
        <span className="text-[10px] font-mono text-neutral-400 tracking-wider group-hover:text-orange-400/80 transition-colors">
          {dates} {locationInfo && `· ${locationInfo}`}
        </span>
        <h4 className="font-author text-base font-semibold text-white mt-1 group-hover:text-orange-400 transition-colors duration-300">
          {degree}
        </h4>
        <p className="text-sm text-neutral-400 font-light mt-0.5 group-hover:text-neutral-300 transition-colors">
          {school}
        </p>
      </div>
    </div>
  );
};

const ResumeCard = ({ onClick }: { onClick: () => void }) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className="group relative w-full rounded-2xl overflow-hidden border border-white/5 bg-neutral-900/10 backdrop-blur-md transition-all duration-500 text-left shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-orange-500/40 hover:shadow-[0_25px_60px_rgba(249,115,22,0.08)] hover:scale-[1.01] cursor-pointer experience-fade-in"
      aria-label="View full resume"
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-10"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.08), transparent 80%)`,
        }}
      />

      {/* Cyber trims */}
      <div className="absolute top-0 left-0 w-4 h-[2px] bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500 z-20" />
      <div className="absolute top-0 left-0 w-[2px] h-4 bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500 z-20" />
      <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500 z-20" />
      <div className="absolute bottom-0 right-0 w-[2px] h-4 bg-orange-500/20 group-hover:bg-orange-500 transition-colors duration-500 z-20" />

      {/* Top Accent Orange Glow Bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-[80%] h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all duration-700 z-20" />

      <div className="relative overflow-hidden w-full h-auto">
        <Image
          src="/images/resume.jpg"
          alt="Lovekesh Anand Resume"
          width={794}
          height={1123}
          className="w-full h-auto block filter brightness-95 contrast-105 group-hover:scale-[1.02] transition-transform duration-700"
          priority
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-14 h-14 rounded-full border border-orange-500/60 flex items-center justify-center bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.2)] animate-pulse">
            <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-orange-400 font-semibold drop-shadow">Click to expand</span>
        </div>
      </div>
    </button>
  );
};

const About = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    // Fade-in profile section cards on scroll
    gsap.fromTo(".profile-fade-in", {
      opacity: 0,
      y: 35
    }, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".profile-fade-in-trigger",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Fade-in experience timeline, achievements, and resume on scroll
    gsap.fromTo(".experience-fade-in", {
      opacity: 0,
      y: 35
    }, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#experience",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: sectionRef });

  const skillCategories: SkillCategory[] = [
    {
      id: "languages",
      title: "Languages",
      subtitle: "LAYER_01 / COMPILER_CORE",
      status: "ONLINE",
      skills: ["JavaScript", "Python", "C", "Bash", "HTML", "CSS"],
      desc: "Scripting and programming languages used to write application logic, automation routines, and interface layouts.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 18L22 12L16 6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 6L2 12L8 18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 4L10 20" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "backend",
      title: "Backend Systems",
      subtitle: "LAYER_02 / SYSTEM_API",
      status: "DEPLOYED",
      skills: ["Node.js", "Express.js", "FastAPI", "Prisma ORM", "REST APIs", "JWT Auth", "RBAC"],
      desc: "Architecting secure and performant APIs with robust authentication, role permissions, and database abstractions.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="6" rx="1" />
          <rect x="2" y="15" width="20" height="6" rx="1" />
          <circle cx="6" cy="6" r="1" fill="currentColor" />
          <circle cx="6" cy="18" r="1" fill="currentColor" />
          <path d="M14 6H18" strokeLinecap="round" />
          <path d="M14 18H18" strokeLinecap="round" />
          <path d="M12 9V15" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: "frontend",
      title: "Frontend Engineering",
      subtitle: "LAYER_03 / REACTIVE_UI",
      status: "OPTIMIZED",
      skills: ["React.js", "Next.js", "Vite", "Tailwind CSS"],
      desc: "Crafting fluid, responsive user interfaces with premium styling systems and seamless client state sync.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21H16" strokeLinecap="round" />
          <path d="M12 17V21" strokeLinecap="round" />
          <path d="M2 8H22" />
        </svg>
      )
    },
    {
      id: "cloud",
      title: "Cloud & Security",
      subtitle: "LAYER_04 / INFRA_SHIELD",
      status: "ENCRYPTED",
      skills: ["AWS EC2", "Jenkins (CI/CD)", "PM2", "OpenVPN", "DNS Routing", "API Security", "Linux Server Admin"],
      desc: "Orchestrating secure server environments, virtual private networks, DNS mappings, and automated build flows.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11L11 13L15 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: "databases",
      title: "Databases & Ops",
      subtitle: "LAYER_05 / PERSISTENCE_FLOW",
      status: "STABLE",
      skills: ["PostgreSQL", "MongoDB", "SQLite", "Git / GitHub", "Postman", "WebSockets", "Performance Monitoring"],
      desc: "Optimizing relational and document data layouts, connection pipelines, socket channels, and Git integration.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V12C3 13.66 7.03 15 12 15C16.97 15 21 13.66 21 12V5" />
          <path d="M3 12V19C3 20.66 7.03 22 12 22C16.97 22 21 20.66 21 19V12" />
          <path d="M12 8C16 8 19 6.5 19 5" strokeDasharray="2 2" />
        </svg>
      )
    }
  ];

  return (
    <div ref={sectionRef} className="relative bg-neutral-950 text-neutral-200 border-t border-white/5">

      {/* ── SECTION 01: ABOUT ME (PROFILE) ────────────────────────────────── */}
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
          <p className="font-author text-base text-neutral-400 font-normal mt-4 leading-relaxed max-w-xs">
            A full-stack developer focused on engineering elegant client applications and high-performance backend infrastructure.
          </p>
        </div>

        {/* Dynamic Content Right with Sleek Dark Glassmorphism Backing */}
        <div className="lg:col-span-8 p-8 md:p-16 flex flex-col justify-center select-text bg-black/40 backdrop-blur-md border-b lg:border-b-0 lg:border-l border-white/5">
          <p className="font-author text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.2] text-neutral-400 tracking-normal font-normal mb-8 max-w-4xl">
            I am a 20 year old <span className="text-orange-400 font-medium">full-stack developer</span> dedicated to building end-to-end digital experiences. I bridge the gap between <span className="text-white font-medium">elegant frontend interfaces</span> and <span className="text-white font-medium">robust, scalable backend architectures, </span>crafting high-performance software that is clean, secure, and optimized from the pixel level to the cloud deployment layer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-8 mt-4 profile-fade-in-trigger">
            <ProfileCard
              title="Core Philosophy"
              subtitle="01 / BELIEF_SYSTEM"
              desc="I believe the best engineers understand what happens after `git push`. Great products are shaped by their deployment constraints — the right caching strategy, a well-tuned reverse proxy, and a resilient CI/CD pipeline make all the difference."
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9.66667 6L6 9.66667L9.66667 13.3333" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.3333 13.3333L18 9.66667L14.3333 6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 3L11 17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            <ProfileCard
              title="What I Do"
              subtitle="02 / ACTIVE_OPERATIONS"
              desc="Building full-stack web applications with React, Next.js, and Node.js — while managing the cloud infrastructure they live on. Currently configuring AWS EC2 instances, automating Jenkins pipelines, and hardening OpenVPN gateways at EaseInfra."
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 16h8" strokeLinecap="round" />
                  <path d="M12 12v8" strokeLinecap="round" />
                  <path d="M12 20l-3-3" strokeLinecap="round" />
                  <path d="M12 20l3-3" strokeLinecap="round" />
                </svg>
              }
            />
          </div>
        </div>

      </section> 

      {/* ── SECTION 02: TECH STACK ────────────────────────────────────────── */}
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
          <p className="font-author text-base text-neutral-400 font-light mt-4 leading-relaxed max-w-xs">
            A structured look at my engineering toolkit, grouped by operational layer and technical focus.
          </p>
        </div>

        {/* Dynamic Content Right */}
        <div className="lg:col-span-8 p-8 md:p-16 about-fade-in-trigger">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {skillCategories.map((category, index) => {
              const isLast = index === skillCategories.length - 1;
              return (
                <TechCard
                  key={category.id}
                  category={category}
                  index={index}
                  isLast={isLast}
                />
              );
            })}
          </div>
        </div>

      </section>

      {/* ── SECTION 03: INTERACTIVE RESUME & TIMELINE ───────────────────────── */}
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
          {/* Column A: Timeline, Achievements, Education */}
          <div className="xl:col-span-7 flex flex-col gap-12">
            
            {/* Professional Experience */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-medium text-neutral-400 tracking-[0.25em] uppercase flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                PROFESSIONAL EXPERIENCE
              </h3>
              
              <div className="relative flex flex-col gap-6">
                {/* Glowing vertical timeline indicator line */}
                <div className="absolute left-[6px] top-[28px] bottom-[28px] w-[1px] bg-gradient-to-b from-orange-500 via-orange-500/20 to-transparent z-0" />
                <div className="absolute left-[4px] top-[28px] bottom-[28px] w-[4px] bg-gradient-to-b from-orange-500/10 via-transparent to-transparent blur-[2px] z-0 pointer-events-none" />
                
                <TimelineCard
                  dates="DEC 2025 – PRESENT"
                  locationInfo="IN-OFFICE"
                  role="IT Intern"
                  company="EaseInfra"
                  bullets={[
                    <React.Fragment key={1}>Manage <strong className="text-neutral-200 font-medium">AWS EC2</strong>, VPC configs, and security groups.</React.Fragment>,
                    <React.Fragment key={2}>Configure <strong className="text-neutral-200 font-medium">OpenVPN</strong> secure admin gateways.</React.Fragment>,
                    <React.Fragment key={3}>Deploy Node.js microservices with <strong className="text-neutral-200 font-medium">PM2</strong>.</React.Fragment>,
                    <React.Fragment key={4}>Set CI/CD automation with <strong className="text-neutral-200 font-medium">Jenkins</strong>.</React.Fragment>,
                    <React.Fragment key={5}>Handle port conflict and DNS production debugging.</React.Fragment>
                  ]}
                />

                <TimelineCard
                  dates="OCT 2024 – PRESENT"
                  locationInfo="COLLEGE SOCIETY"
                  role="Technical Head"
                  company="Nexturn - The Internship Cell"
                  bullets={[
                    <React.Fragment key={1}>Lead the web engineering division to build, optimize, and maintain the main society web portal.</React.Fragment>,
                    <React.Fragment key={2}>Conduct technical bootcamps on full-stack development and programming methodologies for 100+ students.</React.Fragment>,
                    <React.Fragment key={3}>Direct online portal architectures to streamline registrations for annual internship drives.</React.Fragment>
                  ]}
                />
              </div>
            </div>

            {/* Achievements */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-medium text-neutral-400 tracking-[0.25em] uppercase flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                ACHIEVEMENTS
              </h3>
              <AchievementCard
                category="IIT JANAKPURI · HACKATHON WINNER"
                title="Winner, Matrix 3.0"
                desc="Clinched the 1st position at the prestigious 36-hour physical hackathon in Delhi. Explore my project profile on"
                linkText="Devfolio"
                linkUrl="https://matrix-3.devfolio.co/projects"
              />
            </div>

            {/* Education */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-medium text-neutral-400 tracking-[0.25em] uppercase flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                EDUCATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EducationCard
                  dates="2023 – 2027"
                  locationInfo="ROHTAK"
                  degree="B.Tech in Computer Science"
                  school="Maharishi Dayanand University"
                />
                <EducationCard
                  dates="COMPLETED MAY 2023"
                  locationInfo="NEW DELHI"
                  degree="Secondary & Senior Secondary (CBSE)"
                  school="Andhra Education Society School"
                />
              </div>
            </div>

          </div>

          {/* Column B: Sticky Resume */}
          <div className="xl:col-span-5 flex flex-col gap-4 font-author xl:sticky xl:top-24 h-fit">
            <h3 className="text-xs font-medium text-neutral-400 tracking-[0.25em] uppercase mb-2 flex items-center font-author">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
              RESUME
            </h3>

            {/* Resume Card Component */}
            <ResumeCard onClick={() => setResumeOpen(true)} />

            {/* Open in new tab link */}
            <a
              href="https://drive.google.com/file/d/1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-500 hover:text-orange-400 transition-colors duration-200 w-fit mt-1 pl-1"
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
                  Open
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
                  </svg>
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

