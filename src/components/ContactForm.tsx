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
      
      {/* â”€â”€ TWO-COLUMN DUAL LAYOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="contact" className="relative grid grid-cols-1 lg:grid-cols-12 border-b border-white/5">
        
        {/* Sticky Left Column */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/5 p-8 md:p-12 lg:sticky lg:top-24 h-fit">
          <span className="font-sans text-xs font-medium text-orange-500 tracking-[0.3em] uppercase block mb-3">
            05 / CONNECTION
          </span>
          <h2 className="font-author text-5xl md:text-6.5vw xl:text-6rem font-normal tracking-tight text-white leading-none">
            Get in <br /><em className="italic font-serif text-orange-400">Touch</em>
          </h2>
          <p className="font-author text-sm text-neutral-400 font-normal mt-4 leading-relaxed max-w-xs">
            Let's discuss high-performance architectures, systems engineering pipelines, or custom full-stack builds.
          </p>
        </div>

        {/* Right Content Column (Form + Info Sidebar Grid) */}
        <div className="lg:col-span-8 p-8 md:p-16 grid grid-cols-1 xl:grid-cols-12 gap-12">
          
          {/* Column A: Interactive Contact Form (xl:col-span-7) */}
          <div className="xl:col-span-7 flex flex-col justify-center select-text">
            <h3 className="font-author text-xl sm:text-2xl lg:text-3xl font-light text-white mb-8 leading-tight">
              You've got the idea, <em className="italic font-serif text-orange-400">leave the rest to me!</em>
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 font-author">
              <input type="hidden" name="time" value={new Date().toLocaleString()} />

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1.5">
                    Name*
                  </label>
                  <input
                    placeholder="Your Name"
                    type="text"
                    name="name"
                    required
                    className="w-full border-b border-white/10 bg-white/[0.01] focus:bg-white/[0.05] backdrop-blur-sm py-2.5 px-3 text-sm text-white focus:border-orange-500 focus:outline-none transition-all duration-300 placeholder-neutral-500 font-normal rounded-t-md"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1.5">
                    Email*
                  </label>
                  <input
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    required
                    className="w-full border-b border-white/10 bg-white/[0.01] focus:bg-white/[0.05] backdrop-blur-sm py-2.5 px-3 text-sm text-white focus:border-orange-500 focus:outline-none transition-all duration-300 placeholder-neutral-500 font-normal rounded-t-md"
                  />
                </div>
              </div>

              {/* Referral Dropdown Selector */}
              <div>
                <label className="block text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1.5">
                  How did you hear about me?
                </label>
                <div className="relative">
                  <select
                    title="Select an option"
                    name="source"
                    className="w-full border-b border-white/10 bg-white/[0.01] focus:bg-white/[0.05] backdrop-blur-sm py-2.5 px-3 text-sm text-white focus:border-orange-500 focus:outline-none transition-all duration-300 appearance-none bg-no-repeat bg-right font-medium cursor-pointer rounded-t-md"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                      backgroundSize: "1.25rem",
                      backgroundPosition: "calc(100% - 12px) 50%",
                    }}
                  >
                    <option value="" className="bg-neutral-900 text-white">Select an option</option>
                    <option value="google" className="bg-neutral-900 text-white">Google Search</option>
                    <option value="github" className="bg-neutral-900 text-white">GitHub Profile</option>
                    <option value="linkedin" className="bg-neutral-900 text-white">LinkedIn Profile</option>
                    <option value="referral" className="bg-neutral-900 text-white">Referral / Colleague</option>
                    <option value="social" className="bg-neutral-900 text-white">Social Media</option>
                  </select>
                </div>
              </div>

              {/* Message Box */}
              <div>
                <label className="block text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1.5">
                  Message*
                </label>
                <textarea
                  placeholder="Your Message"
                  name="message"
                  rows={4}
                  required
                  className="w-full border-b border-white/10 bg-white/[0.01] focus:bg-white/[0.05] backdrop-blur-sm py-2.5 px-3 text-sm text-white focus:border-orange-500 focus:outline-none transition-all duration-300 resize-none placeholder-neutral-500 font-normal leading-relaxed rounded-t-md"
                />
              </div>

              {/* Submit Action Pill Button */}
              <div className="pt-4 pb-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-white/15 text-white font-medium rounded-full hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed text-xs tracking-widest"
                >
                  {isSubmitting ? "SENDING..." : "SUBMIT DISPATCH"}
                  <svg
                    className="ml-2 w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Visual Status Callouts */}
              {submitStatus === "success" && (
                <div className="border border-green-500/20 bg-green-500/10 p-4 text-green-400 font-medium text-xs tracking-wider rounded-md animate-[pulse_3s_infinite] select-text">
                  ✓ DISPATCH LOGGED SUCCESS: Your message was transmitted. I will respond to your endpoint shortly.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="border border-red-500/20 bg-red-500/10 p-4 text-red-400 font-medium text-xs tracking-wider rounded-md select-text">
                  ⚠️ DISPATCH ERROR: Transmission failed. Please verify your network telemetry or contact directly at the email endpoint on the right.
                </div>
              )}
            </form>
          </div>

          {/* Column B: Direct Contact Info (xl:col-span-5) */}
          <div className="xl:col-span-5 flex flex-col justify-start gap-8 font-author border-t xl:border-t-0 xl:border-l border-white/5 pt-8 xl:pt-0 xl:pl-10 select-text">
            
            <div>
              <span className="text-[10px] font-medium text-neutral-400 tracking-[0.25em] uppercase flex items-center mb-3">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                DIRECT EMAIL
              </span>
              <a
                href="mailto:lovekeshanand6@gmail.com"
                className="text-lg sm:text-xl font-medium text-white hover:text-orange-400 transition-colors duration-300 block font-mono"
              >
                lovekeshanand6@gmail.com
              </a>
            </div>

            <div>
              <span className="text-[10px] font-medium text-neutral-400 tracking-[0.25em] uppercase flex items-center mb-3">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                PHONE ENDPOINT
              </span>
              <a
                href="tel:+918929750553"
                className="text-lg sm:text-xl font-medium text-white hover:text-orange-400 transition-colors duration-300 block font-mono"
              >
                +91 89297 50553
              </a>
            </div>

            <div className="border-t border-white/5 pt-6">
              <span className="text-[10px] font-medium text-neutral-400 tracking-[0.25em] uppercase flex items-center mb-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                GEOLOCATION
              </span>
              <p className="text-sm font-medium text-white">
                New Delhi, India
              </p>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-light">
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

