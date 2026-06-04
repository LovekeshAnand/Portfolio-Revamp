"use client";

import React from "react";

const TextMarquee = () => {
  const words = [
    "REACT.JS",
    "NEXT.JS",
    "NODE.JS",
    "EXPRESS.JS",
    "FASTAPI",
    "PRISMA ORM",
    "POSTGRESQL",
    "MONGODB",
    "JAVASCRIPT",
    "TYPESCRIPT",
    "PYTHON",
    "AWS EC2",
    "JENKINS CI/CD",
    "OPENVPN",
    "BASH",
    "LINUX SERVER"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-black/60 backdrop-blur-sm border-t border-b border-white/5 py-4 select-none z-10">
      {/* Sleek edge fades for premium ambient depth */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070707] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070707] to-transparent z-20 pointer-events-none" />

      {/* Marquee sliding track container */}
      <div className="flex whitespace-nowrap overflow-hidden">
        {/* Track 1 */}
        <div className="flex animate-[marquee_36s_linear_infinite] gap-8 shrink-0 min-w-full justify-around items-center">
          {words.map((word, idx) => (
            <div key={`t1-${idx}`} className="flex items-center gap-8 font-mono text-[11px] md:text-xs text-neutral-400 font-bold uppercase tracking-[0.25em]">
              <span>{word}</span>
              <span className="text-orange-500 font-extrabold select-none shadow-[0_0_8px_rgba(249,115,22,0.4)]">//</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Seamless loop replica) */}
        <div className="flex animate-[marquee_36s_linear_infinite] gap-8 shrink-0 min-w-full justify-around items-center" aria-hidden="true">
          {words.map((word, idx) => (
            <div key={`t2-${idx}`} className="flex items-center gap-8 font-mono text-[11px] md:text-xs text-neutral-400 font-bold uppercase tracking-[0.25em]">
              <span>{word}</span>
              <span className="text-orange-500 font-extrabold select-none shadow-[0_0_8px_rgba(249,115,22,0.4)]">//</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextMarquee;

