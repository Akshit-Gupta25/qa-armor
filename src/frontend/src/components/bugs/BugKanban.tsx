import type { BugReport, BugStatus } from "@/data/mockData";
import { BugCard } from "./BugCard";

interface BugKanbanProps {
  bugs: BugReport[];
  draggedId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (status: BugStatus) => void;
  dragOverColumn: BugStatus | null;
  onDragOverColumn: (status: BugStatus | null) => void;
}

const columns: { status: BugStatus; label: string; color: string }[] = [
  { status: "OPEN", label: "OPEN", color: "text-[#3B82F6]" },
  { status: "IN_PROGRESS", label: "IN PROGRESS", color: "text-[#F59E0B]" },
  { status: "RESOLVED", label: "RESOLVED", color: "text-[#10B981]" },
  { status: "CLOSED", label: "CLOSED", color: "text-[#8A8F9E]" },
];

export function BugKanban({
  bugs,
  draggedId,
  onDragStart,
  onDragEnd,
  onDrop,
  dragOverColumn,
  onDragOverColumn,
}: BugKanbanProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4" data-ocid="bug.kanban">
      {columns.map(({ status, label, color }) => {
        const colBugs = bugs.filter((b) => b.status === status);
        const isOver = dragOverColumn === status;

        return (
          <div
            key={status}
            data-ocid={`bug.column.${status.toLowerCase()}`}
            className={`
              min-w-[280px] w-[280px] bg-[#111318] rounded-xl p-3 flex flex-col
              border transition-all duration-200
              ${
                isOver
                  ? "border-[#3B82F6]/60 ring-1 ring-[#3B82F6]/30 bg-[#111318]"
                  : "border-[#2A2D36]"
              }
            `}
            onDragOver={(e) => {
              e.preventDefault();
              onDragOverColumn(status);
            }}
            onDragLeave={() => onDragOverColumn(null)}
            onDrop={(e) => {
              e.preventDefault();
              onDrop(status);
              onDragOverColumn(null);
            }}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span
                className={`text-[11px] font-semibold tracking-widest uppercase font-mono ${color}`}
              >
                {label}
              </span>
              <span className="text-[11px] font-mono bg-[#1A1D24] text-[#8A8F9E] px-2 py-0.5 rounded-full border border-[#2A2D36]">
                {colBugs.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 min-h-[120px]">
              {colBugs.length === 0 ? (
                <div
                  className={`
                    h-20 rounded-lg border-2 border-dashed flex items-center justify-center
                    transition-colors duration-200
                    ${isOver ? "border-[#3B82F6]/50 bg-[#3B82F6]/5" : "border-[#2A2D36]"}
                  `}
                >
                  <span className="text-[12px] text-[#4A4F5C]">Drop here</span>
                </div>
              ) : (
                colBugs.map((bug) => (
                  <BugCard
                    key={bug.id}
                    bug={bug}
                    isDragging={draggedId === bug.id}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  />
                ))
              )}
              {/* Drop zone at bottom when column has cards */}
              {isOver && colBugs.length > 0 && (
                <div className="h-2 rounded bg-[#3B82F6]/20 border border-[#3B82F6]/30 mt-1" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
