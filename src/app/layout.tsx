import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import StickyHeaders from "@/components/common/StickyHeaders";
import SmoothScroll from "@/components/common/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const bebas = localFont({
  src: "../../public/fonts/bebas-neue.regular.otf",
  variable: "--font-bebas",
  display: "swap",
});

// Elegant serif for headlines
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lovekeshanand.com"),
  title: {
    default: "Lovekesh Anand | Software Engineer & Systems Architect", // 53 characters
    template: "%s | Lovekesh Anand",
  },
  description: "Lovekesh Anand is a systems-focused software engineer and designer specializing in self-hosted legal AI pipelines, database tuning, and cloud topology.", // 151 characters
  keywords: [
    "Lovekesh Anand",
    "Systems Engineer",
    "Software Engineer",
    "Systems Architect",
    "Indian Legal AI",
    "NyayaAI",
    "ServiceFlow",
    "Database Performance",
    "Next.js Portfolio",
    "Go Developer",
    "Rust Developer",
    "AWS Cloud Topology"
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Lovekesh Anand | Software Engineer & Systems Architect",
    description: "Lovekesh Anand is a systems-focused software engineer and designer specializing in self-hosted legal AI pipelines, database tuning, and cloud topology.",
    url: "https://lovekeshanand.com",
    siteName: "Lovekesh Anand Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lovekesh Anand - Software Engineer & Systems Architect",
      },
    ],
  },
  other: {
    "reply-to": "lovekeshanand6@gmail.com",
    "robots": "noodp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}
      </head>
      <body className="min-h-full flex flex-col relative font-sans">
        <SmoothScroll />
        {children}
        <StickyHeaders />
        <Analytics />
      </body>
    </html>
  );
}

