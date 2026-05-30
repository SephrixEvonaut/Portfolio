"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

const PREVIEW_W = 500;
const PREVIEW_H = 360;
const IFRAME_W = 1280;
const IFRAME_H = 920;
const SCALE = PREVIEW_W / IFRAME_W;

interface Props {
  slug: string;
  anchorRect: DOMRect;
}

export default function ProjectPreview({ slug, anchorRect }: Props) {
  const [loaded, setLoaded] = useState(false);

  // Position to the right of the card; flip left if too close to viewport edge
  let left = anchorRect.right + 12;
  let top = anchorRect.top + anchorRect.height / 2 - PREVIEW_H / 2;

  if (left + PREVIEW_W > window.innerWidth - 12) {
    left = anchorRect.left - PREVIEW_W - 12;
  }
  if (top < 12) top = 12;
  if (top + PREVIEW_H > window.innerHeight - 12) top = window.innerHeight - PREVIEW_H - 12;

  return createPortal(
    <div
      className="fixed z-[8000] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20 bg-neutral-950"
      style={{ left, top, width: PREVIEW_W, height: PREVIEW_H, pointerEvents: "none" }}
    >
      {/* Loading spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-white/20 border-t-white/80" />
        </div>
      )}

      <iframe
        src={`/projects/${slug}`}
        title={`Preview of ${slug}`}
        style={{
          width: IFRAME_W,
          height: IFRAME_H,
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
          border: "none",
          pointerEvents: "none",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.25s",
        }}
        onLoad={() => setLoaded(true)}
      />

      {/* "Preview" label badge */}
      <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-medium text-white/60 backdrop-blur-sm">
        preview
      </div>
    </div>,
    document.body
  );
}
