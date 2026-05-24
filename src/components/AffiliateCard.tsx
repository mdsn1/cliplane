import { ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const affiliates = [
  {
    name: "NordVPN",
    tagline: "Stay private while downloading",
    description: "Protect your privacy online with military-grade encryption.",
    color: "#4687FF",
    letter: "N",
    href: "https://nordvpn.com/?utm_source=cliplane",
  },
  {
    name: "Surfshark",
    tagline: "Unlimited devices, one price",
    description: "Fast, secure VPN with servers in 100+ countries.",
    color: "#1DB3B3",
    letter: "S",
    href: "https://surfshark.com/?utm_source=cliplane",
  },
  {
    name: "Canva Pro",
    tagline: "Edit your videos with Canva",
    description: "Create stunning visuals and edit video content easily.",
    color: "#00C4CC",
    letter: "C",
    href: "https://canva.com/pro/?utm_source=cliplane",
  },
];

export function AffiliateCard() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-4 w-4 text-[#3B82F6]" />
        <span className="text-sm font-semibold text-[var(--text-primary)]">Recommended Tools</span>
        <span className="ml-auto text-xs text-[var(--text-tertiary)]">Sponsored</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {affiliates.map((a) => (
          <a
            key={a.name}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group flex flex-col gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] p-4 hover:border-[var(--accent)] hover:translate-y-[-2px] transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm font-bold"
                style={{ backgroundColor: a.color }}
              >
                {a.letter}
              </div>
              <span className="font-semibold text-sm text-[var(--text-primary)]">{a.name}</span>
              <ExternalLink className="h-3 w-3 ml-auto text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{a.tagline}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
