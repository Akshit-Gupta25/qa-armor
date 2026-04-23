import { CoverageHeatmap } from "@/components/dashboard/CoverageHeatmap";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { KPICard } from "@/components/dashboard/KPICard";
import { ResultsChart } from "@/components/dashboard/ResultsChart";
import { StatusPie } from "@/components/dashboard/StatusPie";
import { StatusPill } from "@/components/ui/StatusPill";
import {
  aiInsights,
  coverageData,
  statusBreakdown,
  testRuns,
  timeSeriesData,
} from "@/data/mockData";
import {
  ArrowRight,
  Bug,
  CheckCircle2,
  ClipboardList,
  Clock,
  LayoutDashboard,
} from "lucide-react";

const recentRuns = testRuns.slice(0, 8);

function timeAgo(str: string) {
  return str;
}

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-3">
      <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#8A8F9E]">
        {title}
      </h2>
      {description && (
        <p className="text-[12px] text-[#4A4F5C] mt-0.5">{description}</p>
      )}
    </div>
  );
}

// ─── Section Divider ───────────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-[#2A2D36]" />
      <span className="text-[10px] font-medium uppercase tracking-widest text-[#4A4F5C] whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-[#2A2D36]" />
    </div>
  );
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="p-6 space-y-6 min-h-full" data-ocid="dashboard.page">
      {/* ─── Page Hero ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            <LayoutDashboard className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-[20px] font-semibold text-[#F0F2F5] leading-tight">
              Project Overview
            </h1>
            <p className="text-[13px] text-[#8A8F9E] mt-0.5">
              Real-time test health and quality metrics
            </p>
          </div>
        </div>
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px]"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.2)",
            color: "#10B981",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          Live monitoring
        </div>
      </div>

      <SectionDivider label="Key Metrics" />

      {/* ─── ROW 1: KPI Cards ─────────────────────────────────── */}
      <div>
        <SectionHeader
          title="Key Metrics"
          description="High-level health indicators for your active test suite"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Tests"
            value="2,847"
            icon={<ClipboardList />}
            trend="↑ +12% this week"
            trendUp
            helperText="Total number of test cases across all suites"
            data-ocid="dashboard.kpi-total-tests.card"
          />
          <KPICard
            title="Pass Rate"
            value="94.2%"
            icon={<CheckCircle2 />}
            showProgress
            progressValue={94.2}
            helperText="Percentage of tests passing over the last 7 days"
            data-ocid="dashboard.kpi-pass-rate.card"
          />
          <KPICard
            title="Avg Run Time"
            value="3m 42s"
            icon={<Clock />}
            trend="↓ −8% improved"
            trendDown
            invertTrend
            helperText="Average time to complete a full test run"
            data-ocid="dashboard.kpi-run-time.card"
          />
          <KPICard
            title="Open Bugs"
            value="23"
            icon={<Bug />}
            subtitle="5 critical"
            subtitleBadge="critical"
            helperText="Active bugs found during test runs, pending fix"
            data-ocid="dashboard.kpi-open-bugs.card"
          />
        </div>
      </div>

      <SectionDivider label="Test Results Trend" />

      {/* ─── ROW 2: Charts ──────────────────────────────────────── */}
      <div>
        <SectionHeader
          title="Test Results Trend"
          description="14-day pass/fail breakdown and current status distribution"
        />
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-[3] min-w-0">
            <ResultsChart data={timeSeriesData} />
          </div>
          <div className="flex-[2] min-w-0">
            <StatusPie data={statusBreakdown} passRate="94.2%" />
          </div>
        </div>
      </div>

      <SectionDivider label="Recent Activity" />

      {/* ─── ROW 3: Recent Runs + AI Insights ───────────────────── */}
      <div>
        <SectionHeader
          title="Recent Activity"
          description="Latest test runs and AI-surfaced recommendations"
        />
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Recent Test Runs */}
          <div
            className="flex-1 min-w-0 bg-[#111318] border border-[#2A2D36] rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
            data-ocid="recent-runs.card"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-[#F0F2F5]">
                Recent Test Runs
              </h3>
              <span className="text-[11px] text-[#4A4F5C]">
                Showing last 8 runs
              </span>
            </div>
            <p className="text-[12px] text-[#4A4F5C] mb-4">
              Click any row to view detailed results for that run
            </p>

            {recentRuns.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-12 gap-3 text-center"
                data-ocid="recent-runs.empty_state"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.2)",
                  }}
                >
                  <ClipboardList className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <p className="text-[14px] font-medium text-[#F0F2F5]">
                  No test runs yet
                </p>
                <p className="text-[12px] text-[#4A4F5C] max-w-[220px]">
                  Once you run your first test suite, results will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2A2D36]">
                      {[
                        "Run ID",
                        "Suite",
                        "Status",
                        "Tests",
                        "Duration",
                        "By",
                        "Time",
                      ].map((h) => (
                        <th
                          key={h}
                          className="pb-2 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C] pr-3 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentRuns.map((run, idx) => (
                      <tr
                        key={run.id}
                        className="border-b border-[#2A2D36]/60 hover:bg-[#1A1D24] cursor-pointer transition-colors duration-150 last:border-0"
                        data-ocid={`recent-runs.item.${idx + 1}`}
                        title={`View details for run ${run.id}`}
                      >
                        <td className="py-2.5 pr-3">
                          <span
                            className="text-xs text-[#3B82F6]"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {run.id}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 max-w-[120px]">
                          <span className="text-xs text-[#F0F2F5] truncate block">
                            {run.suiteName}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3">
                          <StatusPill status={run.status} />
                        </td>
                        <td className="py-2.5 pr-3">
                          <span
                            className="text-xs text-[#8A8F9E] whitespace-nowrap"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {run.passedTests}/{run.totalTests}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3">
                          <span className="text-xs text-[#8A8F9E] whitespace-nowrap">
                            {run.duration}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3">
                          <span className="text-xs text-[#8A8F9E] truncate block max-w-[80px]">
                            {run.triggeredBy}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <span className="text-xs text-[#4A4F5C] whitespace-nowrap">
                            {timeAgo(run.startedAt)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View All */}
            <div className="mt-3 pt-3 border-t border-[#2A2D36]">
              <button
                type="button"
                onClick={() => onNavigate?.("runs")}
                className="flex items-center gap-1 text-xs text-[#3B82F6] hover:text-[#60A5FA] transition-colors duration-200 font-medium"
                data-ocid="recent-runs.view-all.link"
                aria-label="View all test runs"
              >
                View All Runs
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Insights */}
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <div className="mb-2">
              <SectionHeader
                title="AI Recommendations"
                description="Top issues surfaced by the AI engine"
              />
            </div>
            <InsightsPanel insights={aiInsights.slice(0, 4)} />
          </div>
        </div>
      </div>

      <SectionDivider label="Coverage Overview" />

      {/* ─── ROW 4: Coverage Heatmap ─────────────────────────────── */}
      <div>
        <SectionHeader
          title="Coverage Overview"
          description="Test coverage intensity by feature area — darker means more coverage"
        />
        <CoverageHeatmap data={coverageData} />
      </div>
    </div>
  );
}
