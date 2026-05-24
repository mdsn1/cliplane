"use client";

import { useEffect, useRef } from "react";

type AdPosition = "leaderboard" | "sidebar" | "in-content" | "mobile-banner";

const AD_SIZES: Record<AdPosition, { w: number; h: number; className: string }> = {
  leaderboard: { w: 728, h: 90, className: "hidden md:flex mx-auto" },
  sidebar: { w: 300, h: 600, className: "hidden lg:flex" },
  "in-content": { w: 300, h: 250, className: "flex mx-auto" },
  "mobile-banner": { w: 320, h: 50, className: "flex md:hidden fixed bottom-0 left-0 right-0 z-40" },
};

interface AdSlotProps {
  position: AdPosition;
  id?: string;
}

export function AdSlot({ position, id }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { w, h, className } = AD_SIZES[position];

  useEffect(() => {
    // Ezoic ad initialisation hook
    if (typeof window !== "undefined" && "ezstandalone" in window) {
      const ez = (window as unknown as Record<string, { refresh?: () => void }>)["ezstandalone"];
      if (ez?.refresh) ez.refresh();
    }
  }, []);

  return (
    <div className={`${className} items-center justify-center overflow-hidden`}>
      <div
        ref={ref}
        className="ezoic-ad"
        data-ez-name={`cliplane_${position}`}
        style={{
          minWidth: `${w}px`,
          minHeight: `${h}px`,
          background: "var(--bg-tertiary)",
          border: "1px dashed var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          color: "var(--text-tertiary)",
          fontSize: "11px",
        }}
        id={id ?? `ez-${position}`}
      >
        Ad
      </div>
    </div>
  );
}
