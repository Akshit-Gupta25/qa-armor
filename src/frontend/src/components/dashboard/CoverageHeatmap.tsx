import type { CoverageRow } from "@/data/mockData";

interface CoverageHeatmapProps {
  data: CoverageRow[];
}

const COLUMNS = [
  { key: "unit" as const, label: "Unit" },
  { key: "integration" as const, label: "Integration" },
  { key: "e2e" as const, label: "E2E" },
  { key: "visual" as const, label: "Visual" },
  { key: "performance" as const, label: "Performance" },
];

/** Interpolate between dark-red (0%) and bright-green (100%) */
function coverageColor(value: number): string {
  const clamped = Math.min(100, Math.max(0, value));
  if (clamped === 0) return "#7F1D1D";
  if (clamped < 30) {
    // deep red → orange-red
    const t = clamped / 30;
    const r = Math.round(127 + t * (185 - 127));
    const g = Math.round(29 + t * (28 - 29));
    const b = Math.round(29 + t * (28 - 29));
    return `rgb(${r},${g},${b})`;
  }
  if (clamped < 60) {
    // orange-red → amber
    const t = (clamped - 30) / 30;
    const r = Math.round(185 + t * (245 - 185));
    const g = Math.round(28 + t * (158 - 28));
    const b = Math.round(28 + t * (11 - 28));
    return `rgb(${r},${g},${b})`;
  }
  if (clamped < 80) {
    // amber → yellow-green
    const t = (clamped - 60) / 20;
    const r = Math.round(245 + t * (132 - 245));
    const g = Math.round(158 + t * (204 - 158));
    const b = Math.round(11 + t * (22 - 11));
    return `rgb(${r},${g},${b})`;
  }
  // yellow-green → bright green
  const t = (clamped - 80) / 20;
  const r = Math.round(132 + t * (22 - 132));
  const g = Math.round(204 + t * (101 - 204));
  const b = Math.round(22 + t * (52 - 22));
  return `rgb(${r},${g},${b})`;
}

/** Text color: white for dark cells, dark for bright cells */
function textColor(value: number): string {
  return value >= 70 ? "rgba(0,0,0,0.85)" : "#F0F2F5";
}

export function CoverageHeatmap({ data }: CoverageHeatmapProps) {
  return (
    <div
      className="bg-[#111318] border border-[#2A2D36] rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
      data-ocid="coverage-heatmap.card"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-[#F0F2F5]">
            Coverage Heatmap
          </h3>
          <p className="text-xs text-[#8A8F9E] mt-0.5">
            Feature coverage by test type
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8A8F9E] uppercase tracking-wide">
            0%
          </span>
          <div
            className="w-24 h-3 rounded-full"
            style={{
              background:
                "linear-gradient(to right, #7F1D1D, #EF4444, #F59E0B, #10B981, #166534)",
            }}
          />
          <span className="text-[11px] text-[#8A8F9E] uppercase tracking-wide">
            100%
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1">
          <thead>
            <tr>
              {/* Feature label column header */}
              <th className="w-24 text-left pb-1">
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
                  Feature
                </span>
              </th>
              {COLUMNS.map((col) => (
                <th key={col.key} className="text-center pb-1 min-w-[80px]">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#8A8F9E]">
                    {col.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={row.feature}
                data-ocid={`coverage-heatmap.row.${rowIdx + 1}`}
              >
                {/* Feature label */}
                <td className="pr-3 py-0.5">
                  <span className="text-xs font-medium text-[#8A8F9E] whitespace-nowrap">
                    {row.feature}
                  </span>
                </td>
                {COLUMNS.map((col) => {
                  const val = row[col.key];
                  const bg = coverageColor(val);
                  const fg = textColor(val);
                  return (
                    <td key={col.key} className="text-center py-0.5">
                      <div
                        className="rounded-md flex items-center justify-center transition-transform duration-150 hover:scale-105 cursor-default"
                        style={{
                          backgroundColor: bg,
                          minWidth: 80,
                          height: 40,
                        }}
                        title={`${row.feature} / ${col.label}: ${val}%`}
                      >
                        <span
                          className="text-xs font-medium"
                          style={{
                            color: fg,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {val}%
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
