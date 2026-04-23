import { Layout } from "@/components/layout/Layout";
import AIInsights from "@/pages/AIInsights";
import BugReports from "@/pages/BugReports";
import Dashboard from "@/pages/Dashboard";
import TestRuns from "@/pages/TestRuns";
import TestSuites from "@/pages/TestSuites";
import { useState } from "react";
import { Toaster } from "sonner";

type Page =
  | "dashboard"
  | "suites"
  | "runs"
  | "bugs"
  | "coverage"
  | "insights"
  | "integrations"
  | "settings";

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
    default:
      return (
        <div className="flex items-center justify-center h-full text-[#8A8F9E] text-[14px]">
          {page.charAt(0).toUpperCase() + page.slice(1)} — coming soon
        </div>
      );
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
