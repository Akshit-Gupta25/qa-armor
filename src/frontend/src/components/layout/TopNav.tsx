import { useMockRunner } from "@/hooks/useMockRunner";
import { showSuccess } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronRight,
  Loader2,
  Menu,
  Moon,
  Play,
  Search,
  Sun,
} from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  text: string;
  time: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    text: "Test suite 'Authentication Flow' failed",
    time: "5m ago",
    unread: true,
  },
  {
    id: "2",
    text: "Coverage dropped below 80% threshold",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    text: "AI detected 2 new flaky tests",
    time: "3h ago",
    unread: true,
  },
];

const pageLabels: Record<string, string> = {
  dashboard: "Dashboard",
  suites: "Test Suites",
  runs: "Test Runs",
  bugs: "Bug Reports",
  coverage: "Coverage Map",
  insights: "AI Insights",
  integrations: "Integrations",
  settings: "Settings",
  analysis: "Code Analysis",
};

const pageDescriptions: Record<string, string> = {
  dashboard: "Overview of test health and metrics",
  suites: "Manage and run your test suites",
  runs: "Browse and filter test run history",
  bugs: "Track and triage open bugs",
  coverage: "Visual map of test coverage",
  insights: "AI-generated recommendations",
  integrations: "Connect your CI/CD and tools",
  settings: "Configure project preferences",
  analysis: "AI-powered bug prediction",
};

interface TopNavProps {
  currentPage: string;
  projectName: string;
  onMenuToggle: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function TopNav({
  currentPage,
  projectName,
  onMenuToggle,
  isDark,
  onThemeToggle,
}: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { isRunning, startRun } = useMockRunner({
    onComplete: () => showSuccess("Test run completed successfully!"),
  });

  const pageLabel = pageLabels[currentPage] ?? "Dashboard";
  const pageDesc = pageDescriptions[currentPage] ?? "";

  return (
    <header className="h-14 flex items-center gap-3 px-4 border-b border-[#2A2D36] bg-[#111318] flex-shrink-0">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="md:hidden p-1.5 rounded hover:bg-[#1A1D24] text-[#8A8F9E] hover:text-[#F0F2F5] transition-colors"
        aria-label="Open navigation menu"
        title="Open navigation menu"
        data-ocid="topnav.menu_button"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Mobile: page title (visible on mobile only) */}
      <div className="flex md:hidden flex-1 min-w-0">
        <span className="text-[14px] font-semibold text-[#F0F2F5] truncate">
          {pageLabel}
        </span>
      </div>

      {/* Desktop Breadcrumb */}
      <div className="hidden md:flex flex-col justify-center flex-shrink-0">
        <div className="flex items-center gap-1.5 text-[13px]">
          <span className="text-[#8A8F9E]">{projectName}</span>
          <ChevronRight className="w-3 h-3 text-[#4A4F5C]" />
          <span className="text-[#F0F2F5] font-semibold">{pageLabel}</span>
        </div>
        {pageDesc && (
          <p className="text-[11px] text-[#4A4F5C] mt-0.5 hidden lg:block">
            {pageDesc}
          </p>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-xs mx-0 ml-4">
        <div className="relative w-full">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4A4F5C]"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search tests, bugs, insights…"
            aria-label="Search tests, bugs, and insights"
            className="w-full h-8 pl-8 pr-3 rounded-lg bg-[#1A1D24] border border-[#2A2D36] text-[13px] text-[#F0F2F5] placeholder-[#4A4F5C] focus:outline-none focus:border-[#3B82F6]/50 transition-colors duration-200"
            data-ocid="topnav.search_input"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Run Tests */}
        <button
          type="button"
          onClick={startRun}
          disabled={isRunning}
          data-ocid="topnav.run_tests_button"
          aria-label={
            isRunning ? "Test run in progress" : "Run all test suites"
          }
          title={isRunning ? "Test run in progress" : "Run all test suites"}
          className={cn(
            "hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium transition-all duration-200",
            isRunning
              ? "bg-[#3B82F6]/20 text-[#3B82F6] cursor-not-allowed"
              : "bg-[#3B82F6] text-white hover:bg-[#2563EB]",
          )}
        >
          {isRunning ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          {isRunning ? "Running…" : "Run Tests"}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((v) => !v)}
            className="relative p-1.5 rounded-lg hover:bg-[#1A1D24] text-[#8A8F9E] hover:text-[#F0F2F5] transition-colors duration-200"
            aria-label="View notifications (3 unread)"
            title="Notifications"
            aria-expanded={showNotifications}
            data-ocid="topnav.notifications_button"
          >
            <Bell className="w-4 h-4" />
            <span
              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#EF4444] text-[9px] font-bold text-white flex items-center justify-center"
              aria-hidden="true"
            >
              3
            </span>
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 top-full mt-2 w-72 bg-[#1A1D24] border border-[#2A2D36] rounded-xl shadow-2xl z-50 overflow-hidden"
              role="menu"
              aria-label="Notifications panel"
              data-ocid="topnav.notifications_dropdown"
            >
              <div className="px-3 py-2.5 border-b border-[#2A2D36] flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#F0F2F5]">
                  Notifications
                </span>
                <span className="text-[10px] text-[#3B82F6] font-medium">
                  3 unread
                </span>
              </div>
              {mockNotifications.map((n) => (
                <div
                  key={n.id}
                  className="px-3 py-2.5 hover:bg-[#2A2D36] transition-colors border-b border-[#2A2D36]/50 last:border-0"
                >
                  <div className="flex items-start gap-2">
                    {n.unread && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 flex-shrink-0"
                        aria-label="Unread"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-[#F0F2F5] leading-snug">
                        {n.text}
                      </p>
                      <p className="text-[11px] text-[#4A4F5C] mt-0.5">
                        {n.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="px-3 py-2 border-t border-[#2A2D36]">
                <button
                  type="button"
                  className="text-[11px] text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
                  aria-label="Mark all notifications as read"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={onThemeToggle}
          className="p-1.5 rounded-lg hover:bg-[#1A1D24] text-[#8A8F9E] hover:text-[#F0F2F5] transition-colors duration-200"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          data-ocid="topnav.theme_toggle"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
