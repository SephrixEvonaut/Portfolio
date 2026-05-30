"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface NavTarget {
  x: number;
  y: number;
}

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [swTarget, setSwTarget] = useState<NavTarget | null>(null);
  const [gkTarget, setGkTarget] = useState<NavTarget | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (!sessionStorage.getItem("welcome-shown")) {
      sessionStorage.setItem("welcome-shown", "1");
      setOpen(true);
    }
  }, []);

  // Measure nav pill positions after modal opens
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      const sw = document.getElementById("nav-shipwatch");
      const gk = document.getElementById("nav-gesturekit");
      if (sw) {
        const r = sw.getBoundingClientRect();
        setSwTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }
      if (gk) {
        const r = gk.getBoundingClientRect();
        setGkTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [open]);

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

  // Arrow start: center-top of modal (approximated — modal is centered)
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  // Start points fan out slightly left/right from modal top-center
  const swStart = { x: cx - 80, y: cy - 160 };
  const gkStart = { x: cx + 80, y: cy - 160 };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed z-[9991] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm rounded-2xl border border-white/15 bg-neutral-950/95 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/welcome.gif"
              alt="Welcome"
              className="w-full block"
            />
            <div className="px-6 py-5 text-center">
              <p className="text-neutral-200 text-[16.8px] leading-relaxed">
                Recruiter? Someone who wants the quickest click to my work to decide whether or not they want me?{" "}
                <span className="text-indigo-300 font-semibold">Follow the arrows.</span>
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-4 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                dismiss
              </button>
            </div>
          </motion.div>

          {/* Animated SVG arrows pointing to nav items */}
          {(swTarget || gkTarget) && (
            <svg
              className="fixed inset-0 pointer-events-none"
              style={{ zIndex: 9992, width: "100vw", height: "100vh" }}
            >
              <defs>
                <marker id="arrow-head-sw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#818cf8" />
                </marker>
                <marker id="arrow-head-gk" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#818cf8" />
                </marker>
              </defs>

              {/* ShipWatch Live arrow */}
              {swTarget && (
                <motion.line
                  x1={swStart.x}
                  y1={swStart.y}
                  x2={swTarget.x}
                  y2={swTarget.y}
                  stroke="#818cf8"
                  strokeWidth="2.5"
                  strokeDasharray="10 5"
                  markerEnd="url(#arrow-head-sw)"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [30, 0] }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                />
              )}

              {/* GestureKit arrow */}
              {gkTarget && (
                <motion.line
                  x1={gkStart.x}
                  y1={gkStart.y}
                  x2={gkTarget.x}
                  y2={gkTarget.y}
                  stroke="#818cf8"
                  strokeWidth="2.5"
                  strokeDasharray="10 5"
                  markerEnd="url(#arrow-head-gk)"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [30, 0] }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: "linear", delay: 0.15 }}
                />
              )}
            </svg>
          )}
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
