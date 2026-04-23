import { InsightFeed } from "@/components/insights/InsightFeed";
import { aiInsights } from "@/data/mockData";
import { useMockRunner } from "@/hooks/useMockRunner";
import { showSuccess } from "@/hooks/useToast";
import {
  Clock,
  Loader2,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

const stats = [
  { label: "Total Insights", value: "5", icon: Sparkles, color: "#8B5CF6" },
  { label: "Critical Issues", value: "2", icon: Zap, color: "#EF4444" },
  { label: "Tests Improved", value: "14", icon: TrendingUp, color: "#10B981" },
  { label: "Coverage Fixed", value: "3", icon: Shield, color: "#3B82F6" },
];

export default function AIInsights() {
  const { isRunning, startRun } = useMockRunner({
    onComplete: () => showSuccess("Analysis complete! 3 new insights found."),
  });

  return (
    <div className="space-y-6" data-ocid="insights.page">
      {/* Hero section */}
      <div
        className="rounded-xl p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.15) 100%)",
          border: "1px solid rgba(139,92,246,0.3)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Left content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(139,92,246,0.2)",
                  border: "1px solid rgba(139,92,246,0.4)",
                }}
              >
                <Sparkles size={20} style={{ color: "#8B5CF6" }} />
              </div>
              <h1
                className="text-[28px] font-medium"
                style={{
                  background: "linear-gradient(90deg, #8B5CF6, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                QA Armor AI
              </h1>
            </div>

            <p
              className="text-[14px] leading-relaxed max-w-xl"
              style={{ color: "#8A8F9E" }}
            >
              Powered by advanced ML models to detect flakiness, coverage gaps,
              and performance regressions before they reach production.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                data-ocid="insights.analyze_button"
                onClick={startRun}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-medium transition-hover"
                style={{
                  background: isRunning ? "rgba(59,130,246,0.5)" : "#3B82F6",
                  color: "#fff",
                  border: "1px solid rgba(59,130,246,0.5)",
                  cursor: isRunning ? "not-allowed" : "pointer",
                }}
              >
                {isRunning ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Analyze My Test Suite
                  </>
                )}
              </button>

              <span
                className="inline-flex items-center gap-1.5 text-[12px]"
                style={{ color: "#4A4F5C" }}
              >
                <Clock size={13} style={{ color: "#4A4F5C" }} />
                Last analyzed: 5 minutes ago
              </span>
            </div>
          </div>

          {/* Right stats grid */}
          <div className="grid grid-cols-2 gap-3 md:w-auto md:min-w-[280px]">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-lg p-4 flex flex-col gap-2"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] font-medium uppercase tracking-wider"
                      style={{ color: "#4A4F5C" }}
                    >
                      {stat.label}
                    </span>
                    <Icon size={14} style={{ color: stat.color }} />
                  </div>
                  <span
                    className="text-[24px] font-semibold"
                    style={{ color: "#F0F2F5", fontFamily: "var(--font-mono)" }}
                  >
                    {stat.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights feed */}
      <div
        className="rounded-xl p-6"
        style={{ background: "#111318", border: "1px solid #2A2D36" }}
      >
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-[18px] font-medium" style={{ color: "#F0F2F5" }}>
            AI Insights
          </h2>
          <span
            className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider"
            style={{
              color: "#8B5CF6",
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.35)",
            }}
          >
            BETA
          </span>
          <span className="ml-auto text-[13px]" style={{ color: "#4A4F5C" }}>
            {aiInsights.length} insights detected
          </span>
        </div>

        <InsightFeed insights={aiInsights} />
      </div>
    </div>
  );
}
