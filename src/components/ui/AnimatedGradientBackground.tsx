"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface AnimatedGradientBackgroundProps {
  /** 
   * Initial size of the radial gradient, defining the starting width. 
   * @default 120
   */
  startingGap?: number;

  /**
   * Enables or disables the breathing animation effect.
   * @default true
   */
  Breathing?: boolean;

  /**
   * Array of colors to use in the radial gradient.
   * Each color corresponds to a stop percentage in `gradientStops`.
   * @default ["#ffffff", "#f0f9ff", "#e0f2fe", "#dbeafe", "#e0e7ff", "#faf5ff", "#ffffff"]
   */
  gradientColors?: string[];

  /**
   * Array of percentage stops corresponding to each color in `gradientColors`.
   * The values should range between 0 and 100.
   * @default [30, 45, 55, 65, 75, 85, 100]
   */
  gradientStops?: number[];

  /**
   * Speed of the breathing animation. 
   * Lower values result in slower animation.
   * @default 0.012
   */
  animationSpeed?: number;

  /**
   * Maximum range for the breathing animation in percentage points.
   * Determines how much the gradient "breathes" by expanding and contracting.
   * @default 6
   */
  breathingRange?: number;

  /**
   * Additional inline styles for the gradient container.
   * @default {}
   */
  containerStyle?: React.CSSProperties;

  /**
   * Additional class names for the gradient container.
   * @default ""
   */
  containerClassName?: string;

  /**
   * Additional top offset for the gradient container from the top.
   * @default 0
   */
  topOffset?: number;
}

/**
 * AnimatedGradientBackground
 *
 * This component renders a beautifully customizable animated radial gradient background with a subtle breathing effect.
 * It uses `framer-motion` for a smooth scale-down entrance animation and requestAnimationFrame for high-performance motion.
 */
const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  startingGap = 60,
  Breathing = true,
  gradientColors = [
    "rgba(59, 130, 246, 0.14)", // Soft electric blue core focus
    "rgba(14, 165, 233, 0.09)", // Soft sky blue ring
    "rgba(99, 102, 241, 0.05)", // Delicate indigo chromatic ring
    "rgba(167, 139, 250, 0.02)", // Whispering purple ring
    "rgba(255, 255, 255, 0)"     // Smooth blend to complete transparent
  ],
  gradientStops = [0, 25, 45, 65, 80],
  animationSpeed = 0.025,
  breathingRange = 12,
  containerStyle = {},
  topOffset = 0,
  containerClassName = "",
}) => {
  // Validation: Ensure gradientStops and gradientColors lengths match
  if (gradientColors.length !== gradientStops.length) {
    throw new Error(
      `GradientColors and GradientStops must have the same length.
  Received gradientColors length: ${gradientColors.length},
  gradientStops length: ${gradientStops.length}`
    );
  }

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrame: number;
    let width = startingGap;
    let directionWidth = 1;
    let lastTime = 0;
    // Throttle to ~30fps on mobile/low-end, 60fps on desktop
    const isMobileDevice = typeof window !== "undefined" && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const targetInterval = isMobileDevice ? 33 : 16; // ms between frames

    const animateGradient = (timestamp: number) => {
      const elapsed = timestamp - lastTime;
      if (elapsed >= targetInterval) {
        lastTime = timestamp - (elapsed % targetInterval);

        if (width >= startingGap + breathingRange) directionWidth = -1;
        if (width <= startingGap - breathingRange) directionWidth = 1;

        if (!Breathing) directionWidth = 0;
        width += directionWidth * animationSpeed;

        const gradientStopsString = gradientStops
          .map((stop, index) => `${gradientColors[index]} ${stop}%`)
          .join(", ");

        const gradient = `radial-gradient(${width}% ${width + topOffset}% at 50% 35%, ${gradientStopsString})`;

        if (containerRef.current) {
          containerRef.current.style.background = gradient;
        }
      }
      animationFrame = requestAnimationFrame(animateGradient);
    };

    animationFrame = requestAnimationFrame(animateGradient);

    return () => cancelAnimationFrame(animationFrame);
  }, [startingGap, Breathing, gradientColors, gradientStops, animationSpeed, breathingRange, topOffset]);

  return (
    <motion.div
      key="animated-gradient-background"
      initial={{
        opacity: 0,
        scale: 1.25,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 2.2,
          ease: [0.16, 1, 0.3, 1], // Premium cubic-bezier out easing
        },
      }}
      className={`absolute inset-0 overflow-hidden ${containerClassName}`}
    >
      <div
        ref={containerRef}
        style={{ ...containerStyle, willChange: "background", contain: "paint" }}
        className="absolute inset-0 transition-transform duration-1000 ease-out"
      />
    </motion.div>
  );
};

export default AnimatedGradientBackground;

