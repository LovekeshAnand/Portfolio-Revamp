"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [latency, setLatency] = useState<number | null>(null);
  const [sessionKey, setSessionKey] = useState<string>("");
  const [pingHistory, setPingHistory] = useState<number[]>([]);
  const [timeStr, setTimeStr] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING SECURE PORTAL DECK-C5...",
    "HANDSHAKE PROTOCOL: WSS / TLS 1.3",
    "AWAITING INPUT DATA DISPATCH..."
  ]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLogs((prev) => [...prev.slice(-6), `[${time}] ${msg}`]);
  };

  // Generate a random mock Session Key on mount
  useEffect(() => {
    const hex = "0123456789ABCDEF";
    let token = "TOKEN-";
    for (let i = 0; i < 16; i++) {
      token += hex[Math.floor(Math.random() * 16)];
    }
    setSessionKey(token);
    addLog(`SESSION_KEY: ${token} REGISTERED`);
  }, []);

  // Update clock string
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeStr(date.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Latency telemetry poll & chart logger
  useEffect(() => {
    const measureLatency = async () => {
      const start = performance.now();
      try {
        await fetch("/favicon.ico", { cache: "no-store", method: "HEAD" });
        const end = performance.now();
        const ping = Math.round(end - start);
        setLatency(ping);
        setPingHistory((prev) => [...prev.slice(-8), ping]);
        addLog(`TELEMETRY: ping packet received [${ping}ms]`);
      } catch (e) {
        const ping = Math.floor(Math.random() * 25) + 15;
        setLatency(ping);
        setPingHistory((prev) => [...prev.slice(-8), ping]);
        addLog(`TELEMETRY: connection simulation active [${ping}ms]`);
      }
    };
    measureLatency();
    const interval = setInterval(measureLatency, 4000);
    return () => clearInterval(interval);
  }, []);

  // Interactive Digital Rain canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Matrix lines configs
    const columns = Math.floor(width / 24) + 1;
    const yPositions = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(249, 115, 22, 0.15)"; // Sleek orange matrix rain
      ctx.font = "11px monospace";

      for (let i = 0; i < yPositions.length; i++) {
        const char = String.fromCharCode(Math.floor(Math.random() * 128));
        const x = i * 24;
        const y = yPositions[i];
        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 12;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleFocus = (field: string) => {
    addLog(`FOCUS: client active on [${field.toUpperCase()}]`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    addLog(`INPUT: parameter [${e.target.name.toUpperCase()}] updated`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    addLog("TX_START: compiling parameters and signing payload...");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      addLog("SYS_ERROR: email configuration payload not found");
      alert("EmailJS configuration is missing. Please check your environment variables.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      addLog("TX_INGRESS: broadcasting secure handshake pack...");
      await emailjs.sendForm( serviceId, templateId, formRef.current!, publicKey );
      addLog("TX_ACK: handshake success. payload delivered.");
      setSubmitStatus("success");
      formRef.current?.reset();
    } catch (err) {
      console.error("EmailJS Error: ", err);
      addLog("TX_ERROR: connection refused by SMTP server");
      setSubmitStatus("error");
      alert("Something went wrong while sending. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Screen Backdrop Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-20" />

      {/* Immersive Dashboard Container */}
      <div className="relative z-10 min-h-screen bg-transparent text-neutral-200 flex flex-col pt-28 pb-20 select-text">
        <main className="flex-grow max-w-7xl w-full mx-auto px-6 flex flex-col justify-center">
          
          {/* Header metadata breadcrumbs */}
          <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4 select-none">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.01] hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all duration-300 font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-semibold"
              >
                ← Return to Base
              </Link>
              <span className="text-[10px] font-mono text-neutral-600">/</span>
              <span className="text-[9px] font-mono tracking-widest text-orange-500 font-semibold uppercase animate-pulse">
                DECK-C5 // DISPATCH_CONSOLE
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 font-mono text-[10px] text-neutral-500">
              <span>LATENCY: {latency ? `${latency}ms` : "checking..."}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>IST: {timeStr}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-stretch">
            
            {/* ── COLUMN 1: LIVE DIAGNOSTICS (lg:col-span-5) ────────────────── */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-[#040404]/60 backdrop-blur-md border border-white/5 p-6 sm:p-8 rounded-2xl relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Corner sci-fi trims */}
              <div className="absolute top-0 left-0 w-3 h-[2px] bg-orange-500/40" />
              <div className="absolute top-0 left-0 w-[2px] h-3 bg-orange-500/40" />
              <div className="absolute bottom-0 right-0 w-3 h-[2px] bg-orange-500/40" />
              <div className="absolute bottom-0 right-0 w-[2px] h-3 bg-orange-500/40" />

              <div className="border-b border-white/5 pb-4">
                <span className="text-[10px] font-mono text-orange-500 tracking-[0.25em] block mb-1">SYS_DIAGNOSTICS</span>
                <h2 className="font-author text-2.5xl font-semibold text-white tracking-tight leading-tight">
                  Telemetry Monitor
                </h2>
              </div>

              {/* Real-time Session details */}
              <div className="grid grid-cols-2 gap-4 font-mono text-[11px] border-b border-white/5 pb-6">
                <div>
                  <span className="text-neutral-500 block mb-0.5">LOCAL TIME</span>
                  <span className="text-white font-medium">{timeStr || "00:00:00"}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">SERVER STATUS</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    ONLINE
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">IP TELEMETRY</span>
                  <span className="text-white font-medium">MEASURED CLIENT</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">SESSION_ID</span>
                  <span className="text-orange-400 font-medium truncate block max-w-[120px]">{sessionKey}</span>
                </div>
              </div>

              {/* Latency History Graph */}
              <div className="flex-1 flex flex-col gap-3 min-h-[140px]">
                <span className="text-[9px] font-mono text-neutral-500 tracking-wider">LATENCY HISTOGRAM (4s SAMPLES)</span>
                <div className="flex-grow bg-black/40 border border-white/5 rounded-xl p-4 flex items-end justify-between gap-1.5 h-[120px] relative overflow-hidden select-none">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_12px] opacity-45 pointer-events-none" />
                  
                  {pingHistory.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-neutral-600">
                      Gathering network packets...
                    </div>
                  ) : (
                    pingHistory.map((ping, idx) => {
                      const maxPing = 100; // clamp for scaling
                      const heightPercent = Math.min(100, (ping / maxPing) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end gap-1.5 group/bar">
                          <span className="font-mono text-[9px] text-orange-400 opacity-0 group-hover/bar:opacity-100 transition-opacity absolute top-2 bg-black/90 border border-white/10 px-1 py-0.5 rounded">
                            {ping}ms
                          </span>
                          <div 
                            className="w-full bg-gradient-to-t from-orange-500/20 to-orange-500 hover:from-orange-500 hover:to-orange-400 transition-all duration-300 rounded-t"
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="font-mono text-[7px] text-neutral-600 select-none">P0{idx+1}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Animated Map / Geo SVG details */}
              <div className="border-t border-white/5 pt-6 flex flex-col gap-3">
                <span className="text-[9px] font-mono text-neutral-500 tracking-wider">ROUTING ENDPOINT CONNECTOR</span>
                <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden h-[80px]">
                  <svg className="w-10 h-10 text-orange-500/40 animate-pulse shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                  </svg>
                  <div className="font-mono text-[10px] text-neutral-400 leading-relaxed">
                    <div className="text-white font-medium">CLIENT GATEWAY → NEW DELHI</div>
                    <div className="text-neutral-500 text-[9px] mt-0.5">LAT/LONG: 28.6139° N, 77.2090° E // REMOTE PORTAL</div>
                  </div>
                </div>
              </div>

              {/* Direct links badges */}
              <div className="flex flex-wrap gap-2 pt-2 select-none">
                <a href="https://github.com/LovekeshAnand" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center rounded-lg border border-white/5 bg-white/[0.01] hover:border-orange-500/40 hover:text-orange-400 transition-colors text-[10px] font-mono tracking-widest uppercase font-semibold">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/lovekesh-anand" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center rounded-lg border border-white/5 bg-white/[0.01] hover:border-orange-500/40 hover:text-orange-400 transition-colors text-[10px] font-mono tracking-widest uppercase font-semibold">
                  LinkedIn
                </a>
              </div>

            </div>

            {/* ── COLUMN 2: SECURE DISPATCHER FORM (lg:col-span-7) ─────────── */}
            <div className="lg:col-span-7 flex flex-col bg-[#040404]/60 backdrop-blur-md border border-white/5 p-6 sm:p-8 rounded-2xl relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Corner sci-fi trims */}
              <div className="absolute top-0 right-0 w-3 h-[2px] bg-orange-500/40" />
              <div className="absolute top-0 right-0 w-[2px] h-3 bg-orange-500/40" />
              <div className="absolute bottom-0 left-0 w-3 h-[2px] bg-orange-500/40" />
              <div className="absolute bottom-0 left-0 w-[2px] h-3 bg-orange-500/40" />

              <div className="border-b border-white/5 pb-4 mb-6 select-none">
                <span className="text-[10px] font-mono text-orange-500 tracking-[0.25em] block mb-1">TRANSMISSION_GATEWAY</span>
                <h3 className="font-author text-2.5xl font-semibold text-white tracking-tight leading-tight">
                  Secure Data Dispatcher
                </h3>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 font-author flex-grow flex flex-col justify-between">
                <div className="space-y-5">
                  <input type="hidden" name="time" value={new Date().toLocaleString()} />

                  {/* Name */}
                  <div className="relative group/input">
                    <label className="block text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-widest mb-1.5 select-none">
                      Name*
                    </label>
                    <div className="relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/20 transition-all duration-300 group-hover/input:border-orange-500/20">
                      <input
                        placeholder="Your Name"
                        type="text"
                        name="name"
                        required
                        onFocus={() => handleFocus("name")}
                        onChange={handleChange}
                        className="w-full bg-transparent py-3 px-4 text-sm text-white focus:outline-none placeholder-neutral-600 transition-all duration-300 font-normal focus:bg-neutral-950/40"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-orange-500 origin-left scale-x-0 transition-transform duration-500 group-focus-within/input:scale-x-100" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative group/input">
                    <label className="block text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-widest mb-1.5 select-none">
                      Email*
                    </label>
                    <div className="relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/20 transition-all duration-300 group-hover/input:border-orange-500/20">
                      <input
                        placeholder="Your Email"
                        type="email"
                        name="email"
                        required
                        onFocus={() => handleFocus("email")}
                        onChange={handleChange}
                        className="w-full bg-transparent py-3 px-4 text-sm text-white focus:outline-none placeholder-neutral-600 transition-all duration-300 font-normal focus:bg-neutral-950/40"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-orange-500 origin-left scale-x-0 transition-transform duration-500 group-focus-within/input:scale-x-100" />
                    </div>
                  </div>

                  {/* Source Dropdown */}
                  <div className="relative group/input">
                    <label className="block text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-widest mb-1.5 select-none">
                      How did you hear about me?
                    </label>
                    <div className="relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/20 transition-all duration-300 group-hover/input:border-orange-500/20">
                      <select
                        title="Select an option"
                        name="source"
                        onFocus={() => handleFocus("referral source")}
                        onChange={handleChange}
                        className="w-full bg-transparent py-3 px-4 text-sm text-white focus:outline-none transition-all duration-300 appearance-none bg-no-repeat bg-right font-medium cursor-pointer focus:bg-neutral-950/40"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundSize: "1.25rem",
                          backgroundPosition: "calc(100% - 16px) 50%",
                        }}
                      >
                        <option value="" className="bg-neutral-900 text-white">Select an option</option>
                        <option value="google" className="bg-neutral-900 text-white">Google Search</option>
                        <option value="github" className="bg-neutral-900 text-white">GitHub Profile</option>
                        <option value="linkedin" className="bg-neutral-900 text-white">LinkedIn Profile</option>
                        <option value="referral" className="bg-neutral-900 text-white">Referral / Colleague</option>
                        <option value="social" className="bg-neutral-900 text-white">Social Media</option>
                      </select>
                      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-orange-500 origin-left scale-x-0 transition-transform duration-500 group-focus-within/input:scale-x-100" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative group/input">
                    <label className="block text-[10px] font-mono font-medium text-neutral-400 uppercase tracking-widest mb-1.5 select-none">
                      Message*
                    </label>
                    <div className="relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/20 transition-all duration-300 group-hover/input:border-orange-500/20">
                      <textarea
                        placeholder="Your Message"
                        name="message"
                        rows={4}
                        required
                        onFocus={() => handleFocus("message")}
                        onChange={handleChange}
                        className="w-full bg-transparent py-3 px-4 text-sm text-white focus:outline-none placeholder-neutral-600 transition-all duration-300 resize-none font-normal leading-relaxed focus:bg-neutral-950/40"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-orange-500 origin-left scale-x-0 transition-transform duration-500 group-focus-within/input:scale-x-100" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {/* Dispatch Action */}
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-6 py-3.5 border border-white/10 text-white font-mono font-bold rounded-xl hover:bg-orange-500 hover:text-black hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed text-[10px] tracking-[0.2em] uppercase cursor-pointer"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "SUBMIT DISPATCH"}
                      <svg
                        className="ml-2 w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <span className="hidden sm:inline font-mono text-[9px] text-neutral-500">PACKET_SIZE: ~512B</span>
                  </div>

                  {/* Status logs */}
                  {submitStatus === "success" && (
                    <div className="border border-green-500/20 bg-green-500/5 p-4 text-green-400 font-mono text-xs tracking-wider rounded-xl animate-[pulse_3s_infinite] select-text">
                      ✓ DISPATCH LOGGED SUCCESS: Secure payload packet transmitted. Endpoint has logged status ACK.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="border border-red-500/20 bg-red-500/5 p-4 text-red-400 font-mono text-xs tracking-wider rounded-xl select-text">
                      ⚠️ DISPATCH ERROR: Broadcaster connection timed out. Please contact directly at email endpoint.
                    </div>
                  )}

                  {/* Live System Logs logger screen */}
                  <div className="bg-[#050505] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-orange-500/80 leading-relaxed shadow-inner overflow-hidden min-h-[140px] flex flex-col justify-end select-none">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 select-none opacity-60">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
                        CONSOLE_STREAM_LOGS
                      </span>
                      <span>TELEMETRY: LOGGING</span>
                    </div>
                    <div className="space-y-1">
                      {logs.map((log, i) => (
                        <div key={i} className="font-mono opacity-90">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </form>
            </div>

          </div>

        </main>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
