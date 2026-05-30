"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function NapoleonModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          setOpen(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* THE CLOSE BUTTON — impossible to miss */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-0 right-0 z-10 flex items-center gap-2 rounded-bl-2xl bg-red-600 hover:bg-red-500 active:bg-red-700 px-5 py-3 text-white font-black text-xl tracking-wide shadow-[0_0_24px_rgba(220,38,38,0.8)] transition-colors"
          aria-label="Close"
        >
          ✕ CLOSE
        </button>

        <img
          src="/napoleon.gif"
          alt="Girls only want boyfriends who have great skills."
          className="block max-w-[90vw] max-h-[80vh]"
        />
      </div>
    </div>,
    document.body
  );
}
