"use client";
import { Download } from "lucide-react";

interface ScrollTopButtonProps {
  label: string;
  className?: string;
  showIcon?: boolean;
}

export function ScrollTopButton({ label, className, showIcon }: ScrollTopButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={className}
    >
      {showIcon && <Download className="h-4 w-4" />}
      {label}
    </button>
  );
}
