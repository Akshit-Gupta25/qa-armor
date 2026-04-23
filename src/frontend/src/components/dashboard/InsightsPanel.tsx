import type { AIInsight, InsightSeverity } from "@/data/mockData";
import { Sparkles } from "lucide-react";

interface InsightsPanelProps {
  insights: AIInsight[];
}

const severityDot: Record<InsightSeverity, string> = {
  critical: "bg-[#EF4444]",
  warning: "bg-[#F59E0B]",
  info: "bg-[#3B82F6]",
};

const severityGlow: Record<InsightSeverity, string> = {
  critical: "shadow-[0_0_6px_rgba(239,68,68,0.4)]",
  warning: "shadow-[0_0_6px_rgba(245,158,11,0.4)]",
  info: "shadow-[0_0_6px_rgba(59,130,246,0.4)]",
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <div
      className="bg-[#111318] border border-[#2A2D36] rounded-xl p-5 flex flex-col transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
      data-ocid="insights-panel.card"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
        <h3 className="text-sm font-medium text-[#F0F2F5]">AI Insights</h3>
        <span className="ml-1 text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#8B5CF6]/20 text-[#8B5CF6]">
          BETA
        </span>
      </div>

      {/* Insight list */}
      <div className="flex flex-col divide-y divide-[#2A2D36]">
        {insights.map((insight, idx) => (
          <div
            key={insight.id}
            className="py-3 first:pt-0 last:pb-0"
            data-ocid={`insights-panel.item.${idx + 1}`}
          >
            <div className="flex gap-3">
              {/* Severity dot */}
              <div className="mt-0.5 flex-shrink-0">
                <span
                  className={`block w-2 h-2 rounded-full ${severityDot[insight.severity]} ${severityGlow[insight.severity]}`}
                />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#F0F2F5] leading-snug mb-0.5">
                  {insight.title}
                </p>
                <p className="text-xs text-[#8A8F9E] leading-relaxed line-clamp-2">
                  {insight.explanation}
                </p>
                <button
                  type="button"
                  className="mt-1.5 text-xs text-[#3B82F6] hover:text-[#60A5FA] transition-colors duration-200 font-medium"
                  data-ocid={`insights-panel.investigate_button.${idx + 1}`}
                >
                  Investigate →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
