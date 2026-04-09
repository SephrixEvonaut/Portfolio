"use client";

import { skills } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import FadeIn from "./FadeIn";

const categories = ["Frontend", "Backend", "Tools"] as const;

export default function Skills() {
  return (
    <section className="py-24 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <SectionHeading label="My Skills" id="skills" />
        </FadeIn>

        <div className="grid gap-10 md:grid-cols-3">
          {categories.map((cat, i) => (
            <FadeIn key={cat} delay={i * 0.1}>
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-500">
                  {cat}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === cat)
                    .map((s) => (
                      <li
                        key={s.name}
                        className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-1.5 text-sm font-medium transition hover:border-blue-400 hover:text-blue-500"
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
