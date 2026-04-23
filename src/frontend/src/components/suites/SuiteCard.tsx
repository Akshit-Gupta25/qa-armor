import { MiniDonut } from "@/components/ui/MiniDonut";
import { StatusPill } from "@/components/ui/StatusPill";
import type { SuiteType, TestSuite } from "@/data/mockData";
import { showSuccess } from "@/hooks/useToast";
import { Clock, MoreHorizontal, Pencil, Play } from "lucide-react";

interface SuiteCardProps {
  suite: TestSuite;
}

const typeConfig: Record<SuiteType, { label: string; className: string }> = {
  E2E: { label: "E2E", className: "bg-blue-500/20 text-blue-400" },
  Unit: { label: "Unit", className: "bg-green-500/20 text-[#10B981]" },
  Integration: {
    label: "Integration",
    className: "bg-amber-500/20 text-[#F59E0B]",
  },
  Visual: { label: "Visual", className: "bg-purple-500/20 text-[#8B5CF6]" },
};

export function SuiteCard({ suite }: SuiteCardProps) {
  const passRate =
    suite.totalTests > 0
      ? Math.round((suite.passing / suite.totalTests) * 100)
      : 0;

  const type = typeConfig[suite.type];

  return (
    <div
      className="bg-[#111318] border border-[#2A2D36] rounded-xl p-5 flex flex-col gap-4 transition-all duration-200 cursor-default"
      style={
        {
          "--hover-glow": "0 0 0 1px rgba(59,130,246,0.3)",
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 0 1px rgba(59,130,246,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
      data-ocid="suite.card"
    >
      {/* Top Row: Name + Type Badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[16px] font-semibold text-[#F0F2F5] leading-snug min-w-0 truncate">
          {suite.name}
        </h3>
        <span
          className={`flex-shrink-0 text-[11px] font-medium uppercase tracking-wide px-2 py-0.5 rounded ${type.className}`}
        >
          {type.label}
        </span>
      </div>

      {/* Middle: Donut + Stats */}
      <div className="flex items-center gap-4">
        <MiniDonut value={passRate} size={64} strokeWidth={6} />
        <div className="flex flex-col gap-1 text-[14px]">
          <span className="text-[#8A8F9E]">
            <span className="font-semibold text-[#F0F2F5]">
              {suite.totalTests}
            </span>{" "}
            tests
          </span>
          <span className="text-[#10B981] font-medium">
            {suite.passing} passing
          </span>
          <span className="text-[#EF4444] font-medium">
            {suite.failing} failing
          </span>
        </div>
      </div>

      {/* Last Run Row */}
      <div className="flex items-center gap-2 text-[13px] text-[#8A8F9E]">
        <Clock size={14} className="flex-shrink-0" />
        <span>{suite.lastRunTime}</span>
        <span className="mx-1 text-[#2A2D36]">·</span>
        <StatusPill status={suite.lastRunStatus} />
      </div>

      {/* Tags Row */}
      {suite.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {suite.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#1A1D24] rounded text-xs text-[#8A8F9E] px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Row */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#2A2D36]">
        <button
          type="button"
          className="flex items-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
          onClick={() => showSuccess("Suite started!")}
          data-ocid="suite.run_button"
        >
          <Play size={14} />
          Run Suite
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 border border-[#2A2D36] text-[#8A8F9E] hover:text-[#F0F2F5] hover:border-[#4A4F5C] text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
          data-ocid="suite.edit_button"
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          type="button"
          className="ml-auto flex items-center border border-[#2A2D36] text-[#8A8F9E] hover:text-[#F0F2F5] hover:border-[#4A4F5C] px-2 py-1.5 rounded-lg transition-colors duration-200"
          data-ocid="suite.more_button"
        >
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  );
}
