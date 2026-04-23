import { RunsTable } from "@/components/runs/RunsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { testRuns, testSuites } from "@/data/mockData";
import type { RunStatus } from "@/data/mockData";
import { showInfo, showSuccess } from "@/hooks/useToast";
import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Play,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 15;

type TriggerFilter = "All" | "CI" | "Manual" | "Scheduled";
type EnvFilter = "All" | "staging" | "production";
type StatusFilter = "All" | RunStatus;

const TRIGGER_OPTIONS: TriggerFilter[] = ["All", "CI", "Manual", "Scheduled"];
const ENV_OPTIONS: EnvFilter[] = ["All", "staging", "production"];
const STATUS_OPTIONS: StatusFilter[] = [
  "All",
  "PASSED",
  "FAILED",
  "RUNNING",
  "FLAKY",
];

const TRIGGER_MAP: Record<string, TriggerFilter> = {
  "GitHub Actions": "CI",
  "PR Trigger": "CI",
  Webhook: "CI",
  Manual: "Manual",
  Scheduled: "Scheduled",
};

// Derive unique suite names
const SUITE_NAMES = Array.from(new Set(testSuites.map((s) => s.name)));

export default function TestRuns() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [suiteFilter, setSuiteFilter] = useState("All");
  const [triggerFilter, setTriggerFilter] = useState<TriggerFilter>("All");
  const [envFilter, setEnvFilter] = useState<EnvFilter>("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const hasActiveFilters =
    statusFilter !== "All" ||
    suiteFilter !== "All" ||
    triggerFilter !== "All" ||
    envFilter !== "All" ||
    dateFrom !== "" ||
    dateTo !== "" ||
    search !== "";

  function clearFilters() {
    setStatusFilter("All");
    setSuiteFilter("All");
    setTriggerFilter("All");
    setEnvFilter("All");
    setDateFrom("");
    setDateTo("");
    setSearch("");
    setPage(1);
  }

  const filtered = useMemo(() => {
    return testRuns.filter((run) => {
      if (statusFilter !== "All" && run.status !== statusFilter) return false;
      if (suiteFilter !== "All" && run.suiteName !== suiteFilter) return false;
      if (
        triggerFilter !== "All" &&
        TRIGGER_MAP[run.triggeredBy] !== triggerFilter
      )
        return false;
      if (envFilter !== "All") {
        // Map environment filter: production runs use certain trigger patterns
        const isProduction =
          run.triggeredBy === "Scheduled" ||
          run.branch === "main" ||
          run.branch === "release/v2.1";
        if (envFilter === "production" && !isProduction) return false;
        if (envFilter === "staging" && isProduction) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        if (
          !run.id.toLowerCase().includes(q) &&
          !run.suiteName.toLowerCase().includes(q) &&
          !run.branch.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [statusFilter, suiteFilter, triggerFilter, envFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const pageRuns = filtered.slice(pageStart, pageEnd);

  function handleSelectRow(id: string) {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  }

  function handleSelectAll(ids: string[]) {
    if (ids.length === 0) {
      setSelectedRows((prev) =>
        prev.filter((id) => !pageRuns.find((r) => r.id === id)),
      );
    } else {
      setSelectedRows((prev) => Array.from(new Set([...prev, ...ids])));
    }
  }

  function goToPage(p: number) {
    setPage(Math.max(1, Math.min(p, totalPages)));
  }

  return (
    <div className="space-y-4" data-ocid="runs.page">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#F0F2F5]">
            Test Runs
          </h1>
          <p className="text-[13px] text-[#8A8F9E] mt-0.5">
            {filtered.length} runs across all suites
          </p>
        </div>
        <Button
          type="button"
          data-ocid="runs.trigger_run_button"
          className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white text-[13px] h-9"
          onClick={() => showSuccess("Test run triggered successfully")}
        >
          <Play size={14} />
          Run All Suites
        </Button>
      </div>

      {/* Filter Bar */}
      <div
        data-ocid="runs.filter_bar"
        className="flex flex-wrap items-center gap-2 p-3 bg-[#111318] border border-[#2A2D36] rounded-xl"
      >
        <Filter size={14} className="text-[#4A4F5C] flex-shrink-0" />

        {/* Status */}
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v as StatusFilter);
            setPage(1);
          }}
        >
          <SelectTrigger
            data-ocid="runs.status_filter"
            className="h-8 w-[120px] bg-[#0A0B0D] border-[#2A2D36] text-[#F0F2F5] text-[12px]"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1D24] border-[#2A2D36] text-[#F0F2F5]">
            {STATUS_OPTIONS.map((s) => (
              <SelectItem
                key={s}
                value={s}
                className="text-[12px] focus:bg-[#2A2D36]"
              >
                {s === "All" ? "All Statuses" : s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Suite */}
        <Select
          value={suiteFilter}
          onValueChange={(v) => {
            setSuiteFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger
            data-ocid="runs.suite_filter"
            className="h-8 w-[160px] bg-[#0A0B0D] border-[#2A2D36] text-[#F0F2F5] text-[12px]"
          >
            <SelectValue placeholder="Suite" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1D24] border-[#2A2D36] text-[#F0F2F5] max-h-[280px]">
            <SelectItem value="All" className="text-[12px] focus:bg-[#2A2D36]">
              All Suites
            </SelectItem>
            {SUITE_NAMES.map((name) => (
              <SelectItem
                key={name}
                value={name}
                className="text-[12px] focus:bg-[#2A2D36]"
              >
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Triggered By */}
        <Select
          value={triggerFilter}
          onValueChange={(v) => {
            setTriggerFilter(v as TriggerFilter);
            setPage(1);
          }}
        >
          <SelectTrigger
            data-ocid="runs.trigger_filter"
            className="h-8 w-[130px] bg-[#0A0B0D] border-[#2A2D36] text-[#F0F2F5] text-[12px]"
          >
            <SelectValue placeholder="Triggered By" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1D24] border-[#2A2D36] text-[#F0F2F5]">
            {TRIGGER_OPTIONS.map((t) => (
              <SelectItem
                key={t}
                value={t}
                className="text-[12px] focus:bg-[#2A2D36]"
              >
                {t === "All" ? "All Triggers" : t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Environment */}
        <Select
          value={envFilter}
          onValueChange={(v) => {
            setEnvFilter(v as EnvFilter);
            setPage(1);
          }}
        >
          <SelectTrigger
            data-ocid="runs.env_filter"
            className="h-8 w-[130px] bg-[#0A0B0D] border-[#2A2D36] text-[#F0F2F5] text-[12px]"
          >
            <SelectValue placeholder="Environment" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1D24] border-[#2A2D36] text-[#F0F2F5]">
            {ENV_OPTIONS.map((e) => (
              <SelectItem
                key={e}
                value={e}
                className="text-[12px] focus:bg-[#2A2D36]"
              >
                {e === "All" ? "All Environments" : e}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range */}
        <div className="flex items-center gap-1.5">
          <Input
            type="date"
            data-ocid="runs.date_from_input"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
            className="h-8 w-[130px] bg-[#0A0B0D] border-[#2A2D36] text-[#F0F2F5] text-[12px] [color-scheme:dark]"
            placeholder="From"
          />
          <span className="text-[#4A4F5C] text-[12px]">–</span>
          <Input
            type="date"
            data-ocid="runs.date_to_input"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
            className="h-8 w-[130px] bg-[#0A0B0D] border-[#2A2D36] text-[#F0F2F5] text-[12px] [color-scheme:dark]"
            placeholder="To"
          />
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[160px] max-w-[280px]">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A4F5C]"
          />
          <Input
            data-ocid="runs.search_input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search run ID, suite, branch…"
            className="h-8 pl-8 bg-[#0A0B0D] border-[#2A2D36] text-[#F0F2F5] text-[12px] placeholder:text-[#4A4F5C]"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            type="button"
            data-ocid="runs.clear_filters_button"
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 h-8 rounded text-[12px] text-[#8A8F9E] border border-[#2A2D36] hover:border-[#F0F2F5]/20 hover:text-[#F0F2F5] transition-hover"
          >
            <X size={12} />
            Clear
          </button>
        )}
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedRows.length > 0 && (
        <div
          data-ocid="runs.bulk_actions_toolbar"
          className="flex items-center gap-3 px-4 py-2.5 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-xl"
        >
          <span className="text-[13px] font-medium text-[#3B82F6]">
            {selectedRows.length} selected
          </span>
          <div className="flex items-center gap-2 ml-2">
            <Button
              type="button"
              data-ocid="runs.rerun_selected_button"
              size="sm"
              className="h-7 px-3 text-[12px] bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white gap-1.5"
              onClick={() =>
                showSuccess(
                  `Re-running ${selectedRows.length} selected run(s)…`,
                )
              }
            >
              <RefreshCw size={12} />
              Re-run Selected
            </Button>
            <Button
              type="button"
              data-ocid="runs.export_selected_button"
              size="sm"
              variant="outline"
              className="h-7 px-3 text-[12px] border-[#2A2D36] text-[#8A8F9E] hover:text-[#F0F2F5] hover:border-[#F0F2F5]/30 bg-transparent gap-1.5"
              onClick={() =>
                showSuccess(`Exporting ${selectedRows.length} run(s)…`)
              }
            >
              <Download size={12} />
              Export
            </Button>
            <Button
              type="button"
              data-ocid="runs.archive_selected_button"
              size="sm"
              variant="outline"
              className="h-7 px-3 text-[12px] border-[#2A2D36] text-[#8A8F9E] hover:text-[#F0F2F5] hover:border-[#F0F2F5]/30 bg-transparent gap-1.5"
              onClick={() => {
                showInfo(`${selectedRows.length} run(s) archived`);
                setSelectedRows([]);
              }}
            >
              <Archive size={12} />
              Archive
            </Button>
          </div>
          <button
            type="button"
            className="ml-auto text-[#4A4F5C] hover:text-[#8A8F9E] transition-hover"
            aria-label="Dismiss selection"
            onClick={() => setSelectedRows([])}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Table */}
      <div
        data-ocid="runs.table"
        className="bg-[#111318] border border-[#2A2D36] rounded-xl overflow-hidden"
      >
        {pageRuns.length === 0 ? (
          <div
            data-ocid="runs.empty_state"
            className="flex flex-col items-center justify-center py-20 gap-3"
          >
            <Search size={32} className="text-[#2A2D36]" />
            <p className="text-[14px] font-medium text-[#8A8F9E]">
              No runs match your filters
            </p>
            <p className="text-[12px] text-[#4A4F5C]">
              Try adjusting the filters or clearing them to see all runs.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 text-[13px] text-[#3B82F6] hover:text-[#3B82F6]/80 transition-hover"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <RunsTable
            runs={pageRuns}
            selectedRows={selectedRows}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
          />
        )}
      </div>

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div
          data-ocid="runs.pagination"
          className="flex items-center justify-between px-1"
        >
          <p className="text-[12px] text-[#4A4F5C]">
            Showing{" "}
            <span className="text-[#8A8F9E]">
              {pageStart + 1}–{pageEnd}
            </span>{" "}
            of <span className="text-[#8A8F9E]">{filtered.length}</span> runs
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-ocid="runs.pagination_prev"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[12px] border border-[#2A2D36] text-[#8A8F9E] hover:text-[#F0F2F5] hover:border-[#F0F2F5]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-hover"
            >
              <ChevronLeft size={14} />
              Prev
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 || p === totalPages || Math.abs(p - safePage) <= 1,
                )
                .reduce<(number | string)[]>((acc, p, idx, arr) => {
                  if (
                    idx > 0 &&
                    typeof arr[idx - 1] === "number" &&
                    (p as number) - (arr[idx - 1] as number) > 1
                  ) {
                    acc.push(`ellipsis-before-${p}`);
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((p) =>
                  typeof p === "string" ? (
                    <span key={p} className="px-2 text-[#4A4F5C] text-[12px]">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      data-ocid={`runs.pagination_page.${p}`}
                      onClick={() => goToPage(p as number)}
                      className={`w-8 h-8 rounded text-[12px] font-medium transition-hover ${
                        safePage === p
                          ? "bg-[#3B82F6] text-white"
                          : "text-[#8A8F9E] hover:text-[#F0F2F5] hover:bg-[#1A1D24]"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}
            </div>
            <button
              type="button"
              data-ocid="runs.pagination_next"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[12px] border border-[#2A2D36] text-[#8A8F9E] hover:text-[#F0F2F5] hover:border-[#F0F2F5]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-hover"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
