"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4), // Premium quartic ease-out for smooth inertia scroll
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    let animationFrameId: number;

    // Native requestAnimationFrame loop with correct browser timestamps
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

    // Call resize on resize events
    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", handleResize);
    });

    // Discrete initial timeouts to ensure layout is correctly measured after hydration/load
    const t1 = setTimeout(handleResize, 500);
    const t2 = setTimeout(handleResize, 1500);
    const t3 = setTimeout(handleResize, 3000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      imgs.forEach((img) => {
        img.removeEventListener("load", handleResize);
      });
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      lenis.destroy();
    };
  }, []);

  return null; // Side-effect only, no DOM footprint
};

export default SmoothScroll;

