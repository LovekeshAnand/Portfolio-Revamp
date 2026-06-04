"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      alert("EmailJS configuration is missing. Please check your environment variables.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );
      setSubmitStatus("success");
      formRef.current?.reset();
    } catch (err) {
      console.error("EmailJS Error: ", err);
      setSubmitStatus("error");
      alert("Something went wrong while sending. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-transparent text-neutral-200 border-t border-white/5">
      
      {/* ── TWO-COLUMN DUAL LAYOUT ────────────────────────────────────────── */}
      <section id="contact" className="relative grid grid-cols-1 lg:grid-cols-12 border-b border-white/5 select-none">
        
        {/* Sticky Left Column */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/5 p-8 md:p-12 lg:sticky lg:top-24 h-fit">
          <span className="font-sans text-sm font-medium text-orange-500 tracking-[0.3em] uppercase block mb-3 animate-pulse">
            05 / CONNECTION
          </span>
          <h2 className="font-author text-5xl md:text-6.5vw xl:text-6.5rem font-normal tracking-tight text-white leading-none">
            Get in <br /><em className="italic font-serif text-orange-400">Touch</em>
          </h2>
          <p className="font-author text-lg text-neutral-400 font-light mt-5 leading-relaxed max-w-sm">
            Let's discuss high-performance architectures, systems engineering pipelines, or custom full-stack builds.
          </p>
        </div>

        {/* Right Content Column (Form + Info Sidebar Grid) */}
        <div className="lg:col-span-8 p-8 md:p-16 grid grid-cols-1 xl:grid-cols-12 gap-12 select-text">
          
          {/* Column A: Contact Form (xl:col-span-7) */}
          <div className="xl:col-span-7 flex flex-col justify-center select-text">
            <h3 className="font-author text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-10 leading-tight select-none">
              You've got the idea, <em className="italic font-serif text-orange-400">leave the rest to me!</em>
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 font-author">
              <input type="hidden" name="time" value={new Date().toLocaleString()} />

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="relative group/input">
                  <label className="block text-xs sm:text-sm font-mono font-medium text-neutral-400 uppercase tracking-widest mb-2 select-none">
                    Name*
                  </label>
                  <div className="relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/20 transition-all duration-300 group-hover/input:border-orange-500/20">
                    <input
                      placeholder="Your Name"
                      type="text"
                      name="name"
                      required
                      className="w-full bg-transparent py-4 px-5 text-base sm:text-lg text-white focus:outline-none placeholder-neutral-500 transition-all duration-300 font-normal focus:bg-neutral-950/40"
                    />
                    <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-orange-500 origin-left scale-x-0 transition-transform duration-500 group-focus-within/input:scale-x-100" />
                  </div>
                </div>

                {/* Email */}
                <div className="relative group/input">
                  <label className="block text-xs sm:text-sm font-mono font-medium text-neutral-400 uppercase tracking-widest mb-2 select-none">
                    Email*
                  </label>
                  <div className="relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/20 transition-all duration-300 group-hover/input:border-orange-500/20">
                    <input
                      placeholder="Your Email"
                      type="email"
                      name="email"
                      required
                      className="w-full bg-transparent py-4 px-5 text-base sm:text-lg text-white focus:outline-none placeholder-neutral-500 transition-all duration-300 font-normal focus:bg-neutral-950/40"
                    />
                    <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-orange-500 origin-left scale-x-0 transition-transform duration-500 group-focus-within/input:scale-x-100" />
                  </div>
                </div>

              </div>

              {/* Referral Dropdown Selector */}
              <div className="relative group/input">
                <label className="block text-xs sm:text-sm font-mono font-medium text-neutral-400 uppercase tracking-widest mb-2 select-none">
                  How did you hear about me?
                </label>
                <div className="relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/20 transition-all duration-300 group-hover/input:border-orange-500/20">
                  <select
                    title="Select an option"
                    name="source"
                    className="w-full bg-transparent py-4 px-5 text-base sm:text-lg text-white focus:outline-none transition-all duration-300 appearance-none bg-no-repeat bg-right font-medium cursor-pointer focus:bg-neutral-950/40"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                      backgroundSize: "1.25rem",
                      backgroundPosition: "calc(100% - 20px) 50%",
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

              {/* Message Box */}
              <div className="relative group/input">
                <label className="block text-xs sm:text-sm font-mono font-medium text-neutral-400 uppercase tracking-widest mb-2 select-none">
                  Message*
                </label>
                <div className="relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/20 transition-all duration-300 group-hover/input:border-orange-500/20">
                  <textarea
                    placeholder="Your Message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent py-4 px-5 text-base sm:text-lg text-white focus:outline-none placeholder-neutral-500 transition-all duration-300 resize-none font-normal leading-relaxed focus:bg-neutral-950/40"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-orange-500 origin-left scale-x-0 transition-transform duration-500 group-focus-within/input:scale-x-100" />
                </div>
              </div>

              {/* Submit Action Button */}
              <div className="pt-4 pb-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/10 text-white font-mono font-bold rounded-xl hover:bg-orange-500 hover:text-black hover:border-orange-500 hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm tracking-[0.25em] uppercase cursor-pointer"
                >
                  {isSubmitting ? "SENDING..." : "SEND"}
                  <svg
                    className="ml-2.5 w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Visual Status Callouts */}
              {submitStatus === "success" && (
                <div className="border border-green-500/20 bg-green-500/5 p-5 text-green-400 font-mono text-sm tracking-wider rounded-xl animate-[pulse_3s_infinite] select-text">
                  ✓ SUCCESS: Message transmitted successfully. I will get back to you shortly.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="border border-red-500/20 bg-red-500/5 p-5 text-red-400 font-mono text-sm tracking-wider rounded-xl select-text">
                  ⚠️ ERROR: Transmission failed. Please verify your connection or email directly.
                </div>
              )}

            </form>
          </div>

          {/* Column B: Direct Contact Info (xl:col-span-5) */}
          <div className="xl:col-span-5 flex flex-col justify-start gap-10 font-author border-t xl:border-t-0 xl:border-l border-white/5 pt-10 xl:pt-0 xl:pl-12 select-text">
            
            <div>
              <span className="text-sm font-mono font-semibold text-neutral-400 tracking-[0.25em] uppercase flex items-center mb-3.5 select-none">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 animate-pulse" />
                DIRECT EMAIL
              </span>
              <a
                href="mailto:lovekeshanand6@gmail.com"
                className="text-xl sm:text-2xl lg:text-3.5xl font-medium text-white hover:text-orange-400 transition-colors duration-300 block font-mono"
              >
                lovekeshanand6@gmail.com
              </a>
            </div>

            <div>
              <span className="text-sm font-mono font-semibold text-neutral-400 tracking-[0.25em] uppercase flex items-center mb-3.5 select-none">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 animate-pulse" />
                PHONE ENDPOINT
              </span>
              <a
                href="tel:+918929750553"
                className="text-xl sm:text-2xl lg:text-3.5xl font-medium text-white hover:text-orange-400 transition-colors duration-300 block font-mono"
              >
                +91 89297 50553
              </a>
            </div>

            <div className="border-t border-white/5 pt-8">
              <span className="text-sm font-mono font-semibold text-neutral-400 tracking-[0.25em] uppercase flex items-center mb-3 select-none">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 animate-pulse" />
                GEOLOCATION
              </span>
              <p className="text-lg sm:text-xl font-medium text-white font-author">
                New Delhi, India
              </p>
              <p className="text-sm sm:text-base text-neutral-400 mt-2 leading-relaxed font-light font-author">
                Operating standard Indian Standard Time (IST) zones. Open to remote contracts across global networks.
              </p>
            </div>

          </div>

        </div>

      </section>
      
    </div>
  );
};

export default ContactForm;
