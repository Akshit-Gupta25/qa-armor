// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
}

export const projects: Project[] = [
  { id: "proj-1", name: "E-Commerce App" },
  { id: "proj-2", name: "Mobile App" },
  { id: "proj-3", name: "API Service" },
  { id: "proj-4", name: "Admin Panel" },
  { id: "proj-5", name: "Landing Page" },
];

// ─── Test Suites ──────────────────────────────────────────────────────────────
export type SuiteType = "E2E" | "Unit" | "Integration" | "Visual";
export type RunStatus = "PASSED" | "FAILED" | "RUNNING" | "FLAKY" | "SKIPPED";

export interface TestSuite {
  id: string;
  projectId: string;
  name: string;
  type: SuiteType;
  totalTests: number;
  passing: number;
  failing: number;
  lastRunStatus: RunStatus;
  lastRunTime: string;
  tags: string[];
}

const suiteTemplates: Array<{ name: string; type: SuiteType; tags: string[] }> =
  [
    { name: "Authentication Flow", type: "E2E", tags: ["staging", "CI"] },
    { name: "User Registration", type: "E2E", tags: ["production", "CI"] },
    { name: "Shopping Cart Logic", type: "Unit", tags: ["CI"] },
    { name: "Payment Gateway", type: "Integration", tags: ["staging"] },
    { name: "Product Search", type: "E2E", tags: ["production", "staging"] },
    { name: "Order Management", type: "Integration", tags: ["CI", "staging"] },
    { name: "UI Regression", type: "Visual", tags: ["staging"] },
    { name: "API Endpoints", type: "Integration", tags: ["CI"] },
    { name: "Dashboard Components", type: "Unit", tags: ["CI", "production"] },
    { name: "Checkout Flow", type: "E2E", tags: ["production"] },
    {
      name: "Email Notifications",
      type: "Integration",
      tags: ["staging", "CI"],
    },
    { name: "Mobile Responsiveness", type: "Visual", tags: ["staging"] },
  ];

const statuses: RunStatus[] = [
  "PASSED",
  "FAILED",
  "RUNNING",
  "FLAKY",
  "PASSED",
  "PASSED",
];
const times = [
  "2 hours ago",
  "5 minutes ago",
  "1 day ago",
  "3 hours ago",
  "30 minutes ago",
  "Yesterday",
];

export const testSuites: TestSuite[] = projects.flatMap((proj, pi) =>
  suiteTemplates.map((t, si) => {
    const total = 20 + ((pi * 7 + si * 3) % 80);
    const failing = (pi + si) % 5 === 0 ? 3 + (si % 4) : si % 7 === 0 ? 1 : 0;
    return {
      id: `suite-${proj.id}-${si + 1}`,
      projectId: proj.id,
      name: t.name,
      type: t.type,
      totalTests: total,
      passing: total - failing,
      failing,
      lastRunStatus: statuses[(pi + si) % statuses.length],
      lastRunTime: times[(pi + si) % times.length],
      tags: t.tags,
    };
  }),
);

// ─── Test Runs ────────────────────────────────────────────────────────────────
export interface TestRun {
  id: string;
  suiteId: string;
  suiteName: string;
  branch: string;
  status: RunStatus;
  totalTests: number;
  passedTests: number;
  duration: string;
  coveragePercent: number;
  triggeredBy: string;
  startedAt: string;
}

const branches = [
  "main",
  "develop",
  "feature/auth",
  "fix/cart-bug",
  "release/v2.1",
  "hotfix/payment",
];
const triggers = [
  "GitHub Actions",
  "Manual",
  "Scheduled",
  "PR Trigger",
  "Webhook",
];
const runStatuses: RunStatus[] = [
  "PASSED",
  "PASSED",
  "FAILED",
  "RUNNING",
  "FLAKY",
  "PASSED",
  "PASSED",
  "FAILED",
  "FLAKY",
  "PASSED",
];

export const testRuns: TestRun[] = Array.from({ length: 50 }, (_, i) => {
  const suite = testSuites[i % testSuites.length];
  const total = suite.totalTests;
  const status = runStatuses[i % runStatuses.length];
  const passed =
    status === "PASSED"
      ? total
      : status === "FAILED"
        ? total - 3 - (i % 5)
        : total - 1;
  const mins = 1 + (i % 8);
  const secs = (i * 17) % 60;
  const daysAgo = Math.floor(i / 5);
  const hoursAgo = (i % 5) * 4;
  return {
    id: `run-${String(i + 1).padStart(4, "0")}`,
    suiteId: suite.id,
    suiteName: suite.name,
    branch: branches[i % branches.length],
    status,
    totalTests: total,
    passedTests: Math.max(0, passed),
    duration: `${mins}m ${secs}s`,
    coveragePercent: 60 + ((i * 7) % 35),
    triggeredBy: triggers[i % triggers.length],
    startedAt: daysAgo === 0 ? `${hoursAgo + 1}h ago` : `${daysAgo}d ago`,
  };
});

// ─── Bug Reports ──────────────────────────────────────────────────────────────
export type Priority = "P0" | "P1" | "P2" | "P3";
export type BugStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export interface BugReport {
  id: string;
  priority: Priority;
  status: BugStatus;
  title: string;
  affectedTest: string;
  firstSeen: string;
  occurrences: number;
  assignee: { name: string; initials: string };
  tags: { browser: string; environment: string };
}

const bugTitles = [
  "Login page crashes on Safari 16",
  "Payment fails with 3DS cards",
  "Cart item count shows NaN",
  "Search results pagination broken",
  "Profile image upload timeout",
  "Checkout form validation skipped",
  "Dashboard chart flickers on resize",
  "Email confirmation not sent",
  "Order history shows wrong user",
  "Mobile nav menu unresponsive",
  "Product filter resets on scroll",
  "Coupon code validation errors",
  "API rate limit not respected",
  "Session expires too early",
  "2FA setup wizard broken",
  "Invoice PDF generation fails",
  "Address autocomplete missing",
  "Password reset email delayed",
  "Notification preferences reset",
  "Export CSV truncates data",
  "Dark mode flickers on load",
  "Admin role permissions leak",
  "Search index stale after update",
  "Webhook delivery retries fail",
  "GraphQL N+1 query performance",
  "Image CDN cache busting broken",
  "Redis session store disconnects",
  "Stripe webhook signature mismatch",
  "OAuth token refresh race condition",
  "Database connection pool exhausted",
];

const assignees = [
  { name: "Alex Johnson", initials: "AJ" },
  { name: "Sam Lee", initials: "SL" },
  { name: "Maria Garcia", initials: "MG" },
  { name: "David Chen", initials: "DC" },
  { name: "Emma Wilson", initials: "EW" },
];

const browsers = ["Chrome", "Firefox", "Safari", "Edge", "Chrome Mobile"];
const environments = ["production", "staging", "QA", "develop"];
const bugStatuses: BugStatus[] = [
  "OPEN",
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
  "OPEN",
  "IN_PROGRESS",
];
const priorities: Priority[] = [
  "P0",
  "P1",
  "P1",
  "P2",
  "P2",
  "P3",
  "P3",
  "P2",
  "P1",
  "P0",
];

export const bugReports: BugReport[] = bugTitles.map((title, i) => ({
  id: `bug-${String(i + 1).padStart(3, "0")}`,
  priority: priorities[i % priorities.length],
  status: bugStatuses[i % bugStatuses.length],
  title,
  affectedTest: testSuites[i % testSuites.length].name,
  firstSeen: `${1 + (i % 14)} days ago`,
  occurrences: 1 + ((i * 13) % 200),
  assignee: assignees[i % assignees.length],
  tags: {
    browser: browsers[i % browsers.length],
    environment: environments[i % environments.length],
  },
}));

// ─── Time-series Data ─────────────────────────────────────────────────────────
export interface TimeSeriesPoint {
  date: string;
  passed: number;
  failed: number;
}

export const timeSeriesData: TimeSeriesPoint[] = Array.from(
  { length: 14 },
  (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const passed = 180 + Math.floor(Math.sin(i * 0.8) * 30) + i * 4;
    const failed =
      5 + Math.floor(Math.cos(i * 1.2) * 8) + (i % 3 === 0 ? 12 : 0);
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      passed,
      failed,
    };
  },
);

// ─── AI Insights ──────────────────────────────────────────────────────────────
export type InsightCategory =
  | "Flakiness"
  | "Coverage Gaps"
  | "Performance"
  | "Security"
  | "Accessibility";
export type InsightSeverity = "critical" | "warning" | "info";

export interface AIInsight {
  id: string;
  category: InsightCategory;
  severity: InsightSeverity;
  title: string;
  explanation: string;
  affectedTests: string[];
  suggestedFix: string;
  confidence: number;
}

export const aiInsights: AIInsight[] = [
  {
    id: "insight-1",
    category: "Flakiness",
    severity: "critical",
    title: "Login flow flakiness increased 34%",
    explanation:
      "The authentication test suite shows a 34% increase in non-deterministic failures over the last 7 days, likely due to timing issues in async token refresh.",
    affectedTests: [
      "Authentication Flow",
      "User Registration",
      "Session Management",
    ],
    suggestedFix:
      "Add explicit wait conditions for token refresh completion and increase assertion timeouts from 2s to 5s.",
    confidence: 87,
  },
  {
    id: "insight-2",
    category: "Coverage Gaps",
    severity: "warning",
    title: "Payment error paths have 0% E2E coverage",
    explanation:
      "Critical payment failure scenarios (declined cards, network timeouts, 3DS challenges) have no end-to-end test coverage, creating a risk surface for production incidents.",
    affectedTests: ["Payment Gateway", "Checkout Flow"],
    suggestedFix:
      "Add E2E tests for Stripe test cards: 4000000000000002 (declined), 4000002760003184 (3DS required).",
    confidence: 94,
  },
  {
    id: "insight-3",
    category: "Performance",
    severity: "warning",
    title: "Search suite avg duration up 2.1× this week",
    explanation:
      "Product search tests are taking an average of 4.3 seconds, up from 2.1 seconds last week. Correlates with a recent Elasticsearch index configuration change.",
    affectedTests: ["Product Search", "API Endpoints"],
    suggestedFix:
      "Profile the Elasticsearch query plan for the product search endpoint. Consider adding a composite index on (category, price, available).",
    confidence: 79,
  },
  {
    id: "insight-4",
    category: "Security",
    severity: "critical",
    title: "Auth bypass possible in role-check middleware",
    explanation:
      "Static analysis detected a condition where expired JWT tokens with malformed signatures pass the role validation middleware when the 'guest' role flag is set.",
    affectedTests: ["Authentication Flow", "Admin Role Tests"],
    suggestedFix:
      "Validate token signature before role extraction. Add explicit test cases for expired tokens with each role type.",
    confidence: 91,
  },
  {
    id: "insight-5",
    category: "Accessibility",
    severity: "info",
    title: "11 components missing ARIA labels",
    explanation:
      "Automated accessibility scans found 11 interactive components (buttons, form fields, modals) that lack proper ARIA labels, failing WCAG 2.1 AA compliance.",
    affectedTests: ["UI Regression", "Dashboard Components"],
    suggestedFix:
      "Add aria-label attributes to all icon-only buttons. Ensure all form inputs are associated with visible label elements.",
    confidence: 98,
  },
];

// ─── Coverage Heatmap ─────────────────────────────────────────────────────────
export interface CoverageRow {
  feature: string;
  unit: number;
  integration: number;
  e2e: number;
  visual: number;
  performance: number;
}

export const coverageData: CoverageRow[] = [
  {
    feature: "Auth",
    unit: 92,
    integration: 78,
    e2e: 85,
    visual: 60,
    performance: 45,
  },
  {
    feature: "Checkout",
    unit: 88,
    integration: 70,
    e2e: 72,
    visual: 40,
    performance: 30,
  },
  {
    feature: "Dashboard",
    unit: 75,
    integration: 55,
    e2e: 48,
    visual: 80,
    performance: 20,
  },
  {
    feature: "API",
    unit: 95,
    integration: 90,
    e2e: 35,
    visual: 10,
    performance: 65,
  },
  {
    feature: "Search",
    unit: 80,
    integration: 62,
    e2e: 58,
    visual: 25,
    performance: 40,
  },
  {
    feature: "Profile",
    unit: 70,
    integration: 45,
    e2e: 30,
    visual: 55,
    performance: 15,
  },
  {
    feature: "Payments",
    unit: 85,
    integration: 75,
    e2e: 0,
    visual: 5,
    performance: 50,
  },
];

// ─── Status Breakdown (for pie chart) ────────────────────────────────────────
export const statusBreakdown = [
  { name: "Passed", value: 2401, color: "#10B981" },
  { name: "Failed", value: 142, color: "#EF4444" },
  { name: "Flaky", value: 198, color: "#F59E0B" },
  { name: "Skipped", value: 106, color: "#4A4F5C" },
];

// ─── Bug Prediction (Code Analysis) ──────────────────────────────────────────
export type BugSeverity = "critical" | "high" | "medium" | "low";
export type BugCategory = "security" | "performance" | "quality" | "logic";

export interface BugPrediction {
  id: string;
  file: string;
  line: number;
  severity: BugSeverity;
  type: string;
  message: string;
  confidence: number;
  category: BugCategory;
}

export const mockBugPredictions: BugPrediction[] = [
  {
    id: "pred-001",
    file: "src/auth/middleware.ts",
    line: 47,
    severity: "critical",
    type: "SQL Injection",
    message:
      "Unsanitized user input interpolated directly into SQL query string. Attacker can manipulate query logic.",
    confidence: 96,
    category: "security",
  },
  {
    id: "pred-002",
    file: "src/api/payments.ts",
    line: 112,
    severity: "critical",
    type: "Race Condition",
    message:
      "Concurrent payment requests share mutable transaction state without mutex. May cause double-charge or data corruption.",
    confidence: 89,
    category: "logic",
  },
  {
    id: "pred-003",
    file: "src/components/UserProfile.tsx",
    line: 83,
    severity: "high",
    type: "XSS Vulnerability",
    message:
      "dangerouslySetInnerHTML used with unescaped user-controlled data. Allows script injection from malicious profiles.",
    confidence: 92,
    category: "security",
  },
  {
    id: "pred-004",
    file: "src/utils/dataFetcher.ts",
    line: 34,
    severity: "high",
    type: "Memory Leak",
    message:
      "Event listener registered in useEffect without cleanup return. Listeners accumulate on each component mount.",
    confidence: 84,
    category: "performance",
  },
  {
    id: "pred-005",
    file: "src/hooks/useSearch.ts",
    line: 22,
    severity: "medium",
    type: "N+1 Query",
    message:
      "Database query inside a loop iterates over each result to fetch related records. Use JOIN or batch fetch instead.",
    confidence: 78,
    category: "performance",
  },
  {
    id: "pred-006",
    file: "src/services/emailService.ts",
    line: 67,
    severity: "medium",
    type: "Error Swallowing",
    message:
      "catch block silently discards error without logging or re-throwing. Email failures will go undetected in production.",
    confidence: 88,
    category: "quality",
  },
  {
    id: "pred-007",
    file: "src/pages/Checkout.tsx",
    line: 145,
    severity: "medium",
    type: "Unhandled Promise",
    message:
      "async function call not awaited and rejection not caught. Payment confirmation may silently fail.",
    confidence: 81,
    category: "logic",
  },
  {
    id: "pred-008",
    file: "src/components/DataTable.tsx",
    line: 201,
    severity: "low",
    type: "Prop Type Mismatch",
    message:
      "Component accepts `items` as any[], but downstream code assumes typed shape. May cause runtime errors with unexpected data.",
    confidence: 71,
    category: "quality",
  },
];

export interface AnalysisReport {
  riskScore: number;
  totalBugs: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  duration: string;
  analyzedFiles: number;
  predictions: BugPrediction[];
  recommendations: string[];
}

export function generateAnalysisReport(
  inputType: "github" | "url" | "code",
): AnalysisReport {
  const durations: Record<"github" | "url" | "code", string> = {
    github: "4.7s",
    url: "2.3s",
    code: "1.1s",
  };
  const fileCounts: Record<"github" | "url" | "code", number> = {
    github: 38,
    url: 12,
    code: 1,
  };

  const critical = mockBugPredictions.filter(
    (p) => p.severity === "critical",
  ).length;
  const high = mockBugPredictions.filter((p) => p.severity === "high").length;
  const medium = mockBugPredictions.filter(
    (p) => p.severity === "medium",
  ).length;
  const low = mockBugPredictions.filter((p) => p.severity === "low").length;

  return {
    riskScore: inputType === "github" ? 74 : inputType === "url" ? 58 : 42,
    totalBugs: mockBugPredictions.length,
    criticalCount: critical,
    highCount: high,
    mediumCount: medium,
    lowCount: low,
    duration: durations[inputType],
    analyzedFiles: fileCounts[inputType],
    predictions: mockBugPredictions,
    recommendations: [
      "Sanitize all user inputs before passing to database queries — use parameterized statements.",
      "Audit all useEffect hooks for missing cleanup functions to prevent memory leaks.",
      "Replace dangerouslySetInnerHTML with DOMPurify or safe rendering alternatives.",
      "Add global Promise rejection handler and structured error logging via Sentry.",
      "Batch database calls using DataLoader pattern to eliminate N+1 query anti-patterns.",
      "Introduce TypeScript strict mode and replace all `any` types with explicit interfaces.",
    ],
  };
}
