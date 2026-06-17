"use client";

import { useRef, useState } from "react";
import { skills } from "@/lib/data";
import FadeIn from "./FadeIn";
import SkillVideoPreview from "./SkillVideoPreview";

const categories = ["Frontend", "Backend", "AI / Integrations", "Tools", "Hardware / Systems"] as const;

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<{ name: string; src: string; rect: DOMRect } | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handlePillEnter(skill: typeof skills[0], e: React.MouseEvent<HTMLLIElement>) {
    if (!skill.videoUrl) return;
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    showTimerRef.current = setTimeout(() => {
      setActiveSkill({ name: skill.name, src: skill.videoUrl!, rect });
    }, 250);
  }

  function handlePillLeave() {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    hideTimerRef.current = setTimeout(() => setActiveSkill(null), 180);
  }

  function handlePreviewEnter() {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }

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
          <div
            id="skills"
            className="scroll-mt-24 mb-12 relative flex items-center justify-center md:min-h-50 lg:min-h-67.5"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">My Skills</h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-red-600" />
            </div>
            {/* GIF — desktop only, absolutely anchored top-right, contained within min-h wrapper */}
            <img
              src="/napoleon.gif"
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute top-0 right-0 w-[30vw] lg:w-87.5 rounded-xl opacity-90 shadow-lg"
            />
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
                        onMouseEnter={(e) => handlePillEnter(s, e)}
                        onMouseLeave={handlePillLeave}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-neutral-200 transition hover:border-red-400/60 hover:text-red-300 cursor-default"
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

      {activeSkill && (
        <SkillVideoPreview
          src={activeSkill.src}
          skillName={activeSkill.name}
          anchorRect={activeSkill.rect}
          onMouseEnter={handlePreviewEnter}
          onMouseLeave={() => setActiveSkill(null)}
        />
      )}
    </section>
  );
}
