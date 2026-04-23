interface MiniDonutProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

export function MiniDonut({
  value,
  size = 64,
  strokeWidth = 6,
}: MiniDonutProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  const color = value >= 90 ? "#10B981" : value >= 70 ? "#F59E0B" : "#EF4444";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`${value}%`}
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="#2A2D36"
        strokeWidth={strokeWidth}
      />
      {/* Fill */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* Center text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={size * 0.22}
        fontWeight="600"
        fill="#F0F2F5"
        fontFamily="'JetBrains Mono', monospace"
      >
        {value}%
      </text>
    </svg>
  );
}
