"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const menuLinks = [
  { name: "HOME", href: "/#home" },
  { name: "ABOUT", href: "/#about" },
  { name: "STACK", href: "/#stack" },
  { name: "PROJECTS", href: "/projects" },
  { name: "BLOG", href: "/blog" }
];

const contactLink = { name: "CONTACT", href: "/contact" };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("HOME");

  // Detect active section on scroll or pathname change
  useEffect(() => {
    const handleScrollActive = () => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        if (path.startsWith("/projects")) {
          setActiveSection("PROJECTS");
          return;
        }
        if (path.startsWith("/blog")) {
          setActiveSection("BLOG");
          return;
        }
        if (path.startsWith("/contact")) {
          setActiveSection("CONTACT");
          return;
        }
      }

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isAnchor = href.startsWith("#") || href.startsWith("/#");
    const isCurrentlyOnLandingPage = typeof window !== "undefined" && window.location.pathname === "/";
    
    if (!isAnchor || !isCurrentlyOnLandingPage) {
      setIsOpen(false);
      return;
    }

    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace("/#", "").replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] sm:w-auto max-w-5xl select-none">
      {/* Desktop Pill (sm and up) */}
      <div className="hidden sm:flex items-center gap-2 border border-white/[0.08] bg-black/75 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/[0.15]">
        {/* Links */}
        <div className="flex items-center gap-1">
          {menuLinks.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-4 py-1.5 rounded-full text-xs md:text-[13px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 font-semibold"
                    : "text-neutral-400 hover:text-orange-400 hover:bg-orange-500/10 border border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-white/10 mx-1 shrink-0" />

        {/* Highlighted Contact Button */}
        <Link
          href={contactLink.href}
          onClick={(e) => handleLinkClick(e, contactLink.href)}
          className={`relative px-5 py-1.5 rounded-full text-xs md:text-[13px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer border ${
            activeSection === "CONTACT"
              ? "bg-orange-500 text-black border-orange-500 font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)]"
              : "text-orange-400 border-orange-500/30 bg-orange-500/5 hover:bg-orange-500 hover:text-black hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
          }`}
        >
          {contactLink.name}
        </Link>
      </div>

      {/* Mobile Expanding Pill (hidden on sm) */}
      <div 
        className={`sm:hidden border border-white/[0.08] bg-black/75 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 ${
          isOpen ? "rounded-[24px] px-5 py-4 w-full" : "rounded-full px-4 py-2 w-full"
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-orange-400 uppercase font-semibold">
              {activeSection}
            </span>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 justify-center items-center w-6 h-6 outline-none focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span 
              className={`w-4.5 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`} 
            />
            <span 
              className={`w-4.5 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`} 
            />
          </button>
        </div>

        {/* Collapsible Dropdown Content */}
        <div 
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-white/5" : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-1">
            {menuLinks.map((link) => {
              const isActive = activeSection === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 font-semibold"
                      : "text-neutral-400 hover:text-orange-400 hover:bg-orange-500/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Separated Contact button in Mobile dropdown */}
            <Link
              href={contactLink.href}
              onClick={(e) => handleLinkClick(e, contactLink.href)}
              className={`mt-2 px-4 py-3 rounded-xl text-center text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer border ${
                activeSection === "CONTACT"
                  ? "bg-orange-500 text-black border-orange-500 font-bold"
                  : "text-orange-400 border-orange-500/30 bg-orange-500/5 hover:bg-orange-500 hover:text-black"
              }`}
            >
              {contactLink.name}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
