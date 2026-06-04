import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import StickyHeaders from "@/components/StickyHeaders";
import SmoothScroll from "@/components/SmoothScroll";
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
  title: "Lovekesh Anand | Portfolio",
  description: "Lovekesh Anand is a software engineer and designer based in India.",
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
      <body className="min-h-full flex flex-col relative font-sans">
        <SmoothScroll />
        {children}
        <StickyHeaders />
      </body>
    </html>
  );
}

