"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Volume2, VolumeX } from "lucide-react";

const W = 280;
const H = Math.round(W * (9 / 16)); // 157px
const GAP = 10;

interface Props {
  src: string;
  skillName: string;
  anchorRect: DOMRect;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function SkillVideoPreview({ src, skillName, anchorRect, onMouseEnter, onMouseLeave }: Props) {
  const [muted, setMuted] = useState(true);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Position above the pill; flip below if not enough room above
  let top = anchorRect.top - H - GAP;
  if (top < 10) top = anchorRect.bottom + GAP;

  // Center on pill; clamp to viewport edges
  let left = anchorRect.left + anchorRect.width / 2 - W / 2;
  left = Math.max(10, Math.min(left, window.innerWidth - W - 10));

  if (!mounted) return null;

  return createPortal(
    <div
      style={{ position: "fixed", top, left, width: W, zIndex: 9980 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="block w-full"
          style={{ height: H, objectFit: "cover" }}
        />
        <div className="absolute bottom-2 right-2">
          <button
            onClick={() => setMuted((m) => !m)}
            className="flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 px-2.5 py-1 text-xs text-white hover:bg-black/90 transition-colors"
          >
            {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
            <span>{muted ? "unmute" : "mute"}</span>
          </button>
        </div>
      </div>
      <p className="mt-1.5 text-center text-xs text-neutral-400">{skillName}</p>
    </div>,
    document.body
  );
}
