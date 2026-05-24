import { ShieldCheck, Zap, Star, Globe } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "No Login" },
  { icon: Star, label: "No Watermark" },
  { icon: Zap, label: "HD Quality" },
  { icon: Globe, label: "Free Forever" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)]"
        >
          <Icon className="h-3.5 w-3.5 text-[#3B82F6]" />
          {label}
        </div>
      ))}
    </div>
  );
}
