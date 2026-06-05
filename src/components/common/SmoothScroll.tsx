"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch/mobile devices — Lenis smooth scroll is expensive on mobile
    // and fights with the native momentum scroll, causing jank.
    // On touch devices, native scroll is already smooth; skip Lenis entirely.
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isTouchDevice) return; // Native scroll on mobile — much faster

    // Initialize Lenis smooth scroll engine — desktop only
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    // Expose lenis globally so components can listen to it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__lenis = lenis;

    // On every Lenis scroll tick:
    // 1. Dispatch a synthetic native 'scroll' event so components using
    //    window.addEventListener('scroll') (like Projects.tsx) keep working
    // 2. Call ScrollTrigger.update() so GSAP scroll animations (About.tsx) stay in sync
    const dispatchScroll = () => {
      window.dispatchEvent(new Event("scroll"));
      ScrollTrigger.update();
    };
    lenis.on("scroll", dispatchScroll);

    let animationFrameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

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

    const t1 = setTimeout(handleResize, 500);
    const t2 = setTimeout(handleResize, 1500);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.off("scroll", dispatchScroll);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).__lenis;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      imgs.forEach((img) => {
        img.removeEventListener("load", handleResize);
      });
      clearTimeout(t1);
      clearTimeout(t2);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
