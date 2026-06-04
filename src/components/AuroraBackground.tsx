"use client";

import React, { ReactNode } from "react";

// Zero-dependency tailwind class helper
const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen w-full items-center justify-center bg-white text-neutral-900 transition-bg overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none bg-white">
        
        {/* Primary soft static blue/indigo ambient glow in the center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] opacity-90"
          style={{
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.13) 0%, rgba(99, 102, 241, 0.04) 45%, transparent 70%)",
          }}
        />

        {/* Secondary subtle top-right ambient sky blue glow for premium texture */}
        <div 
          className="absolute -top-[20%] right-[-10%] w-[80%] h-[80%] opacity-70"
          style={{
            background: "radial-gradient(circle at center, rgba(14, 165, 233, 0.08) 0%, transparent 65%)",
          }}
        />

        {/* Third accent cyan/teal bottom-left bleed */}
        <div 
          className="absolute -bottom-[15%] left-[-10%] w-[70%] h-[70%] opacity-60"
          style={{
            background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.05) 0%, transparent 60%)",
          }}
        />

      </div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

