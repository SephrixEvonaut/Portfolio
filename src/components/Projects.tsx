"use client";

import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import FadeIn from "./FadeIn";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import Link from "next/link";

export default function Projects() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <SectionHeading label="My Projects" id="projects" />
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.1}>
              <div className="group flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm transition hover:shadow-lg hover:border-blue-400/50 h-full">
                {/* Colored bar */}
                <div className="mb-4 h-1.5 w-12 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />

                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                  {p.tagline}
                </p>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-6 flex items-center gap-4 text-sm font-medium">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors"
                  >
                    <GithubIcon size={16} />
                    Code
                  </a>
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="ml-auto text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    View More →
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
