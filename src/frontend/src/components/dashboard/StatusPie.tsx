import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface StatusSegment {
  name: string;
  value: number;
  color: string;
}

interface StatusPieProps {
  data: StatusSegment[];
  passRate: string;
}

interface TooltipPayloadEntry {
  name: string;
  value: number;
  payload: StatusSegment;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-medium" style={{ color: item.payload.color }}>
        {item.name}:{" "}
        <span className="font-mono">{item.value.toLocaleString()}</span>
      </p>
    </div>
  );
}

export function StatusPie({ data, passRate }: StatusPieProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div
      className="bg-[#111318] border border-[#2A2D36] rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
      data-ocid="status-pie.card"
    >
      <h3 className="text-sm font-medium text-[#F0F2F5] mb-4">
        Status Breakdown
      </h3>

      {/* Donut chart with center text */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 180 }}
      >
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span
            className="text-2xl font-semibold text-[#F0F2F5]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {passRate}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#8A8F9E] mt-0.5">
            Pass Rate
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-[#8A8F9E] truncate">{item.name}</span>
            <span
              className="text-xs text-[#F0F2F5] ml-auto"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#4A4F5C] mt-3 text-center">
        Total: {total.toLocaleString()} tests
      </p>
    </div>
  );
}
