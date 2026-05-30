"use client";

import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="relative shadow-lg"
      style={{
        backgroundImage: "url('/nav-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        borderTop: "1px solid rgba(255,255,255,0.45)",
        boxShadow: "0 -4px 32px rgba(255,255,255,0.35), 0 -1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 py-10 px-6 text-sm text-neutral-300">
        <p>&copy; {new Date().getFullYear()} Tyler McRae. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
