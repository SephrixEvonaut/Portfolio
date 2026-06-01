"use client";

import { skills } from "@/lib/data";
import FadeIn from "./FadeIn";

const categories = ["Frontend", "Backend", "AI / Integrations", "Tools", "Hardware / Systems"] as const;

export default function Skills() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        backgroundImage: "url('/skills-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative mx-auto max-w-4xl">
        <FadeIn>
          <div id="skills" className="scroll-mt-24 mb-12 text-center relative">
            {/* GIF — desktop only, absolutely anchored to the right so heading stays centered */}
            <img
              src="/napoleon.gif"
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[30vw] lg:w-87.5 rounded-xl opacity-90 shadow-lg"
            />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">My Skills</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-red-600" />
          </div>
        </FadeIn>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <FadeIn key={cat} delay={i * 0.1}>
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-400">
                  {cat}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === cat)
                    .map((s) => (
                      <li
                        key={s.name}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-neutral-200 transition hover:border-red-400/60 hover:text-red-300"
                      >
                        {s.name}
                      </li>
                    ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
