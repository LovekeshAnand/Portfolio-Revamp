"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/hero/Hero";
import TextMarquee from "@/components/ui/TextMarquee";
import HeroBento from "@/components/sections/hero/HeroBento";

// Code-split below-the-fold components to optimize initial page load time and bundle size
const TelemetryMesh = dynamic(() => import("@/components/ui/TelemetryMesh"), {
  loading: () => <div className="min-h-[400px] bg-neutral-950/10 animate-pulse" />
});

const About = dynamic(() => import("@/components/sections/about/About"), {
  loading: () => <div className="min-h-[600px] bg-neutral-950/10 animate-pulse" />
});

const Projects = dynamic(() => import("@/components/sections/projects/Projects"), {
  loading: () => <div className="min-h-[800px] bg-neutral-950/10 animate-pulse" />
});

const ContactForm = dynamic(() => import("@/components/sections/contact/ContactForm"), {
  loading: () => <div className="min-h-[400px] bg-neutral-950/10 animate-pulse" />
});

const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => <div className="min-h-[300px] bg-neutral-950/10 animate-pulse" />
});

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const ghostPathRef = useRef<SVGPathElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen width to safely disable heavy scroll listeners on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll progress across Hero and About sections (approx. 3.5x viewport height total)
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    // Initialize path length once the SVG path is rendered in the DOM
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength() || 2800;
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
    }
    if (ghostPathRef.current) {
      const length = ghostPathRef.current.getTotalLength() || 2800;
      ghostPathRef.current.style.strokeDasharray = `${length}`;
      ghostPathRef.current.style.strokeDashoffset = `${length}`;
    }

    const handleScroll = () => {
      if (!pageRef.current) return;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // 2. Calculate Global scroll progress and target tip Y-coordinate to keep the drawing tip at the middle/lower screen
      const scrollHeight = document.documentElement.scrollHeight || 4000;
      
      const maxScrollable = scrollHeight - viewportHeight;
      const globalProgress = maxScrollable > 0 ? scrollY / maxScrollable : 0;
      const clampedGlobalProgress = Math.max(0, Math.min(1, globalProgress));

      // Interpolate the target drawing Y coordinate.
      // If scrollY is 0, the line is fully hidden.
      // As scroll begins, the line enters from the very top and slides to the center over the first 300px of scroll.
      let progressInPath = 0;
      if (scrollY > 0) {
        const transitionDistance = 300; // pixels to reach the center
        const transitionFactor = Math.min(1, scrollY / transitionDistance);
        
        const yTarget = scrollY + (viewportHeight / 2) * transitionFactor + (viewportHeight / 2) * clampedGlobalProgress;
        progressInPath = Math.max(0, Math.min(1, yTarget / scrollHeight));
      }

      // Direct-DOM update for 120fps buttery drawing with zero React lag
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength() || 2800;
        const offset = length * (1 - progressInPath);
        pathRef.current.style.strokeDashoffset = `${Math.max(0, offset)}`;
      }
      if (ghostPathRef.current) {
        const length = ghostPathRef.current.getTotalLength() || 2800;
        const offset = length * (1 - progressInPath);
        ghostPathRef.current.style.strokeDashoffset = `${Math.max(0, offset)}`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <>
      <Navbar />

      {/* ── Cinematic reveal wrapper with scaling depth and opacity fade ── */}
      <div 
        ref={pageRef}
        className="flex flex-col min-h-screen relative opacity-100 scale-100"
      >
        {/* Scroll-Drawn Telemetry Curl — commented out, preserved for later
        {!isMobile && (
          <svg 
            viewBox="0 0 1000 4000"
            preserveAspectRatio="none"
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2] hidden lg:block overflow-visible"
            style={{ pointerEvents: "none", mixBlendMode: "screen" }}
          >
            <path 
              ref={ghostPathRef}
              d="M 500,-100 C 680,250 820,550 680,950 C 500,1350 120,1650 320,2050 C 520,2450 860,2650 680,3050 C 480,3450 180,3600 500,4000"
              fill="none"
              stroke="rgba(249,115,22,0.12)"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "none" }}
            />
            <path 
              ref={pathRef}
              d="M 500,-100 C 680,250 820,550 680,950 C 500,1350 120,1650 320,2050 C 520,2450 860,2650 680,3050 C 480,3450 180,3600 500,4000"
              fill="none"
              stroke="rgba(249,115,22,0.75)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: "none",
                filter: "drop-shadow(0px 0px 8px rgba(249, 115, 22, 0.9)) drop-shadow(0px 0px 3px rgba(255,180,80,0.6))"
              }}
            />
          </svg>
        )}
        */}

        <main className="flex-1 relative bg-transparent">
          <section id="home">
            <Hero />
            <TextMarquee />
            <HeroBento />
          </section>
          <TelemetryMesh />
          <About />
          <Projects />
          <ContactForm />
          <Footer />
        </main>
      </div>
    </>
  );
}

