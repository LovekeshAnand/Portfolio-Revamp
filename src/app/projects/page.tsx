import { Metadata } from "next";
import ProjectsPageClient from "@/components/pages/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse the engineering registry of active project nodes, database cache coordinators, and secure microservices built by Lovekesh Anand.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    title: "Projects | Lovekesh Anand",
    description: "Browse the engineering registry of active project nodes, database cache coordinators, and secure microservices built by Lovekesh Anand.",
    url: "https://lovekesh-builds.vercel.app/projects",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lovekesh Anand Engineering Registry",
      },
    ],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
