import { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Secure a direct channel connection with Lovekesh Anand. Dispatch messages, establish telemetry links, or secure a systems contract handshake.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    title: "Contact | Lovekesh Anand",
    description: "Secure a direct channel connection with Lovekesh Anand. Dispatch messages, establish telemetry links, or secure a systems contract handshake.",
    url: "https://lovekesh-builds.vercel.app/contact",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lovekesh Anand Contact Portal",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
