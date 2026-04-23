import type { AIInsight, InsightCategory } from "@/data/mockData";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { InsightCard } from "./InsightCard";

type FilterTab = "All" | InsightCategory;

const TABS: FilterTab[] = [
  "All",
  "Flakiness",
  "Coverage Gaps",
  "Performance",
  "Security",
  "Accessibility",
];

interface InsightFeedProps {
  insights: AIInsight[];
}

export function InsightFeed({ insights }: InsightFeedProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = insights.filter((i) => {
    if (dismissed.has(i.id)) return false;
    if (activeTab === "All") return true;
    return i.category === activeTab;
  });

  function handleDismiss(id: string) {
    setDismissed((prev) => new Set([...prev, id]));
  }

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex items-center gap-1 mb-6 overflow-x-auto pb-1"
        style={{ borderBottom: "1px solid #2A2D36" }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              data-ocid={`insights.filter.${tab.toLowerCase().replace(/\s+/g, "_")}`}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2.5 text-[14px] font-medium whitespace-nowrap transition-hover relative"
              style={{
                color: isActive ? "#3B82F6" : "#8A8F9E",
                borderBottom: isActive
                  ? "2px solid #3B82F6"
                  : "2px solid transparent",
                background: "transparent",
                marginBottom: "-1px",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Feed */}
      {visible.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-3"
          data-ocid="insights.empty_state"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
          >
            <Sparkles size={24} style={{ color: "#8B5CF6" }} />
          </div>
          <p className="text-[16px] font-medium" style={{ color: "#F0F2F5" }}>
            No insights for this category
          </p>
          <p className="text-[14px]" style={{ color: "#4A4F5C" }}>
            All clear — or try a different filter
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {visible.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              onDismiss={handleDismiss}
            />
          ))}
        </div>
      )}
    </div>
  );
}
