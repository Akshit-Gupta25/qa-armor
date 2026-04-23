import { InsightFeed } from "@/components/insights/InsightFeed";
import { aiInsights } from "@/data/mockData";
import { useMockRunner } from "@/hooks/useMockRunner";
import { showSuccess } from "@/hooks/useToast";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "Total Insights", value: "5", icon: Sparkles, color: "#8B5CF6" },
  { label: "Critical Issues", value: "2", icon: Zap, color: "#EF4444" },
  { label: "Tests Improved", value: "14", icon: TrendingUp, color: "#10B981" },
  { label: "Coverage Fixed", value: "3", icon: Shield, color: "#3B82F6" },
];

const HOW_IT_WORKS_STEPS = [
  {
    num: "1",
    title: "Continuous Monitoring",
    desc: "QA Armor watches every test run and tracks pass/fail patterns over time.",
  },
  {
    num: "2",
    title: "Pattern Detection",
    desc: "Our ML models identify flaky tests, coverage gaps, slow suites, and security blind spots.",
  },
  {
    num: "3",
    title: "Prioritized Insights",
    desc: "Each finding is ranked by severity and impact so you know exactly what to fix first.",
  },
  {
    num: "4",
    title: "Actionable Fixes",
    desc: "Every insight includes a plain-English recommendation with suggested code changes.",
  },
];

// ─── How It Works collapsible ─────────────────────────────────────────────────
function HowItWorksCard() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "#111318", border: "1px solid #2A2D36" }}
      data-ocid="insights.how_it_works.card"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#1A1D24] transition-colors duration-200"
        aria-expanded={open}
        data-ocid="insights.how_it_works.toggle"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.25)",
            }}
          >
            <Sparkles size={13} style={{ color: "#3B82F6" }} />
          </div>
          <span className="text-[13px] font-semibold text-[#F0F2F5]">
            How does AI Insights work?
          </span>
          <span
            className="text-[11px] px-1.5 py-0.5 rounded"
            style={{ color: "#3B82F6", background: "rgba(59,130,246,0.08)" }}
          >
            Learn more
          </span>
        </div>
        {open ? (
          <ChevronUp size={15} style={{ color: "#4A4F5C" }} />
        ) : (
          <ChevronDown size={15} style={{ color: "#4A4F5C" }} />
        )}
      </button>

      {open && (
        <div
          className="px-5 pb-5 border-t"
          style={{ borderColor: "#2A2D36" }}
          data-ocid="insights.how_it_works.content"
        >
          <p
            className="text-[13px] leading-relaxed mt-4 mb-5"
            style={{ color: "#8A8F9E" }}
          >
            QA Armor's AI engine continuously analyzes your test results to
            surface actionable patterns. It doesn't just tell you a test failed
            — it tells you <em className="text-[#B0B5C1]">why</em> and what to
            do about it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div key={step.num} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.3)",
                  }}
                >
                  <span className="text-[10px] font-bold text-[#8B5CF6]">
                    {step.num}
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#F0F2F5] mb-0.5">
                    {step.title}
                  </p>
                  <p className="text-[12px] text-[#8A8F9E] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AIInsights() {
  const { isRunning, startRun } = useMockRunner({
    onComplete: () => showSuccess("Analysis complete! 3 new insights found."),
  });

  return (
    <div className="space-y-5" data-ocid="insights.page">
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

            {/* Intro paragraph */}
            <p
              className="text-[14px] leading-relaxed max-w-xl"
              style={{ color: "#8A8F9E" }}
            >
              Our AI continuously monitors your test results and highlights
              patterns, risks, and opportunities to improve your test quality —
              so you spend less time debugging and more time shipping with
              confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                data-ocid="insights.analyze_button"
                onClick={startRun}
                disabled={isRunning}
                aria-label={
                  isRunning
                    ? "Analysis in progress"
                    : "Run AI analysis on your test suite"
                }
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
                  title={stat.label}
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
                    style={{
                      color: "#F0F2F5",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works collapsible */}
      <HowItWorksCard />

      {/* Insights feed */}
      <div
        className="rounded-xl p-6"
        style={{ background: "#111318", border: "1px solid #2A2D36" }}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h2
                className="text-[18px] font-semibold"
                style={{ color: "#F0F2F5" }}
              >
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
            </div>
            <p className="text-[12px] mt-1" style={{ color: "#4A4F5C" }}>
              Use the tabs below to filter insights by category. Click an
              insight to expand details and view the recommended fix.
            </p>
          </div>
          <span
            className="text-[13px] flex-shrink-0"
            style={{ color: "#4A4F5C" }}
          >
            {aiInsights.length} insights detected
          </span>
        </div>

        <InsightFeed insights={aiInsights} />
      </div>
    </div>
  );
}
