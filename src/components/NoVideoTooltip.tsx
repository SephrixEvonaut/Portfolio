"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const GAP = 8;

interface Props {
  anchorRect: DOMRect;
}

export default function NoVideoTooltip({ anchorRect }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const top = anchorRect.top - GAP - 32;
  const left = anchorRect.left + anchorRect.width / 2;

  return createPortal(
    <div
      style={{ position: "fixed", top, left, transform: "translateX(-50%)", zIndex: 9980, pointerEvents: "none" }}
      className="rounded-md bg-neutral-800 border border-white/10 px-2.5 py-1 text-xs text-neutral-400 whitespace-nowrap shadow-lg"
    >
      no video yet
    </div>,
    document.body
  );
}
