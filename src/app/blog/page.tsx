import { Metadata } from "next";
import BlogPageClient from "@/components/pages/BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical insights and deep-dives into database performance, cloud topology, secure networking, and systems engineering by Lovekesh Anand.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    title: "Blog | Lovekesh Anand",
    description: "Technical insights and deep-dives into database performance, cloud topology, secure networking, and systems engineering by Lovekesh Anand.",
    url: "https://lovekesh-builds.vercel.app/blog",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lovekesh Anand Technical Blog",
      },
    ],
  },
};

export default function BlogIndexPage() {
  return <BlogPageClient />;
}
