import type { TimeSeriesPoint } from "@/data/mockData";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

interface ResultsChartProps {
  data: TimeSeriesPoint[];
}

interface TooltipPayloadEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: TooltipPayloadEntry[];
}

function CustomTooltip({ active, label, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[11px] text-[#8A8F9E] mb-1 uppercase tracking-wide">
        {label}
      </p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          className="text-xs font-medium"
          style={{ color: entry.color }}
        >
          {entry.name}: <span className="font-mono">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export function ResultsChart({ data }: ResultsChartProps) {
  return (
    <div
      className="bg-[#111318] border border-[#2A2D36] rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
      data-ocid="results-chart.card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#F0F2F5]">
          Test Results Over Time
        </h3>
        {/* Legend */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-[#8A8F9E]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
            Passed
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#8A8F9E]">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] inline-block" />
            Failed
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="gradPassed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradFailed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2A2D36"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{
              fontSize: 11,
              fill: "#4A4F5C",
              fontFamily: "Inter, sans-serif",
            }}
            tickLine={false}
            axisLine={false}
            interval={1}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="passed"
            name="Passed"
            stroke="#10B981"
            strokeWidth={2}
            fill="url(#gradPassed)"
          />
          <Area
            type="monotone"
            dataKey="failed"
            name="Failed"
            stroke="#EF4444"
            strokeWidth={2}
            fill="url(#gradFailed)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
