"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  {
    label: "ShipWatch Live",
    href: "/projects/shipwatch-live",
    bullets: [
      "Agentic workflow",
      "GitHub interactive integration",
      "Extensive LLM parameters",
    ],
  },
  {
    label: "GestureKit",
    href: "/projects/gesturekit",
    bullets: [
      "Event-driven state machine design",
      "Data-driven pipeline + parameterization",
      "Full-stack local application (Electron app)",
    ],
  },
];

function NavPill({ label, href, bullets }: typeof navItems[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link
        href={href}
        className="flex items-center gap-1.5 rounded-full border border-indigo-400/50 bg-indigo-500/15 px-4 py-1.5 text-sm font-semibold transition hover:border-indigo-400/80 hover:bg-indigo-500/25"
      >
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
        </span>
        <span className="nav-featured-text">{label}</span>
      </Link>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 rounded-lg bg-neutral-700 border border-white/10 shadow-xl px-4 py-3 z-10"
          >
            <ul className="space-y-1.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-white leading-snug">
                  <span className="mt-0.5 text-indigo-300">•</span>
                  {b}
                </li>
              ))}
            </ul>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!sessionStorage.getItem("welcome-shown")) {
      sessionStorage.setItem("welcome-shown", "1");
      setOpen(true);
    }
  }, []);

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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9990 bg-black/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed z-9991 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm rounded-2xl border border-white/15 bg-neutral-950/95 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img src="/welcome.gif" alt="Welcome" className="w-full block" />

            <div className="px-6 py-5 text-center">
              <p className="text-neutral-200 text-[16.8px] leading-relaxed">
                Recruiter? Someone who wants the quickest click to my work to decide whether or not they want me?{" "}
                <span className="text-indigo-300 font-semibold">Follow these links.</span>
              </p>

              {/* Nav pills with tooltips */}
              <div className="mt-5 flex items-center justify-center gap-4">
                {navItems.map((item) => (
                  <NavPill key={item.href} {...item} />
                ))}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-4 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                dismiss
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
