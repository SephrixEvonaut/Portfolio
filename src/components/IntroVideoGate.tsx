"use client";

import { useEffect, useState } from "react";
import IntroVideoModal from "./IntroVideoModal";

interface Props {
  youtubeId: string | null;
  projectTitle: string;
}

export default function IntroVideoGate({ youtubeId, projectTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (youtubeId) setOpen(true);
  }, [youtubeId]);

  if (!youtubeId) return null;

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);
  };

  return (
    <>
      {open && (
        <IntroVideoModal
          youtubeId={youtubeId}
          projectTitle={projectTitle}
          onClose={handleClose}
        />
      )}
      {dismissed && !open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-500 hover:border-blue-400 transition-colors"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          Replay intro
        </button>
      )}
    </>
  );
}
