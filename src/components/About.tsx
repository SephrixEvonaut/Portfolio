"use client";

import Image from "next/image";
import SectionHeading from "./SectionHeading";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <SectionHeading label="About Me" id="about" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] items-start">
            {/* Profile photo */}
            <div className="mx-auto w-60 h-60 rounded-2xl overflow-hidden shadow-lg shrink-0">
              <Image
                src="/portfolio_PFP.jpg"
                alt="Tyler McRae"
                width={240}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>
                I&apos;m a self-taught full-stack engineer who builds real-time systems, AI-powered pipelines, and developer tools in TypeScript and Node.js. My projects span the full vertical, from kernel-level USB HID input handling and hardware integration all the way up to webhook-driven SaaS dashboards with AI commit analysis. I learn by shipping, and I ship by solving problems I actually have.
              </p>
              <p>
                My path into engineering started with game automation. I wanted to build a better input system for an MMO I play, and that rabbit hole led me through state machines, gesture detection algorithms, async timing engines, and eventually a full Electron desktop app. That same drive is what produced ShipWatch Live, a GitHub monitoring platform where every commit can be reviewed by AI and fixed with a single click. I care less about frameworks and more about understanding the systems underneath them.
              </p>
              <p>
                Outside of code, I&apos;m usually deep in a Brandon Sanderson or James S.A. Corey novel, running a D&amp;D campaign, watching Jujutsu Kaisen or a Studio Ghibli film, or writing stories of my own. The throughline is the same thing that drives my engineering. I like building worlds and understanding how complex systems fit together.
              </p>
              <p>
                I&apos;m looking for an engineering team where I can bring this kind of intensity to real problems. A place where self-taught builders who ship fast and learn constantly are valued.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
