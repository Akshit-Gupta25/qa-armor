import { projects } from "@/data/mockData";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

interface LayoutProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

export function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Apply dark class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Close mobile menu on navigate
  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const activeProject = projects[0];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0B0D]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0 h-full">
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((v) => !v)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
          />
          <div className="relative flex-shrink-0 h-full">
            <Sidebar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              isCollapsed={false}
              onToggle={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav
          currentPage={currentPage}
          projectName={activeProject.name}
          onMenuToggle={() => setMobileOpen(true)}
          isDark={isDark}
          onThemeToggle={() => setIsDark((v) => !v)}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
