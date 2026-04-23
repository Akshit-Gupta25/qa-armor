import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  trendDown?: boolean;
  invertTrend?: boolean;
  subtitle?: string;
  subtitleBadge?: string;
  showProgress?: boolean;
  progressValue?: number;
  className?: string;
  "data-ocid"?: string;
}

export function KPICard({
  title,
  value,
  icon,
  trend,
  trendUp,
  trendDown,
  invertTrend = false,
  subtitle,
  subtitleBadge,
  showProgress,
  progressValue = 0,
  className,
  "data-ocid": ocid,
}: KPICardProps) {
  const isTrendPositive = trendUp || trendDown;
  // Default: up=green, down=red. Inverted (e.g. run time): up=red, down=green
  const trendColor = trendUp
    ? invertTrend
      ? "text-[#EF4444]"
      : "text-[#10B981]"
    : trendDown
      ? invertTrend
        ? "text-[#10B981]"
        : "text-[#EF4444]"
      : "text-[#8A8F9E]";

  return (
    <div
      data-ocid={ocid}
      className={cn(
        "bg-[#111318] border border-[#2A2D36] rounded-xl p-5 relative",
        "transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.3)] hover:bg-[#1A1D24]",
        className,
      )}
    >
      {/* Icon top-right */}
      <div className="absolute top-4 right-4 text-[#8A8F9E]">
        <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      </div>

      {/* Label */}
      <p className="text-xs font-medium uppercase tracking-wider text-[#8A8F9E] mb-3">
        {title}
      </p>

      {/* Value */}
      <p
        className="text-[28px] font-medium text-[#F0F2F5] leading-none mb-2"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {value}
      </p>

      {/* Progress bar */}
      {showProgress && (
        <div className="mt-2 mb-2">
          <ProgressBar value={progressValue} />
        </div>
      )}

      {/* Trend / subtitle */}
      <div className="flex items-center gap-2 mt-1">
        {trend && (
          <span
            className={cn(
              "text-xs font-medium flex items-center gap-1",
              trendColor,
            )}
          >
            {trend}
          </span>
        )}
        {subtitle && <span className="text-xs text-[#8A8F9E]">{subtitle}</span>}
        {subtitleBadge && (
          <span className="text-[11px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded bg-[#EF4444]/20 text-[#EF4444]">
            {subtitleBadge}
          </span>
        )}
        {!trend && !subtitle && !isTrendPositive && !subtitleBadge && (
          <span className="text-xs text-[#4A4F5C]">—</span>
        )}
      </div>
    </div>
  );
}
