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
} from "lucide-react";

const recentRuns = testRuns.slice(0, 8);

function timeAgo(str: string) {
  return str;
}

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="p-6 space-y-6 min-h-full" data-ocid="dashboard.page">
      {/* ─── ROW 1: KPI Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Tests"
          value="2,847"
          icon={<ClipboardList />}
          trend="↑ +12% this week"
          trendUp
          data-ocid="dashboard.kpi-total-tests.card"
        />
        <KPICard
          title="Pass Rate"
          value="94.2%"
          icon={<CheckCircle2 />}
          showProgress
          progressValue={94.2}
          data-ocid="dashboard.kpi-pass-rate.card"
        />
        <KPICard
          title="Avg Run Time"
          value="3m 42s"
          icon={<Clock />}
          trend="↓ −8% improved"
          trendDown
          invertTrend
          data-ocid="dashboard.kpi-run-time.card"
        />
        <KPICard
          title="Open Bugs"
          value="23"
          icon={<Bug />}
          subtitle="5 critical"
          subtitleBadge="critical"
          data-ocid="dashboard.kpi-open-bugs.card"
        />
      </div>

      {/* ─── ROW 2: Charts ──────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-[3] min-w-0">
          <ResultsChart data={timeSeriesData} />
        </div>
        <div className="flex-[2] min-w-0">
          <StatusPie data={statusBreakdown} passRate="94.2%" />
        </div>
      </div>

      {/* ─── ROW 3: Recent Runs + AI Insights ───────────────────── */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Recent Test Runs */}
        <div
          className="flex-1 min-w-0 bg-[#111318] border border-[#2A2D36] rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
          data-ocid="recent-runs.card"
        >
          <h3 className="text-sm font-medium text-[#F0F2F5] mb-4">
            Recent Test Runs
          </h3>
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
                  >
                    <td className="py-2.5 pr-3">
                      <span
                        className="text-xs text-[#3B82F6]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
          {/* View All */}
          <div className="mt-3 pt-3 border-t border-[#2A2D36]">
            <button
              type="button"
              onClick={() => onNavigate?.("runs")}
              className="flex items-center gap-1 text-xs text-[#3B82F6] hover:text-[#60A5FA] transition-colors duration-200 font-medium"
              data-ocid="recent-runs.view-all.link"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Insights */}
        <div className="w-full lg:w-[340px] flex-shrink-0">
          <InsightsPanel insights={aiInsights.slice(0, 4)} />
        </div>
      </div>

      {/* ─── ROW 4: Coverage Heatmap ─────────────────────────────── */}
      <CoverageHeatmap data={coverageData} />
    </div>
  );
}
