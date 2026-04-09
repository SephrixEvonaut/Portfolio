"use client";

import SectionHeading from "./SectionHeading";
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
    <section className="py-24 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <SectionHeading label="Resume" id="resume" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center text-center">
            <p className="max-w-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Interested in working together? Download my resume or get in touch through any of
              the channels below.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
              >
                <FileText size={16} />
                View Resume
              </a>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-sm font-semibold transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
            <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-blue-500 mb-6">
              Get In Touch
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 max-w-lg mx-auto">
              <a
                href="mailto:tylermcrae480@gmail.com?subject=Let's%20Work%20Together"
                className="relative flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5 py-4 transition hover:border-blue-400/50 hover:shadow-md"
              >
                <Mail size={20} className="text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs text-neutral-500">Email</p>
                  <p className="text-sm font-medium">{socialLinks.email}</p>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyEmail(); }}
                  className="absolute top-2 right-2 p-1 rounded text-neutral-400 hover:text-blue-500 transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </a>

              <a
                href={`tel:${socialLinks.phone}`}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5 py-4 transition hover:border-blue-400/50 hover:shadow-md"
              >
                <Phone size={20} className="text-blue-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-neutral-500">Phone</p>
                  <p className="text-sm font-medium">{socialLinks.phone}</p>
                </div>
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5 py-4 transition hover:border-blue-400/50 hover:shadow-md"
              >
                <LinkedinIcon size={20} className="text-blue-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-neutral-500">LinkedIn</p>
                  <p className="text-sm font-medium">Tyler McRae</p>
                </div>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5 py-4 transition hover:border-blue-400/50 hover:shadow-md"
              >
                <GithubIcon size={20} className="text-blue-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-neutral-500">GitHub</p>
                  <p className="text-sm font-medium">@SephrixEvonaut</p>
                </div>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
