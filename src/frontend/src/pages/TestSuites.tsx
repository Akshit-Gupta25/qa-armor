import { SuiteCard } from "@/components/suites/SuiteCard";
import { testSuites } from "@/data/mockData";
import type { SuiteType } from "@/data/mockData";
import { showSuccess } from "@/hooks/useToast";
import { ChevronDown, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

type FilterType = "All" | SuiteType;
type SortKey = "Name" | "Most Tests" | "Pass Rate" | "Last Run";

const TYPE_OPTIONS: FilterType[] = [
  "All",
  "E2E",
  "Unit",
  "Integration",
  "Visual",
];
const SORT_OPTIONS: SortKey[] = ["Name", "Most Tests", "Pass Rate", "Last Run"];

const TIME_ORDER: Record<string, number> = {
  "5 minutes ago": 0,
  "30 minutes ago": 1,
  "2 hours ago": 2,
  "3 hours ago": 3,
  "1 day ago": 4,
  Yesterday: 5,
};

export default function TestSuites() {
  const [filterType, setFilterType] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("Name");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filtered = useMemo(() => {
    let result = [...testSuites];

    if (filterType !== "All") {
      result = result.filter((s) => s.type === filterType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q));
    }

    result.sort((a, b) => {
      switch (sortKey) {
        case "Name":
          return a.name.localeCompare(b.name);
        case "Most Tests":
          return b.totalTests - a.totalTests;
        case "Pass Rate": {
          const rateA = a.totalTests > 0 ? a.passing / a.totalTests : 0;
          const rateB = b.totalTests > 0 ? b.passing / b.totalTests : 0;
          return rateB - rateA;
        }
        case "Last Run": {
          const orderA = TIME_ORDER[a.lastRunTime] ?? 99;
          const orderB = TIME_ORDER[b.lastRunTime] ?? 99;
          return orderA - orderB;
        }
        default:
          return 0;
      }
    });

    return result;
  }, [filterType, searchQuery, sortKey]);

  const handleNewSuite = () => {
    showSuccess("Suite created successfully!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sticky Toolbar */}
      <div
        className="sticky top-0 z-10 flex flex-wrap items-center gap-3 py-4 bg-[#0A0B0D] border-b border-[#2A2D36]"
        data-ocid="suites.toolbar"
      >
        {/* New Suite */}
        <button
          type="button"
          className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[14px] font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex-shrink-0"
          onClick={handleNewSuite}
          data-ocid="suites.new_suite_button"
        >
          <Plus size={16} />
          New Suite
        </button>

        {/* Type Filter Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 bg-[#111318] border border-[#2A2D36] hover:border-[#4A4F5C] text-[#F0F2F5] text-[14px] px-3 py-2 rounded-lg transition-colors duration-200"
            onClick={() => {
              setShowTypeDropdown((v) => !v);
              setShowSortDropdown(false);
            }}
            data-ocid="suites.filter_type_select"
          >
            <span className="text-[#8A8F9E] text-[12px]">Type:</span>
            <span>{filterType}</span>
            <ChevronDown size={14} className="text-[#8A8F9E]" />
          </button>
          {showTypeDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-[#1A1D24] border border-[#2A2D36] rounded-lg shadow-xl z-20 min-w-[140px] py-1">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#2A2D36] transition-colors ${
                    filterType === opt
                      ? "text-[#3B82F6] font-medium"
                      : "text-[#F0F2F5]"
                  }`}
                  onClick={() => {
                    setFilterType(opt);
                    setShowTypeDropdown(false);
                  }}
                  data-ocid={`suites.filter_type.${opt.toLowerCase()}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4F5C]"
          />
          <input
            type="text"
            placeholder="Search suites…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111318] border border-[#2A2D36] text-[#F0F2F5] text-[14px] placeholder-[#4A4F5C] rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#3B82F6] transition-colors duration-200"
            data-ocid="suites.search_input"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 bg-[#111318] border border-[#2A2D36] hover:border-[#4A4F5C] text-[#F0F2F5] text-[14px] px-3 py-2 rounded-lg transition-colors duration-200"
            onClick={() => {
              setShowSortDropdown((v) => !v);
              setShowTypeDropdown(false);
            }}
            data-ocid="suites.sort_select"
          >
            <span className="text-[#8A8F9E] text-[12px]">Sort:</span>
            <span>{sortKey}</span>
            <ChevronDown size={14} className="text-[#8A8F9E]" />
          </button>
          {showSortDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-[#1A1D24] border border-[#2A2D36] rounded-lg shadow-xl z-20 min-w-[160px] py-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#2A2D36] transition-colors ${
                    sortKey === opt
                      ? "text-[#3B82F6] font-medium"
                      : "text-[#F0F2F5]"
                  }`}
                  onClick={() => {
                    setSortKey(opt);
                    setShowSortDropdown(false);
                  }}
                  data-ocid={`suites.sort_option.${opt.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Count */}
        <span
          className="ml-auto text-[13px] text-[#8A8F9E] flex-shrink-0"
          data-ocid="suites.count_label"
        >
          Showing{" "}
          <span className="text-[#F0F2F5] font-medium">{filtered.length}</span>{" "}
          of{" "}
          <span className="text-[#F0F2F5] font-medium">
            {testSuites.length}
          </span>{" "}
          suites
        </span>
      </div>

      {/* Close dropdowns on outside click */}
      {(showTypeDropdown || showSortDropdown) && (
        <button
          type="button"
          aria-label="Close dropdowns"
          className="fixed inset-0 z-[9] cursor-default"
          onClick={() => {
            setShowTypeDropdown(false);
            setShowSortDropdown(false);
          }}
        />
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
          data-ocid="suites.grid"
        >
          {filtered.map((suite, index) => (
            <div key={suite.id} data-ocid={`suites.item.${index + 1}`}>
              <SuiteCard suite={suite} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="suites.empty_state"
        >
          <div className="w-16 h-16 rounded-full bg-[#1A1D24] flex items-center justify-center mb-4">
            <Search size={28} className="text-[#4A4F5C]" />
          </div>
          <p className="text-[#F0F2F5] font-medium text-[16px] mb-1">
            No suites found
          </p>
          <p className="text-[#8A8F9E] text-[14px] max-w-xs">
            Try adjusting your filters or search query to find what you're
            looking for.
          </p>
        </div>
      )}
    </div>
  );
}
