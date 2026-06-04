"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const menuLinks = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "STACK", href: "#stack" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("HOME");
  
  // Track cursor position for side arrows motion
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Intersection/Scroll detector to find active section
  useEffect(() => {
    const handleScrollActive = () => {
      if (window.scrollY < 150) {
        setActiveSection("HOME");
        return;
      }
      
      const sections = ["home", "about", "stack", "projects", "contact"];
      let currentActive = "HOME";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section spans across the middle horizontal line of the screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = section.toUpperCase();
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScrollActive);
    handleScrollActive(); // Initial run

    return () => {
      window.removeEventListener("scroll", handleScrollActive);
    };
  }, []);

  // Set initial mouse coordinates to center of screen when menu opens
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMouseCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const clampedY = Math.max(80, Math.min(e.clientY, window.innerHeight - 80));
      setMouseCoords({ x: e.clientX, y: clampedY });
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("mousemove", handleGlobalMouseMove);
    } else {
      document.body.style.overflow = "unset";
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      // Magnetic elastic follow pull for the main trigger button
      setPosition({ x: dx * 0.25, y: dy * 0.25 });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  // Filter out the active page/section from the menu links dynamically
  const visibleLinks = menuLinks.filter((link) => link.name !== activeSection);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  return (
    <>
      {/* â”€â”€ Magnetic Global Sticky Menu Trigger â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        ref={buttonRef}
        className="fixed top-8 right-8 z-50 flex items-center justify-center w-20 h-20 cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: hovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        role="button"
        tabIndex={0}
      >
        <div className="flex flex-col items-center leading-[0.74] text-[36px] font-[family-name:var(--font-bebas)] tracking-[0.03em] text-white group">
          {isOpen ? (
            <>
              {/* Vertical Close text stack - permanently exploded in clicked state */}
              <span className="transition-transform duration-300 ease-out text-orange-500 -translate-x-2 group-hover:-translate-x-3">
                ME
              </span>
              <span className="transition-transform duration-300 ease-out text-orange-500 translate-x-2 group-hover:translate-x-3">
                NU
              </span>
            </>
          ) : (
            <>
              {/* Vertical ME / NU Menu text stack */}
              <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1.5 group-hover:text-orange-500">
                ME
              </span>
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-orange-500">
                NU
              </span>
            </>
          )}
        </div>
      </div>
 
      {/* â”€â”€ Cursor-Following Side Arrows (Left > and Right <) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* Left Arrow '>' follows mouse Y coordinates with elastic damping */}
      <div
        className="fixed left-12 md:left-24 top-0 z-50 select-none pointer-events-none hidden md:flex items-center justify-center w-fit h-fit"
        style={{
          transform: `translateY(${mouseCoords.y}px) translateY(-50%)`,
          transition: "transform 0.22s cubic-bezier(0.1, 0.8, 0.2, 1.05), opacity 0.5s ease-out",
          opacity: isOpen ? 1 : 0,
          transitionDelay: isOpen ? "0ms, 400ms" : "0ms, 0ms",
        }}
      >
        <span className="font-[family-name:var(--font-bebas)] text-[clamp(2.5rem,7.5vw,7.5rem)] font-normal text-white leading-none">
          &gt;
        </span>
      </div>
 
      {/* Right Arrow '<' follows mouse Y coordinates with elastic damping */}
      <div
        className="fixed right-12 md:right-24 top-0 z-50 select-none pointer-events-none hidden md:flex items-center justify-center w-fit h-fit"
        style={{
          transform: `translateY(${mouseCoords.y}px) translateY(-50%)`,
          transition: "transform 0.22s cubic-bezier(0.1, 0.8, 0.2, 1.05), opacity 0.5s ease-out",
          opacity: isOpen ? 1 : 0,
          transitionDelay: isOpen ? "0ms, 400ms" : "0ms, 0ms",
        }}
      >
        <span className="font-[family-name:var(--font-bebas)] text-[clamp(2.5rem,7.5vw,7.5rem)] font-normal text-white leading-none">
          &lt;
        </span>
      </div>      {/* â”€â”€ Full-Screen Dropping Page Overlay Menu â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="fixed inset-0 z-[48] flex flex-col justify-center items-center bg-black/95 backdrop-blur-lg transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] select-none"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        {/* Subtle background orange grid lines for consistent identity */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(249, 115, 22, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(249, 115, 22, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(circle at center, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 90%)",
          }}
        />
 
        {/* Soft, beautiful orange blurred background glow (visible on hover) */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full bg-orange-500/10 blur-[130px] transition-opacity duration-500 pointer-events-none z-0 ${
            hoveredLink ? "opacity-100" : "opacity-0"
          }`}
        />
 
        {/* Giant, semi-transparent ghost text shadow behind links (matching image) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span 
            className="font-[family-name:var(--font-bebas)] text-[22vw] text-neutral-800/40 leading-none tracking-normal uppercase select-none opacity-30 transition-all duration-500 ease-out filter blur-[3px]"
            style={{
              transform: hoveredLink ? "scale(1.05)" : "scale(1)",
              opacity: hoveredLink ? 0.35 : 0,
            }}
          >
            {hoveredLink}
          </span>
        </div>
 
        {/* Staggered Huge Typographic Link List (excluding current active page) - z-50 guarantees stacking on top of all absolute watermarks */}
        <div className="relative z-50 flex flex-col items-center leading-[0.88] text-center max-w-4xl w-full px-8 py-20">
          {visibleLinks.map((link, index) => (
            <div 
              key={link.name}
              className="overflow-hidden py-1 w-full flex justify-center"
            >
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="font-[family-name:var(--font-bebas)] text-white font-normal uppercase hover:scale-[1.03] hover:text-orange-500 tracking-[0.02em] hover:tracking-[0.05em] block cursor-pointer"
                style={{
                  fontSize: "clamp(3.5rem, 12.5vw, 12.5rem)",
                  transform: isOpen ? "translateY(0)" : "translateY(100px)",
                  opacity: isOpen ? 1 : 0,
                  transitionProperty: "transform, opacity, letter-spacing, color",
                  transitionDuration: "600ms, 600ms, 300ms, 300ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1), ease, ease",
                  transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                }}
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom-left language indicator, exactly matching the reference image */}
        <div className="absolute bottom-8 left-8 z-30 font-sans text-xs font-medium text-neutral-400 tracking-wider">
          FR / IN
        </div>
      </div>
    </>
  );
};

export default Navbar;

