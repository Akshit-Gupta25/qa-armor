import type { RunStatus } from "@/data/mockData";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";

interface FailedTest {
  name: string;
  error: string;
}

const MOCK_FAILED_TESTS: Record<string, FailedTest[]> = {
  "run-0003": [
    {
      name: "auth.login.should_reject_invalid_credentials",
      error:
        "Expected 401, received 200. Token was issued for malformed payload.",
    },
    {
      name: "auth.session.should_expire_after_timeout",
      error:
        "Timeout waiting for session expiry event. Async handler not called within 5000ms.",
    },
    {
      name: "auth.2fa.should_require_totp_on_login",
      error:
        "AssertionError: expected element '#totp-input' to exist but found null.",
    },
  ],
  "run-0008": [
    {
      name: "cart.items.should_update_quantity",
      error:
        "TypeError: Cannot read properties of undefined (reading 'quantity'). Cart state was null.",
    },
    {
      name: "cart.checkout.should_apply_coupon_discount",
      error:
        "Expected total 79.99, received 89.99. Discount not applied after coupon validation.",
    },
  ],
  "run-0013": [
    {
      name: "payment.stripe.should_handle_declined_card",
      error:
        "UnhandledPromiseRejection: Stripe charge failed with code card_declined. No error boundary caught.",
    },
    {
      name: "payment.3ds.should_complete_challenge_flow",
      error:
        "Timeout: 3DS modal did not appear within 3000ms. Possible race condition in iframe loader.",
    },
    {
      name: "payment.webhook.should_update_order_on_success",
      error:
        "WebhookSignatureVerificationError: computed signature does not match header value.",
    },
    {
      name: "payment.refund.should_process_partial_refund",
      error:
        "AssertionError: expected status 'refunded', received 'pending'. Async job not completed.",
    },
  ],
  "run-0018": [
    {
      name: "search.filters.should_persist_on_page_change",
      error:
        "Expected URL to contain '?filter=electronics', found '?'. Filter state lost on navigation.",
    },
    {
      name: "search.results.should_sort_by_price_asc",
      error:
        "AssertionError: first item price 249.99 > second item price 19.99. Sort order incorrect.",
    },
  ],
  "run-0023": [
    {
      name: "dashboard.charts.should_render_area_chart",
      error:
        "ReferenceError: ResizeObserver is not defined. Missing polyfill in test environment.",
    },
    {
      name: "dashboard.kpi.should_show_correct_totals",
      error:
        "Expected 2847, received 2834. Stale cache not invalidated after run completion.",
    },
  ],
};

function getFailedTests(runId: string, index: number): FailedTest[] {
  if (MOCK_FAILED_TESTS[runId]) return MOCK_FAILED_TESTS[runId];
  const count = 2 + (index % 3);
  return Array.from({ length: count }, (_, i) => ({
    name: `suite.component.test_case_${String(i + 1).padStart(3, "0")}_should_pass_assertion`,
    error: [
      "AssertionError: expected value to equal expected but got actual. Check mock data alignment.",
      "TimeoutError: operation timed out after 5000ms. Network stub may not have been applied.",
      "TypeError: Cannot read properties of undefined (reading 'data'). API response was null.",
      "ReferenceError: element '#submit-btn' not found in DOM. Selector may have changed.",
    ][i % 4],
  }));
}

interface RunExpandedRowProps {
  runId: string;
  runIndex: number;
  status: RunStatus;
  colSpan: number;
}

export function RunExpandedRow({
  runId,
  runIndex,
  status,
  colSpan,
}: RunExpandedRowProps) {
  const failedTests = getFailedTests(runId, runIndex);

  return (
    <tr>
      <td colSpan={colSpan} className="p-0">
        <div className="px-6 py-4 bg-[#0A0B0D] border-t border-[#2A2D36]">
          {status === "RUNNING" && (
            <div className="flex items-center gap-3 text-[#3B82F6] text-[13px]">
              <Loader2 size={16} className="animate-spin" />
              <span>
                Test run in progress — results will appear when complete…
              </span>
            </div>
          )}

          {status === "PASSED" && (
            <div className="flex items-center gap-3 text-[#10B981] text-[13px]">
              <CheckCircle2 size={16} />
              <span>
                All tests passed ✓ — no failures detected in this run.
              </span>
            </div>
          )}

          {(status === "FAILED" || status === "FLAKY") && (
            <div className="space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#4A4F5C] mb-3">
                Failed Tests ({failedTests.length})
              </p>
              <div className="space-y-2">
                {failedTests.map((test, i) => (
                  <div
                    key={test.name}
                    data-ocid={`runs.failed_test.item.${i + 1}`}
                    className="flex items-start gap-4 p-3 rounded-lg bg-[#111318] border border-[#2A2D36] hover:border-[#EF4444]/30 transition-hover group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[12px] text-[#F0F2F5] truncate">
                        {test.name}
                      </p>
                      <p className="text-[12px] text-[#EF4444]/80 mt-0.5 truncate">
                        {test.error}
                      </p>
                    </div>
                    <button
                      type="button"
                      data-ocid={`runs.view_trace_button.${i + 1}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-medium text-[#8A8F9E] border border-[#2A2D36] hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-hover flex-shrink-0 opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink size={12} />
                      View Trace
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
