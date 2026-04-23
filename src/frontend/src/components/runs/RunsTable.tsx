import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TestRun } from "@/data/mockData";
import { showInfo, showSuccess } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import {
  Archive,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  Loader2,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";
import { Fragment, useState } from "react";
import { RunExpandedRow } from "./RunExpandedRow";

interface RunsTableProps {
  runs: TestRun[];
  selectedRows: string[];
  onSelectRow: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
}

const COL_SPAN = 12;

export function RunsTable({
  runs,
  selectedRows,
  onSelectRow,
  onSelectAll,
}: RunsTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const allSelected =
    runs.length > 0 && runs.every((r) => selectedRows.includes(r.id));
  const someSelected = runs.some((r) => selectedRows.includes(r.id));

  function toggleExpand(runId: string) {
    setExpandedRow((prev) => (prev === runId ? null : runId));
  }

  function handleRowClick(e: React.MouseEvent, runId: string) {
    const target = e.target as HTMLElement;
    if (target.closest("[data-no-expand]")) return;
    toggleExpand(runId);
  }

  function coverageColor(pct: number) {
    if (pct >= 80) return "text-[#10B981]";
    if (pct >= 60) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-[#2A2D36]">
            <th className="w-10 px-4 py-3 text-left">
              <Checkbox
                data-ocid="runs.select_all_checkbox"
                checked={allSelected}
                onCheckedChange={(checked) => {
                  if (checked) onSelectAll(runs.map((r) => r.id));
                  else onSelectAll([]);
                }}
                aria-label="Select all runs"
                className="border-[#2A2D36]"
                data-indeterminate={someSelected && !allSelected}
              />
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C] w-8">
              #
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
              Run ID
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
              Suite Name
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
              Branch
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
              Status
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
              Tests
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
              Duration
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
              Coverage
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
              Triggered
            </th>
            <th className="px-3 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C]">
              Started
            </th>
            <th className="px-3 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C] w-12">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run, index) => {
            const isExpanded = expandedRow === run.id;
            const isSelected = selectedRows.includes(run.id);

            return (
              <Fragment key={run.id}>
                <tr
                  data-ocid={`runs.item.${index + 1}`}
                  onClick={(e) => handleRowClick(e, run.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleRowClick(e as unknown as React.MouseEvent, run.id);
                  }}
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  className={cn(
                    "border-b border-[#2A2D36]/60 cursor-pointer transition-hover group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B82F6]/50",
                    isSelected ? "bg-[#1A1D24]/80" : "hover:bg-[#1A1D24]",
                    isExpanded && "bg-[#1A1D24]",
                  )}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3" data-no-expand="">
                    <Checkbox
                      data-ocid={`runs.checkbox.${index + 1}`}
                      checked={isSelected}
                      onCheckedChange={() => onSelectRow(run.id)}
                      aria-label={`Select run ${run.id}`}
                      className="border-[#2A2D36]"
                    />
                  </td>

                  {/* # */}
                  <td className="px-3 py-3 text-[#4A4F5C] font-mono text-[12px]">
                    <div className="flex items-center gap-1">
                      {isExpanded ? (
                        <ChevronDown size={12} className="text-[#3B82F6]" />
                      ) : (
                        <ChevronRight
                          size={12}
                          className="opacity-0 group-hover:opacity-60"
                        />
                      )}
                      {index + 1}
                    </div>
                  </td>

                  {/* Run ID */}
                  <td className="px-3 py-3">
                    <span className="font-mono text-[12px] text-[#3B82F6]">
                      {run.id}
                    </span>
                  </td>

                  {/* Suite Name */}
                  <td className="px-3 py-3 max-w-[160px]">
                    <span className="text-[#F0F2F5] truncate block">
                      {run.suiteName}
                    </span>
                  </td>

                  {/* Branch */}
                  <td className="px-3 py-3">
                    <span className="font-mono text-[11px] text-[#8A8F9E] bg-[#1A1D24] border border-[#2A2D36] px-2 py-0.5 rounded">
                      {run.branch}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3">
                    {run.status === "RUNNING" ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2
                          size={12}
                          className="animate-spin text-[#3B82F6]"
                        />
                        <StatusPill status={run.status} />
                      </span>
                    ) : (
                      <StatusPill status={run.status} />
                    )}
                  </td>

                  {/* Tests */}
                  <td className="px-3 py-3">
                    <span className="font-mono text-[12px]">
                      <span className="text-[#10B981]">{run.passedTests}</span>
                      <span className="text-[#4A4F5C]">/</span>
                      <span className="text-[#F0F2F5]">{run.totalTests}</span>
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="px-3 py-3 text-[#8A8F9E] font-mono text-[12px]">
                    {run.duration}
                  </td>

                  {/* Coverage */}
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "font-mono text-[12px]",
                        coverageColor(run.coveragePercent),
                      )}
                    >
                      {run.coveragePercent}%
                    </span>
                  </td>

                  {/* Triggered */}
                  <td className="px-3 py-3 text-[#8A8F9E] text-[12px] max-w-[120px]">
                    <span className="truncate block">{run.triggeredBy}</span>
                  </td>

                  {/* Started At */}
                  <td className="px-3 py-3 text-[#8A8F9E] text-[12px] whitespace-nowrap">
                    {run.startedAt}
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 text-right" data-no-expand="">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          data-ocid={`runs.actions_menu.${index + 1}`}
                          className="p-1.5 rounded text-[#4A4F5C] hover:text-[#F0F2F5] hover:bg-[#2A2D36] transition-hover opacity-0 group-hover:opacity-100"
                          aria-label="Row actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-[#1A1D24] border border-[#2A2D36] text-[#F0F2F5] min-w-[160px]"
                      >
                        <DropdownMenuItem
                          className="text-[13px] cursor-pointer hover:bg-[#2A2D36] gap-2"
                          onClick={() => showSuccess(`Re-running ${run.id}…`)}
                        >
                          <RefreshCw size={14} /> Re-run
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-[13px] cursor-pointer hover:bg-[#2A2D36] gap-2"
                          onClick={() =>
                            showInfo(`Viewing details for ${run.id}`)
                          }
                        >
                          <Eye size={14} /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-[13px] cursor-pointer hover:bg-[#2A2D36] gap-2"
                          onClick={() => showSuccess(`${run.id} exported`)}
                        >
                          <Download size={14} /> Export
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-[13px] cursor-pointer hover:bg-[#2A2D36] gap-2 text-[#8A8F9E]"
                          onClick={() => showInfo(`${run.id} archived`)}
                        >
                          <Archive size={14} /> Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>

                {/* Expanded Row */}
                {isExpanded && (
                  <RunExpandedRow
                    key={`${run.id}-expanded`}
                    runId={run.id}
                    runIndex={index}
                    status={run.status}
                    colSpan={COL_SPAN}
                  />
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
