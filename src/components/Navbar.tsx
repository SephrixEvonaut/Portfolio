"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const aboutSubmenu = [
  { label: "Blog", href: "/blog" },
  { label: "Clips", href: "/clips" },
  { label: "Self-Interview", href: "/self-interview" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
      style={{
        backgroundImage: "url('/nav-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        borderBottom: "1px solid rgba(255,255,255,0.45)",
        boxShadow: "0 4px 32px rgba(255,255,255,0.35), 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleAnchorClick("#hero"); }}
          className="text-lg font-bold tracking-tight text-white"
        >
          Tyler McRae
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) =>
            link.featured ? (
              <li key={link.href} id={link.label === "ShipWatch Live" ? "nav-shipwatch" : link.label === "GestureKit" ? "nav-gesturekit" : undefined}>
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(99,102,241,0)",
                      "0 0 14px rgba(99,102,241,0.45)",
                      "0 0 0px rgba(99,102,241,0)",
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-full"
                >
                  <Link
                    href={link.href}
                    className="relative flex items-center gap-1.5 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3.5 py-1 hover:border-indigo-400/70 hover:bg-indigo-500/20 transition-colors duration-200"
                  >
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    </span>
                    <span className="nav-featured-text font-semibold">{link.label}</span>
                  </Link>
                </motion.div>
              </li>

            ) : link.label === "About" ? (
              /* About — click scrolls, hover opens submenu */
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                  className="relative flex items-center gap-1 text-neutral-200 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full"
                >
                  About
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                  />
                </a>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                    >
                      <div
                        className="rounded-xl border border-white/15 shadow-2xl overflow-hidden min-w-[160px]"
                        style={{
                          backgroundImage: "url('/nav-bg.jpg')",
                          backgroundSize: "cover",
                          backgroundPosition: "center 40%",
                        }}
                      >
                        <div className="absolute inset-0 bg-black/65 rounded-xl" />
                        <ul className="relative py-2">
                          {aboutSubmenu.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block px-5 py-2 text-sm text-neutral-200 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                  className="relative text-neutral-200 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative md:hidden border-t border-white/10"
            style={{
              backgroundImage: "url('/nav-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 60%",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <ul className="relative flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) =>
                link.featured ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2"
                    >
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      </span>
                      <span className="nav-featured-text font-semibold text-sm">{link.label}</span>
                    </Link>
                  </li>

                ) : link.label === "About" ? (
                  <li key={link.href}>
                    <button
                      className="flex items-center justify-between w-full py-2 text-neutral-300 hover:text-white transition-colors"
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    >
                      <span>About</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileAboutOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-3 border-l border-white/15 mb-1"
                        >
                          <li>
                            <a
                              href="#about"
                              onClick={(e) => { e.preventDefault(); handleAnchorClick("#about"); }}
                              className="block py-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
                            >
                              About Me
                            </a>
                          </li>
                          {aboutSubmenu.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>

                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                      className="block py-2 text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
