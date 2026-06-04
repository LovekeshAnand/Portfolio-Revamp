"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// â”€â”€ CUSTOM IMAGE ASSETS: 3D Pixel Cursors from public/images/ â”€â”€
const PixelArrow = () => (
  <img 
    src="/images/cursor.png" 
    alt="Cursor" 
    className="w-[28px] h-[28px] object-contain drop-shadow-[0_3px_8px_rgba(14,165,233,0.22)]"
    style={{ imageRendering: "pixelated" }}
  />
);

const PixelHand = () => (
  <img 
    src="/images/pointer.png" 
    alt="Pointer" 
    className="w-[28px] h-[28px] object-contain drop-shadow-[0_3px_8px_rgba(14,165,233,0.22)]"
    style={{ imageRendering: "pixelated" }}
  />
);

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Custom cursors are activated for non-touch desktop pointer devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Track coordinates
    const mouse = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    const last = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Premium requestAnimationFrame physics-driven loop via GSAP ticker
    const ticker = gsap.ticker.add(() => {
      // 0.22 interpolation factor gives responsive tracking with structural soft lag
      current.x += (mouse.x - current.x) * 0.22;
      current.y += (mouse.y - current.y) * 0.22;

      // Calculate coordinates deltas
      const dx = current.x - last.x;
      const dy = current.y - last.y;
      
      const velocity = Math.min(Math.sqrt(dx * dx + dy * dy), 35);
      
      // Horizontal sweep velocity dictates the elastic 3D tilt angle
      // Subtle scaling multiplier, capped tightly at maximum 3 degrees to prevent crooked alignment
      const rawAngle = dx * 0.08;
      const angle = Math.max(-3, Math.min(rawAngle, 3)); 
      
      // Calculate smooth stretching scale factor relative to movement velocity
      const scaleX = 1 + velocity * 0.001;
      const scaleY = 1 - velocity * 0.0005;

      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: current.x,
          y: current.y,
          rotation: angle,
          scaleX,
          scaleY
        });
      }

      // Record coordinate state
      last.x = current.x;
      last.y = current.y;
    });

    // Detect triggers for hover snapping
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], .cursor-pointer, select, input, textarea, img");
      if (interactiveEl) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], .cursor-pointer, select, input, textarea, img");
      if (interactiveEl) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    // Force standard pointer cursor styling off globally
    const styleEl = document.createElement("style");
    styleEl.id = "global-cursor-override-v4";
    styleEl.innerHTML = `
      @media (min-width: 1024px) {
        body, a, button, select, input, textarea, [role='button'], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(ticker);
      
      const el = document.getElementById("global-cursor-override-v4");
      if (el) el.remove();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 hidden lg:block overflow-visible w-9 h-9"
      style={{ 
        transformOrigin: "0px 0px", // Rotates precisely around the top-left tip hot spot
        pointerEvents: "none"
      }}
    >
      <div className="relative overflow-visible w-full h-full">
        {/* Render 3D Hand Pointer on active hover (shifted slightly to align pointer finger), Arrow on baseline rest */}
        <div className={`transition-all duration-300 ease-out transform w-full h-full ${
          isHovered ? "opacity-0 scale-90 select-none absolute" : "opacity-100 scale-100"
        }`}>
          <PixelArrow />
        </div>
        <div 
          className={`transition-all duration-300 ease-out transform w-full h-full ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90 select-none absolute"
          }`}
          style={{ transform: isHovered ? "translate3d(-2px, -2px, 0px)" : "none" }} // align index finger exactly on click coordinates
        >
          <PixelHand />
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;

