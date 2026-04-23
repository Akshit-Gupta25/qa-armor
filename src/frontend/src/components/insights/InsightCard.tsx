import { Button } from "@/components/ui/button";
import type { AIInsight, InsightCategory } from "@/data/mockData";
import { showSuccess } from "@/hooks/useToast";
import {
  ExternalLink,
  Eye,
  Gauge,
  GitBranch,
  Shield,
  Wrench,
  X,
  Zap,
} from "lucide-react";

interface InsightCardProps {
  insight: AIInsight;
  onDismiss: (id: string) => void;
}

const categoryConfig: Record<
  InsightCategory,
  { icon: React.ElementType; color: string; bg: string; border: string }
> = {
  Flakiness: {
    icon: Zap,
    color: "#EF4444",
    bg: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.35)",
  },
  "Coverage Gaps": {
    icon: GitBranch,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.35)",
  },
  Performance: {
    icon: Gauge,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.35)",
  },
  Security: {
    icon: Shield,
    color: "#EF4444",
    bg: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.35)",
  },
  Accessibility: {
    icon: Eye,
    color: "#10B981",
    bg: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.35)",
  },
};

const severityColors: Record<string, string> = {
  critical: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
};

const categoryBadgeColors: Record<InsightCategory, string> = {
  Flakiness: "#EF4444",
  "Coverage Gaps": "#F59E0B",
  Performance: "#3B82F6",
  Security: "#EF4444",
  Accessibility: "#10B981",
};

export function InsightCard({ insight, onDismiss }: InsightCardProps) {
  const cfg = categoryConfig[insight.category];
  const CategoryIcon = cfg.icon;
  const dotColor = severityColors[insight.severity];
  const badgeColor = categoryBadgeColors[insight.category];

  function handleApplyFix() {
    showSuccess("Fix applied to test suite!");
  }

  return (
    <div className="flex gap-4 group" data-ocid={`insight.item.${insight.id}`}>
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          <CategoryIcon size={14} style={{ color: cfg.color }} />
        </div>
        <div
          className="w-px flex-1 mt-2"
          style={{ background: "#2A2D36", minHeight: "1rem" }}
        />
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-xl p-5 mb-4 transition-hover"
        style={{
          background: "#111318",
          border: "1px solid #2A2D36",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 0 0 1px rgba(59,130,246,0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider"
              style={{
                color: badgeColor,
                background: `${badgeColor}18`,
                border: `1px solid ${badgeColor}30`,
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: dotColor }}
              />
              {insight.category}
            </span>
          </div>
          <span
            className="text-[12px] font-mono font-medium"
            style={{ color: "#10B981", fontFamily: "var(--font-mono)" }}
          >
            {insight.confidence}% confidence
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[16px] font-semibold mb-1.5 leading-snug"
          style={{ color: "#F0F2F5" }}
        >
          {insight.title}
        </h3>

        {/* Explanation */}
        <p
          className="text-[14px] mb-3 leading-relaxed line-clamp-2"
          style={{ color: "#8A8F9E" }}
        >
          {insight.explanation}
        </p>

        {/* Affected tests */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span
            className="text-[12px] font-medium"
            style={{ color: "#4A4F5C" }}
          >
            Affected tests:
          </span>
          {insight.affectedTests.map((test) => (
            <span
              key={test}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium"
              style={{
                color: "#3B82F6",
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.25)",
              }}
            >
              {test}
            </span>
          ))}
        </div>

        {/* Suggested fix */}
        <p className="text-[13px] italic mb-4" style={{ color: "#8A8F9E" }}>
          <span className="not-italic font-medium" style={{ color: "#4A4F5C" }}>
            Suggested fix:{" "}
          </span>
          {insight.suggestedFix}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid={`insight.apply_fix.${insight.id}`}
            onClick={handleApplyFix}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-hover"
            style={{
              background: "#3B82F6",
              color: "#fff",
              border: "1px solid rgba(59,130,246,0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#2563EB";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#3B82F6";
            }}
          >
            <Wrench size={12} />
            Apply Fix
          </button>

          <button
            type="button"
            data-ocid={`insight.dismiss.${insight.id}`}
            onClick={() => onDismiss(insight.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-hover"
            style={{
              background: "transparent",
              color: "#8A8F9E",
              border: "1px solid #2A2D36",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "#1A1D24";
              btn.style.color = "#F0F2F5";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "transparent";
              btn.style.color = "#8A8F9E";
            }}
          >
            <X size={12} />
            Dismiss
          </button>

          <button
            type="button"
            data-ocid={`insight.learn_more.${insight.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-hover"
            style={{
              background: "transparent",
              color: "#8A8F9E",
              border: "1px solid #2A2D36",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "#1A1D24";
              btn.style.color = "#F0F2F5";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "transparent";
              btn.style.color = "#8A8F9E";
            }}
          >
            <ExternalLink size={12} />
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
