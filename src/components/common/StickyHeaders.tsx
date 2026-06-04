"use client";

import React, { useState, useEffect } from "react";
import LocalTime from "./LocalTime";

const StickyHeaders = () => {
  const [hideSticky, setHideSticky] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const maxScrollable = scrollHeight - clientHeight;

      // 1. Hide sticky headers when viewing the Hero section to prevent overlaps
      // 2. Hide when near the bottom footer
      if (scrollY < clientHeight * 0.7 || scrollY >= maxScrollable - 200) {
        setHideSticky(true);
      } else {
        setHideSticky(false);
      }
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* â”€â”€ Global Sticky Top-Left Name â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div 
        className={`fixed top-8 left-8 z-50 pointer-events-none select-none transition-opacity duration-500 ${
          hideSticky ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="font-sans text-xs font-medium text-neutral-400 tracking-[0.35em] uppercase">
          LOVEKESH ANAND
        </span>
      </div>

    </>
  );
};

export default StickyHeaders;

