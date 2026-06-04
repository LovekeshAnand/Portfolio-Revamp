"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/utils/blogData";

export default function BlogPageClient() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white flex flex-col select-none overflow-hidden pt-32">
      {/* Background Matrix Orange Line Grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(249, 115, 22, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Radial ambient glow */}
      <div className="absolute top-[-10%] right-[10%] w-[60%] h-[50%] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full pb-24">
        
        {/* Header Header */}
        <div className="mb-16">
          <span className="font-mono text-xs font-semibold text-orange-500 tracking-[0.35em] uppercase block mb-3 animate-[pulse_3s_infinite]">
            TRANSMISSIONS // ENGINEERING BLOG
          </span>
          <h1 className="font-author text-5xl md:text-7xl font-normal tracking-tight text-white leading-none">
            Technical <em className="italic font-serif text-orange-400">Insights</em>
          </h1>
          <p className="font-author text-base text-neutral-400 font-light mt-4 max-w-xl leading-relaxed">
            Deep-dives into database performance tuning, AWS configuration structures, secure networking, and systems programming practices.
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="flex flex-col gap-10">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-white/[0.06] rounded-2xl bg-[#0d0d0d]/50 hover:bg-[#0d0d0d]/90 hover:border-orange-500/30 p-6 md:p-8 transition-all duration-400 cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.4)] select-text"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono text-xs tracking-wider text-neutral-500 select-none pointer-events-none">
                <span className="text-orange-500/80 font-bold uppercase">{post.category}</span>
                <div className="flex items-center gap-3">
                  <span>{post.publishDate}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h2 className="font-author text-2xl md:text-3.5xl font-semibold text-white group-hover:text-orange-400 transition-colors duration-300 leading-snug mb-3">
                {post.title}
              </h2>

              <p className="font-author text-base text-neutral-400 font-light leading-relaxed mb-5">
                {post.summary}
              </p>

              <span className="inline-flex items-center gap-1 text-xs font-mono tracking-widest uppercase text-orange-400 select-none pointer-events-none group-hover:underline">
                Read Dispatch
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
