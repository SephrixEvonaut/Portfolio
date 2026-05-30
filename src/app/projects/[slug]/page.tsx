import { projects } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import IntroVideoGate from "@/components/IntroVideoGate";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Tyler McRae`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div
      className="min-h-screen text-neutral-100"
      style={{
        backgroundImage: "url('/about-projects-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        backgroundColor: "#040d07",
      }}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-lg border-b border-white/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
          <div className="flex items-center gap-4">
            <IntroVideoGate
              youtubeId={project.introVideoId}
              projectTitle={project.title}
            />
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Live site"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Hero area */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-400">
            Project Deep Dive
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-neutral-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Embedded video(s) */}
        <section className="mb-16">
          {project.videos && project.videos.length > 0 ? (
            project.videos.map((video) => (
              <div key={video.title} className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-white">{video.title}</h2>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            ))
          ) : (
            <>
              <h2 className="mb-4 text-2xl font-bold text-white">Project Vlog</h2>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} vlog`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </>
          )}
        </section>

        {/* Blog content */}
        <article className="max-w-none">
          {project.blogContent.split("\n").map((line, i) => {
            const trimmed = line.trimStart();

            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-white">
                  {trimmed.slice(3)}
                </h2>
              );
            }
            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={i} className="mt-8 mb-3 text-xl font-semibold text-white">
                  {trimmed.slice(4)}
                </h3>
              );
            }
            if (trimmed.startsWith("| ")) {
              return (
                <p key={i} className="font-mono text-sm text-neutral-400">
                  {trimmed}
                </p>
              );
            }
            if (trimmed.startsWith("- ")) {
              const text = trimmed.slice(2);
              const parts = text.split(/\*\*(.*?)\*\*/g);
              return (
                <li key={i} className="ml-4 list-disc text-neutral-300 leading-relaxed">
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-white font-semibold">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </li>
              );
            }
            if (trimmed === "") return null;

            const parts = trimmed.split(/\*\*(.*?)\*\*/g);
            return (
              <p key={i} className="text-neutral-300 leading-relaxed mb-4">
                {parts.map((part, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="text-white font-semibold">
                      {part}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </p>
            );
          })}
        </article>

        {/* CTA */}
        <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-white/15 pt-10">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
          >
            <ExternalLink size={16} />
            View Live Project
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <GithubIcon size={16} />
            View Source Code
          </a>
          <Link
            href="/#projects"
            className="ml-auto text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            ← All Projects
          </Link>
        </div>
      </main>
    </div>
  );
}
