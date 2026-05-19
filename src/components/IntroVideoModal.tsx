"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  youtubeId: string;
  projectTitle: string;
  onClose: () => void;
}

export default function IntroVideoModal({ youtubeId, projectTitle, onClose }: Props) {
  const [playing, setPlaying] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    skipRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} intro video`}
    >
      <div className="relative w-[90vw] max-w-3xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden">
        <div className="absolute top-3 right-4 z-10">
          <button
            ref={skipRef}
            onClick={onClose}
            className="text-sm text-neutral-400 hover:text-blue-400 transition-colors"
          >
            Skip intro →
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${projectTitle} intro`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 w-full h-full"
              aria-label="Play intro video"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 shadow-[0_0_32px_rgba(37,99,235,0.7)] animate-pulse group-hover:scale-110 group-hover:shadow-[0_0_48px_rgba(37,99,235,0.9)] transition-all duration-200">
                  <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="px-6 py-4">
          <p className="text-sm font-semibold text-neutral-100">{projectTitle}</p>
          <p className="text-xs text-neutral-500 mt-0.5">60-second tour</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
