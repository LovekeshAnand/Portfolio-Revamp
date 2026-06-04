"use client";

import { useEffect } from "react";
import Lenis from "lenis";

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
