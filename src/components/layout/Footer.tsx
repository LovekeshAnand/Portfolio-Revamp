"use client";

import React from "react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/LovekeshAnand",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lovekesh-anand-443138318/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/LovekeshAnand07",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const contactDetails = [
  {
    label: "Email",
    value: "lovekeshanand6@gmail.com",
    href: "mailto:lovekeshanand6@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 89297 50553",
    href: "tel:+918929750553",
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] text-white overflow-hidden border-t border-white/[0.01]">
      
      {/* Dynamic letter-hover styles for the watermark */}
      <style>{`
        .watermark-letter {
          background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          display: inline-block;
        }
        .watermark-letter:hover {
          background: linear-gradient(180deg, #f97316 0%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transform: scale(1.08) translateY(-8px);
          filter: drop-shadow(0px 0px 15px rgba(249, 115, 22, 0.8));
        }
      `}</style>

      {/* Cyberpunk background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
      <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.015),transparent_60%)] pointer-events-none" />

      {/* ── Top border accent ── */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/25 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent blur-[1.5px]" />
      </div>

      {/* ── Main footer body ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-0 select-none">

        {/* ── Three-column content grid with asymmetric widths ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">

          {/* Column 1: About (Spans 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h3 className="text-sm font-mono font-semibold tracking-[0.3em] uppercase text-orange-400/80">
              About
            </h3>
            <p className="text-base text-neutral-300 leading-relaxed font-author font-light max-w-sm select-text">
              Full-stack engineer crafting resilient architectures and
              fluid interfaces. Focused on performance, scalability, and
              the details that ship great products.
            </p>
            {/* Social links & Resume */}
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex items-center justify-center w-8.5 h-8.5 rounded-xl border border-white/5 bg-white/[0.01] text-neutral-400 transition-all duration-300 hover:border-orange-500/50 hover:text-orange-400 hover:bg-orange-500/5 hover:scale-105"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <a
                href="https://drive.google.com/file/d/1gKwpedTgHwuZIb7bj-DC8d_NZeWecg4G/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-orange-500/35 bg-orange-500/5 text-orange-400 text-xs font-mono tracking-widest uppercase hover:bg-orange-500 hover:text-black hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-300 w-fit"
              >
                View Résumé
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 10L10 2M10 2H4M10 2v6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Contact (Spans 4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6 select-text">
            <h3 className="text-sm font-mono font-semibold tracking-[0.3em] uppercase text-orange-400/80 select-none">
              Contact
            </h3>
            <div className="flex flex-col gap-5">
              {contactDetails.map((c) => (
                <div key={c.label} className="group">
                  <p className="text-xs font-mono tracking-widest uppercase text-neutral-500 mb-1.5 select-none transition-colors duration-300 group-hover:text-orange-400/70">
                    {c.label}
                  </p>
                  <a
                    href={c.href}
                    className="text-base text-neutral-200 font-mono hover:text-orange-400 transition-colors duration-200 block truncate"
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Navigate (Spans 3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h3 className="text-sm font-mono font-semibold tracking-[0.3em] uppercase text-orange-400/80">
              Navigate
            </h3>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/#home" },
                { label: "About", href: "/#about" },
                { label: "Experience", href: "/#experience" },
                { label: "Projects", href: "/projects" },
                { label: "Contact", href: "/contact" },
                { label: "Sitemap", href: "/sitemap.xml", target: "_blank" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.target ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2.5 text-base text-neutral-300 font-author hover:text-white transition-all duration-300 w-fit transform hover:translate-x-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-orange-500 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="py-5 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 select-text">
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-500">
            © 2026 Lovekesh Anand · All rights reserved
          </p>
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-600 select-none">
            Built by Lovekesh
          </p>
        </div>

      </div>

      {/* ── Giant name watermark — bottom stamp with individual letter hover controls ── */}
      <div className="w-full overflow-visible border-t border-white/[0.01] mt-0 pt-6 pb-12 select-none flex justify-center">
        <h2
          className="font-[family-name:var(--font-bebas)] leading-none text-center select-none uppercase tracking-[0.05em] flex justify-center gap-x-2 sm:gap-x-4 flex-wrap"
          style={{
            fontSize: "clamp(3rem, 10vw, 10rem)",
            lineHeight: 1.0,
          }}
        >
          {Array.from("LOVEKESH ANAND").map((char, idx) => (
            <span
              key={idx}
              className="watermark-letter"
              style={{
                width: char === " " ? "0.3em" : "auto",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
      </div>

    </footer>
  );
};

export default Footer;
