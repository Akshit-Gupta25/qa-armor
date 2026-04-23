import { Layout } from "@/components/layout/Layout";
import AIInsights from "@/pages/AIInsights";
import BugReports from "@/pages/BugReports";
import CodeAnalysis from "@/pages/CodeAnalysis";
import Dashboard from "@/pages/Dashboard";
import TestRuns from "@/pages/TestRuns";
import TestSuites from "@/pages/TestSuites";
import { Construction, MapPinned, Plug, Settings2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";

type Page =
  | "dashboard"
  | "suites"
  | "runs"
  | "bugs"
  | "coverage"
  | "insights"
  | "analysis"
  | "integrations"
  | "settings";

const comingSoonMeta: Record<
  string,
  { icon: LucideIcon; title: string; description: string; eta?: string }
> = {
  coverage: {
    icon: MapPinned,
    title: "Coverage Map",
    description:
      "A visual, drill-down map of your test coverage broken down by feature area, file, and branch. See exactly which parts of your codebase are well-tested and which need attention.",
    eta: "Coming in Q3 2026",
  },
  integrations: {
    icon: Plug,
    title: "Integrations",
    description:
      "Connect QA Armor to your CI/CD pipeline, Slack workspace, Jira board, and GitHub repository. Get test failure alerts where your team already works.",
    eta: "Coming in Q3 2026",
  },
  settings: {
    icon: Settings2,
    title: "Settings",
    description:
      "Configure notification thresholds, manage team members, set up project-level rules, and customize your QA Armor experience.",
    eta: "Coming in Q4 2026",
  },
};

function ComingSoonPage({ pageKey }: { pageKey: string }) {
  const meta = comingSoonMeta[pageKey] ?? {
    icon: Construction,
    title: (pageKey.charAt(0).toUpperCase() + pageKey.slice(1)).replace(
      /-/g,
      " ",
    ),
    description: "This feature is currently being built. Check back soon!",
  };
  const Icon = meta.icon;

  return (
    <div
      className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6 text-center px-6"
      data-ocid={`${pageKey}.coming_soon`}
    >
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.18)",
        }}
      >
        <Icon className="w-7 h-7 text-[#3B82F6]" />
      </div>

      {/* Text */}
      <div className="space-y-2 max-w-md">
        <h2 className="text-[20px] font-semibold text-[#F0F2F5]">
          {meta.title}
        </h2>
        <p className="text-[14px] text-[#8A8F9E] leading-relaxed">
          {meta.description}
        </p>
      </div>

      {/* ETA badge */}
      {meta.eta && (
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium"
          style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.2)",
            color: "#3B82F6",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"
            aria-hidden="true"
          />
          {meta.eta}
        </span>
      )}
    </div>
  );
}

function PageContent({
  page,
  onNavigate,
}: {
  page: Page;
  onNavigate: (p: string) => void;
}) {
  switch (page) {
    case "dashboard":
      return <Dashboard onNavigate={onNavigate} />;
    case "suites":
      return <TestSuites />;
    case "runs":
      return <TestRuns />;
    case "bugs":
      return <BugReports />;
    case "insights":
      return <AIInsights />;
    case "analysis":
      return <CodeAnalysis />;
    default:
      return <ComingSoonPage pageKey={page} />;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  return (
    <div className="dark">
      <Layout
        currentPage={currentPage}
        onNavigate={(p) => setCurrentPage(p as Page)}
      >
        <PageContent
          page={currentPage}
          onNavigate={(p) => setCurrentPage(p as Page)}
        />
      </Layout>
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1A1D24",
            border: "1px solid #2A2D36",
            color: "#F0F2F5",
          },
        }}
      />
    </div>
  );
}
