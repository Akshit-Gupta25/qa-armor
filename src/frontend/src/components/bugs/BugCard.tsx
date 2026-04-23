import type { BugReport, Priority } from "@/data/mockData";
import { Bug } from "lucide-react";

interface BugCardProps {
  bug: BugReport;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
}

const priorityConfig: Record<
  Priority,
  { label: string; bg: string; text: string }
> = {
  P0: { label: "P0", bg: "bg-red-500/20", text: "text-red-400" },
  P1: { label: "P1", bg: "bg-orange-500/20", text: "text-orange-400" },
  P2: { label: "P2", bg: "bg-amber-500/20", text: "text-amber-400" },
  P3: { label: "P3", bg: "bg-gray-500/20", text: "text-gray-400" },
};

export function BugCard({
  bug,
  isDragging,
  onDragStart,
  onDragEnd,
}: BugCardProps) {
  const p = priorityConfig[bug.priority];

  return (
    <div
      data-ocid={`bug.card.${bug.id}`}
      draggable
      onDragStart={() => onDragStart(bug.id)}
      onDragEnd={onDragEnd}
      className={`
        bg-[#1A1D24] rounded-lg p-3 mb-2 border border-[#2A2D36] cursor-grab select-none
        transition-all duration-200
        hover:border-[#3B82F6]/40 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.2),0_4px_12px_rgba(0,0,0,0.4)]
        ${isDragging ? "opacity-50 rotate-1 scale-[0.98]" : "opacity-100"}
      `}
    >
      {/* Top row: priority + date */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium font-mono tracking-wide ${p.bg} ${p.text}`}
        >
          {p.label}
        </span>
        <span className="text-[11px] text-[#4A4F5C] font-mono">
          {bug.firstSeen}
        </span>
      </div>

      {/* Title */}
      <p className="text-[14px] font-medium text-[#F0F2F5] leading-snug line-clamp-2 mb-2">
        {bug.title}
      </p>

      {/* Affected test */}
      <div className="flex items-center gap-1 mb-2">
        <Bug size={12} className="text-[#4A4F5C] flex-shrink-0" />
        <span className="text-[12px] text-[#8A8F9E] truncate">
          {bug.affectedTest}
        </span>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[11px] text-[#4A4F5C]">
          First seen {bug.firstSeen}
        </span>
        <span className="text-[11px] text-[#4A4F5C]">
          {bug.occurrences} occurrences
        </span>
      </div>

      {/* Bottom: assignee + tags */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-[#2A2D36] flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-medium text-[#8A8F9E]">
              {bug.assignee.initials}
            </span>
          </div>
          <span className="text-[11px] text-[#8A8F9E] truncate max-w-[80px]">
            {bug.assignee.name.split(" ")[0]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono text-[#4A4F5C] bg-[#111318] px-1.5 py-0.5 rounded border border-[#2A2D36]">
            {bug.tags.browser}
          </span>
          <span className="text-[10px] font-mono text-[#4A4F5C] bg-[#111318] px-1.5 py-0.5 rounded border border-[#2A2D36]">
            {bug.tags.environment}
          </span>
        </div>
      </div>
    </div>
  );
}
