"use client";

import FadeIn from "./FadeIn";
import { Copy, Check, Download, FileText, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { socialLinks } from "@/lib/data";

export default function Resume() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        backgroundImage: "url('/resume-contact-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto max-w-4xl">
        <FadeIn>
          <div id="resume" className="scroll-mt-24 mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Resume</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-purple-500" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center text-center">
            <p className="max-w-lg text-neutral-300 leading-relaxed mb-8">
              Interested in working together? Download my resume or get in touch through any of
              the channels below.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
              >
                <FileText size={16} />
                View Resume
              </a>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Download size={16} />
                Download PDF
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Contact / Social */}
        <FadeIn delay={0.2}>
          <div id="contact" className="scroll-mt-24">
            <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-purple-400 mb-6">
              Get In Touch
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 max-w-lg mx-auto">
              <a
                href="mailto:tylermcrae480@gmail.com?subject=Let's%20Work%20Together"
                className="relative flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm px-5 py-4 transition hover:border-purple-400/50 hover:bg-white/15"
              >
                <Mail size={20} className="text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs text-neutral-400">Email</p>
                  <p className="text-sm font-medium text-white">{socialLinks.email}</p>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyEmail(); }}
                  className="absolute top-2 right-2 p-1 rounded text-neutral-400 hover:text-purple-400 transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </a>

              <a
                href={`tel:${socialLinks.phone}`}
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm px-5 py-4 transition hover:border-purple-400/50 hover:bg-white/15"
              >
                <Phone size={20} className="text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-neutral-400">Phone</p>
                  <p className="text-sm font-medium text-white">{socialLinks.phone}</p>
                </div>
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm px-5 py-4 transition hover:border-purple-400/50 hover:bg-white/15"
              >
                <LinkedinIcon size={20} className="text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-neutral-400">LinkedIn</p>
                  <p className="text-sm font-medium text-white">Tyler McRae</p>
                </div>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm px-5 py-4 transition hover:border-purple-400/50 hover:bg-white/15"
              >
                <GithubIcon size={20} className="text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-neutral-400">GitHub</p>
                  <p className="text-sm font-medium text-white">@SephrixEvonaut</p>
                </div>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
