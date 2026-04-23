import { BugKanban } from "@/components/bugs/BugKanban";
import { StatusPill } from "@/components/ui/StatusPill";
import {
  type BugReport,
  type BugStatus,
  type Priority,
  bugReports,
} from "@/data/mockData";
import { showSuccess } from "@/hooks/useToast";
import {
  ArrowUpDown,
  Bug,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  LayoutGrid,
  List,
} from "lucide-react";
import { useMemo, useState } from "react";

type ViewMode = "kanban" | "list";
type SortKey = "priority" | "title" | "status" | "occurrences" | "firstSeen";
type SortDir = "asc" | "desc";
type FilterPriority = "ALL" | Priority;

const PRIORITY_ORDER: Record<Priority, number> = { P0: 0, P1: 1, P2: 2, P3: 3 };

export default function BugReports() {
  const [view, setView] = useState<ViewMode>("kanban");
  const [bugs, setBugs] = useState<BugReport[]>(bugReports);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<BugStatus | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("priority");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [filterPriority, setFilterPriority] = useState<FilterPriority>("ALL");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredBugs = useMemo(() => {
    let result =
      filterPriority === "ALL"
        ? bugs
        : bugs.filter((b) => b.priority === filterPriority);
    if (view === "list") {
      result = [...result].sort((a, b) => {
        let cmp = 0;
        if (sortKey === "priority")
          cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        else if (sortKey === "title") cmp = a.title.localeCompare(b.title);
        else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
        else if (sortKey === "occurrences") cmp = a.occurrences - b.occurrences;
        else if (sortKey === "firstSeen")
          cmp = Number.parseInt(a.firstSeen) - Number.parseInt(b.firstSeen);
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [bugs, filterPriority, view, sortKey, sortDir]);

  function moveBug(id: string, newStatus: BugStatus) {
    setBugs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col)
      return <ArrowUpDown size={12} className="text-[#4A4F5C]" />;
    return sortDir === "asc" ? (
      <ChevronUp size={12} className="text-[#3B82F6]" />
    ) : (
      <ChevronDown size={12} className="text-[#3B82F6]" />
    );
  }

  const priorityBadge = (p: Priority) => {
    const cfg: Record<Priority, { bg: string; text: string }> = {
      P0: { bg: "bg-red-500/20", text: "text-red-400" },
      P1: { bg: "bg-orange-500/20", text: "text-orange-400" },
      P2: { bg: "bg-amber-500/20", text: "text-amber-400" },
      P3: { bg: "bg-gray-500/20", text: "text-gray-400" },
    };
    const c = cfg[p];
    return (
      <span
        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium font-mono tracking-wide ${c.bg} ${c.text}`}
      >
        {p}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6" data-ocid="bug_reports.page">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* New Bug */}
        <button
          type="button"
          data-ocid="bug.add_button"
          onClick={() => showSuccess("Bug report created!")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#3B82F6]/80 text-white text-[13px] font-medium transition-colors duration-200"
        >
          <Bug size={15} />
          New Bug
        </button>

        {/* View toggle */}
        <div className="flex items-center bg-[#1A1D24] border border-[#2A2D36] rounded-lg overflow-hidden">
          <button
            type="button"
            data-ocid="bug.view_kanban.toggle"
            onClick={() => setView("kanban")}
            className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
              view === "kanban"
                ? "bg-[#2A2D36] text-[#F0F2F5]"
                : "text-[#8A8F9E] hover:text-[#F0F2F5]"
            }`}
          >
            <LayoutGrid size={14} /> Kanban
          </button>
          <button
            type="button"
            data-ocid="bug.view_list.toggle"
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
              view === "list"
                ? "bg-[#2A2D36] text-[#F0F2F5]"
                : "text-[#8A8F9E] hover:text-[#F0F2F5]"
            }`}
          >
            <List size={14} /> List
          </button>
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            type="button"
            data-ocid="bug.filter.toggle"
            onClick={() => setFilterOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1D24] border border-[#2A2D36] text-[#8A8F9E] hover:text-[#F0F2F5] text-[13px] transition-colors duration-200"
          >
            <ChevronsUpDown size={14} />
            {filterPriority === "ALL" ? "All Priorities" : filterPriority}
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`}
            />
          </button>
          {filterOpen && (
            <div
              className="absolute top-full left-0 mt-1 z-20 bg-[#1A1D24] border border-[#2A2D36] rounded-lg shadow-xl overflow-hidden min-w-[160px]"
              data-ocid="bug.filter.dropdown"
            >
              {(["ALL", "P0", "P1", "P2", "P3"] as FilterPriority[]).map(
                (opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setFilterPriority(opt);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] transition-colors duration-150 ${
                      filterPriority === opt
                        ? "bg-[#2A2D36] text-[#F0F2F5]"
                        : "text-[#8A8F9E] hover:bg-[#2A2D36] hover:text-[#F0F2F5]"
                    }`}
                  >
                    {opt === "ALL" ? "All Priorities" : opt}
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        {/* Count */}
        <span className="ml-auto text-[13px] text-[#4A4F5C] font-mono">
          Showing <span className="text-[#8A8F9E]">{filteredBugs.length}</span>{" "}
          bugs
        </span>
      </div>

      {/* Kanban */}
      {view === "kanban" && (
        <BugKanban
          bugs={filteredBugs}
          draggedId={draggedId}
          onDragStart={(id) => setDraggedId(id)}
          onDragEnd={() => setDraggedId(null)}
          onDrop={(status) => {
            if (draggedId) moveBug(draggedId, status);
            setDraggedId(null);
          }}
          dragOverColumn={dragOverColumn}
          onDragOverColumn={setDragOverColumn}
        />
      )}

      {/* List */}
      {view === "list" && (
        <div
          className="bg-[#111318] border border-[#2A2D36] rounded-xl overflow-hidden"
          data-ocid="bug.table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#2A2D36]">
                  {(
                    [
                      {
                        key: "priority",
                        label: "Priority",
                        colId: "col-priority",
                      },
                      { key: "title", label: "Title", colId: "col-title" },
                      {
                        key: "title",
                        label: "Affected Test",
                        colId: "col-affected",
                        noSort: true,
                      },
                      { key: "status", label: "Status", colId: "col-status" },
                      {
                        key: "occurrences",
                        label: "Assignee",
                        colId: "col-assignee",
                        noSort: true,
                      },
                      {
                        key: "occurrences",
                        label: "Occurrences",
                        colId: "col-occurrences",
                      },
                      {
                        key: "firstSeen",
                        label: "First Seen",
                        colId: "col-firstseen",
                      },
                      {
                        key: "firstSeen",
                        label: "Actions",
                        colId: "col-actions",
                        noSort: true,
                      },
                    ] as Array<{
                      key: SortKey;
                      label: string;
                      colId: string;
                      noSort?: boolean;
                    }>
                  ).map(({ key, label, colId, noSort }) => (
                    <th
                      key={colId}
                      className={`px-4 py-3 text-left text-[11px] font-medium uppercase tracking-widest text-[#4A4F5C] font-mono whitespace-nowrap ${!noSort ? "cursor-pointer hover:text-[#8A8F9E] select-none" : ""}`}
                      onClick={noSort ? undefined : () => handleSort(key)}
                      onKeyDown={
                        noSort
                          ? undefined
                          : (e) => e.key === "Enter" && handleSort(key)
                      }
                    >
                      <span className="flex items-center gap-1">
                        {label}
                        {!noSort && <SortIcon col={key} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBugs.map((bug, i) => (
                  <tr
                    key={bug.id}
                    data-ocid={`bug.item.${i + 1}`}
                    className="border-b border-[#2A2D36] hover:bg-[#1A1D24] transition-colors duration-150 group"
                  >
                    <td className="px-4 py-3">{priorityBadge(bug.priority)}</td>
                    <td className="px-4 py-3">
                      <span className="text-[#F0F2F5] font-medium line-clamp-1 max-w-[240px] block">
                        {bug.title}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[#8A8F9E] flex items-center gap-1">
                        <Bug size={12} className="text-[#4A4F5C]" />
                        <span className="truncate max-w-[160px]">
                          {bug.affectedTest}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={bug.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-[#2A2D36] flex items-center justify-center">
                          <span className="text-[10px] font-medium text-[#8A8F9E]">
                            {bug.assignee.initials}
                          </span>
                        </div>
                        <span className="text-[#8A8F9E] whitespace-nowrap">
                          {bug.assignee.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[#8A8F9E] text-right">
                      {bug.occurrences}
                    </td>
                    <td className="px-4 py-3 text-[#4A4F5C] font-mono whitespace-nowrap">
                      {bug.firstSeen}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button
                          type="button"
                          data-ocid={`bug.edit_button.${i + 1}`}
                          className="px-2 py-1 text-[11px] rounded border border-[#2A2D36] text-[#8A8F9E] hover:text-[#F0F2F5] hover:border-[#3B82F6]/50 transition-colors duration-150"
                          onClick={() => showSuccess(`Bug ${bug.id} updated`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          data-ocid={`bug.delete_button.${i + 1}`}
                          className="px-2 py-1 text-[11px] rounded border border-[#2A2D36] text-[#EF4444]/70 hover:text-[#EF4444] hover:border-[#EF4444]/40 transition-colors duration-150"
                          onClick={() => showSuccess(`Bug ${bug.id} archived`)}
                        >
                          Archive
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBugs.length === 0 && (
            <div
              className="py-16 flex flex-col items-center gap-3"
              data-ocid="bug.empty_state"
            >
              <Bug size={32} className="text-[#2A2D36]" />
              <p className="text-[#4A4F5C] text-[14px]">
                No bugs match the current filter
              </p>
              <button
                type="button"
                onClick={() => setFilterPriority("ALL")}
                className="text-[#3B82F6] text-[13px] hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
