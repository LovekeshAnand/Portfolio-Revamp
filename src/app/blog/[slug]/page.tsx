import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPostBySlug, blogPosts } from "@/utils/blogData";
import { notFound } from "next/navigation";

import { Metadata } from "next";

// Generate static params for all dynamic blog routes
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogImage = post.image ?? "/images/og-image.png";

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: `${post.title} | Lovekesh Anand`,
      description: post.summary,
      url: `https://lovekesh-builds.vercel.app/blog/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#070707] text-white flex flex-col overflow-hidden pt-32">
      {/* Background Matrix Orange Line Grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(249, 115, 22, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Radial ambient glow */}
      <div className="absolute top-[-10%] left-[10%] w-[60%] h-[50%] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 relative z-10 max-w-3xl mx-auto px-6 md:px-8 w-full pb-24 select-text">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-500 hover:text-orange-400 transition-colors duration-200 mb-12 select-none"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 8H3M7 12L3 8l4-4" />
          </svg>
          Back to Dispatches
        </Link>

        {/* Article Metadata */}
        <article className="font-author">
          <header className="mb-10 pb-8 border-b border-white/10 select-none">
            <span className="font-mono text-xs font-bold text-orange-500 tracking-[0.25em] uppercase block mb-3">
              {post.category}
            </span>
            <h1 className="text-3.5xl md:text-5xl font-semibold leading-tight tracking-tight text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 font-mono text-xs text-neutral-500 tracking-wider">
              <span>PUBLISHED // {post.publishDate}</span>
              <span>·</span>
              <span>READ DURATION // {post.readTime}</span>
            </div>
          </header>

          {/* Hero Cover Image */}
          {post.image && (
            <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-10 -mt-2">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              {/* Thin bottom fade only — keeps image fully visible */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#070707] to-transparent" />
            </div>
          )}

          {/* Article HTML Content */}
          <div 
            className="prose prose-invert max-w-none text-neutral-300 font-light leading-[1.8] text-base md:text-md select-text"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {styleString}
        </article>

      </main>

      <Footer />
    </div>
  );
}

// Inline CSS overrides to style raw inner HTML elements beautifully without requiring Tailwind Typography plugin
const styleString = (
  <style dangerouslySetInnerHTML={{ __html: `
    .prose p {
      margin-bottom: 1.5rem;
    }
    .prose h3 {
      font-size: 1.35rem;
      font-weight: 600;
      color: #fff;
      margin-top: 2.2rem;
      margin-bottom: 0.8rem;
      letter-spacing: -0.01em;
    }
    .prose ul {
      list-style-type: disc;
      padding-left: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .prose li {
      margin-bottom: 0.5rem;
      font-weight: 300;
    }
    .prose pre {
      background-color: #0c0c0c;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 8px;
      padding: 1.25rem;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      overflow-x: auto;
    }
    .prose code {
      font-family: var(--font-mono), monospace;
      font-size: 0.82rem;
      color: #f97316;
    }
    .prose pre code {
      color: #e5e5e5;
      font-size: 0.8rem;
    }
  ` }} />
);
