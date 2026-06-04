"use client";

import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 select-none font-mono">
      <div className="text-center flex flex-col items-center max-w-sm">
        
        {/* Large minimal 404 */}
        <h1 className="text-8xl sm:text-[10rem] font-light text-neutral-800 tracking-tighter leading-none select-none">
          404
        </h1>

        {/* Status text */}
        <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mt-6 mb-2">
          Page Not Found
        </h2>

        {/* Small explanation */}
        <p className="text-xs text-neutral-600 leading-relaxed font-sans max-w-xs mt-2 mb-8">
          The requested resource is missing, has been renamed, or never existed in this domain.
        </p>

        {/* Return to Home link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs tracking-wider uppercase text-neutral-300 hover:text-white transition-colors duration-300"
        >
          <span>Return Home</span>
          <svg
            className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 12 12"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h8m0 0L7 3m3 3L7 9" />
          </svg>
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
