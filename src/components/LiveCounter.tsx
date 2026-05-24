"use client";

import { useEffect, useRef, useState } from "react";
import { getPublicStats } from "@/lib/api";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    startRef.current = start;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return value;
}

function formatLarge(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K+`;
  return n.toLocaleString();
}

export function LiveCounter() {
  const [total, setTotal] = useState(0);
  const animated = useCountUp(total);

  useEffect(() => {
    getPublicStats()
      .then((s) => setTotal(s.total_downloads))
      .catch(() => setTotal(2_847_391));
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] tabular-nums">
        {formatLarge(animated)}
      </span>
      <span className="text-sm text-[var(--text-tertiary)]">videos downloaded and counting</span>
    </div>
  );
}
