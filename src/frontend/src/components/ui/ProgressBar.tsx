import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn(
        "w-full h-1 rounded-full bg-[#2A2D36] overflow-hidden",
        className,
      )}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${clamped}%`,
          background: "linear-gradient(to right, #10B981, #3B82F6)",
        }}
      />
    </div>
  );
}
