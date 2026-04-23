import { cn } from "@/lib/utils";

export type PillStatus =
  | "PASSED"
  | "FAILED"
  | "RUNNING"
  | "FLAKY"
  | "SKIPPED"
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

interface StatusPillProps {
  status: PillStatus;
  className?: string;
}

const statusConfig: Record<
  PillStatus,
  { dot: string; label: string; text: string; pulse?: boolean }
> = {
  PASSED: { dot: "bg-[#10B981]", label: "PASSED", text: "text-[#10B981]" },
  RESOLVED: { dot: "bg-[#10B981]", label: "RESOLVED", text: "text-[#10B981]" },
  FAILED: { dot: "bg-[#EF4444]", label: "FAILED", text: "text-[#EF4444]" },
  RUNNING: {
    dot: "bg-[#3B82F6]",
    label: "RUNNING",
    text: "text-[#3B82F6]",
    pulse: true,
  },
  OPEN: { dot: "bg-[#3B82F6]", label: "OPEN", text: "text-[#3B82F6]" },
  FLAKY: { dot: "bg-[#F59E0B]", label: "FLAKY", text: "text-[#F59E0B]" },
  IN_PROGRESS: {
    dot: "bg-[#F59E0B]",
    label: "IN PROGRESS",
    text: "text-[#F59E0B]",
  },
  SKIPPED: { dot: "bg-[#4A4F5C]", label: "SKIPPED", text: "text-[#8A8F9E]" },
  CLOSED: { dot: "bg-[#4A4F5C]", label: "CLOSED", text: "text-[#8A8F9E]" },
};

export function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status] ?? statusConfig.SKIPPED;
  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "w-2 h-2 rounded-full flex-shrink-0",
          config.dot,
          config.pulse && "animate-pulse",
        )}
      />
      <span
        className={cn(
          "text-[11px] font-medium uppercase tracking-wide font-mono",
          config.text,
        )}
      >
        {config.label}
      </span>
    </span>
  );
}
