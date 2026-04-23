import { projects } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  Bug,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FlaskConical,
  LayoutDashboard,
  Map as MapIcon,
  Play,
  Plug,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "suites", label: "Test Suites", icon: FlaskConical },
  { id: "runs", label: "Test Runs", icon: Play },
  { id: "bugs", label: "Bug Reports", icon: Bug },
  { id: "coverage", label: "Coverage Map", icon: MapIcon },
  { id: "insights", label: "AI Insights", icon: Sparkles, badge: "NEW" },
  { id: "analysis", label: "Code Analysis", icon: ShieldAlert, badge: "BETA" },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({
  currentPage,
  onNavigate,
  isCollapsed,
  onToggle,
}: SidebarProps) {
  const [activeProjectId, setActiveProjectId] = useState("proj-1");
  const [showProjectMenu, setShowProjectMenu] = useState(false);

  const activeProject =
    projects.find((p) => p.id === activeProjectId) ?? projects[0];

  return (
    <aside
      className={cn(
        "flex-shrink-0 flex flex-col h-full border-r border-[#2A2D36] bg-[#111318] transition-all duration-300",
        isCollapsed ? "w-14" : "w-60",
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-3 border-b border-[#2A2D36] flex-shrink-0">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-[#3B82F6]" />
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-[#F0F2F5] text-sm tracking-wide truncate">
              QA Armor
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="ml-auto p-1 rounded hover:bg-[#1A1D24] text-[#8A8F9E] hover:text-[#F0F2F5] transition-colors duration-200 flex-shrink-0"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-ocid="sidebar.toggle"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Project Selector */}
      {!isCollapsed && (
        <div className="px-3 py-2 border-b border-[#2A2D36] relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setShowProjectMenu((v) => !v)}
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg bg-[#1A1D24] hover:bg-[#2A2D36] transition-colors duration-200 text-left"
            data-ocid="sidebar.project_select"
          >
            <span className="text-[13px] font-medium text-[#F0F2F5] truncate">
              {activeProject.name}
            </span>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-[#8A8F9E] flex-shrink-0 transition-transform duration-200",
                showProjectMenu && "rotate-180",
              )}
            />
          </button>
          {showProjectMenu && (
            <div className="absolute left-3 right-3 top-full mt-1 z-50 bg-[#1A1D24] border border-[#2A2D36] rounded-lg shadow-xl overflow-hidden">
              {projects.map((proj) => (
                <button
                  type="button"
                  key={proj.id}
                  onClick={() => {
                    setActiveProjectId(proj.id);
                    setShowProjectMenu(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-[13px] transition-colors duration-150",
                    proj.id === activeProjectId
                      ? "text-[#3B82F6] bg-[#3B82F6]/10"
                      : "text-[#F0F2F5] hover:bg-[#2A2D36]",
                  )}
                >
                  {proj.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={isCollapsed ? item.label : undefined}
              data-ocid={`sidebar.nav.${item.id}`}
              className={cn(
                "w-full flex items-center gap-3 px-2.5 py-2 rounded-lg mb-0.5 text-left transition-all duration-200",
                isActive
                  ? "bg-[#1A1D24] text-[#3B82F6] border-l-2 border-[#3B82F6] pl-[9px]"
                  : "text-[#8A8F9E] hover:bg-[#1A1D24] hover:text-[#F0F2F5]",
                isCollapsed && "justify-center",
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="text-[13px] font-medium flex-1 truncate">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded",
                        item.badge === "BETA"
                          ? "bg-[#8B5CF6]/20 text-[#8B5CF6]"
                          : "bg-[#3B82F6]/20 text-[#3B82F6]",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="flex-shrink-0 border-t border-[#2A2D36] p-3 space-y-2">
        {!isCollapsed && (
          <>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#3B82F6]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] font-semibold text-[#3B82F6]">
                  AJ
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-medium text-[#F0F2F5] truncate">
                    Alex Johnson
                  </span>
                  <span className="text-[9px] font-semibold uppercase px-1 py-0.5 rounded bg-[#8B5CF6]/20 text-[#8B5CF6]">
                    Pro
                  </span>
                </div>
              </div>
            </div>
            <a
              href="https://caffeine.ai"
              className="flex items-center gap-1.5 text-[12px] text-[#8A8F9E] hover:text-[#F0F2F5] transition-colors duration-200"
              data-ocid="sidebar.help_link"
            >
              <ExternalLink className="w-3 h-3" />
              Help &amp; Docs
            </a>
          </>
        )}
        {isCollapsed && (
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded-full bg-[#3B82F6]/30 flex items-center justify-center">
              <span className="text-[11px] font-semibold text-[#3B82F6]">
                AJ
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
