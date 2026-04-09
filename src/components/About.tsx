"use client";

import SectionHeading from "./SectionHeading";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <SectionHeading label="About Me" id="about" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] items-start">
            {/* Avatar / visual placeholder */}
            <div className="mx-auto w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg flex items-center justify-center text-white text-5xl font-bold select-none">
              TM
            </div>

            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>
                I&apos;m a passionate software developer who loves building things for the web.
                With a strong foundation in both frontend and backend technologies, I enjoy
                turning complex problems into simple, beautiful, and intuitive solutions.
              </p>
              <p>
                When I&apos;m not writing code, you&apos;ll find me exploring new technologies,
                contributing to open-source projects, or leveling up my skills through hands-on
                project work. I believe great software is built at the intersection of technical
                excellence and genuine empathy for the end user.
              </p>
              <p>
                I&apos;m currently looking for opportunities where I can contribute, learn, and
                grow alongside a talented team.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
