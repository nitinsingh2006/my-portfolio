"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Loader2 } from "lucide-react";

export function ResumeActions() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    // On desktop/laptops, window.print() → "Save as PDF" is native & reliable.
    // On mobile browsers, window.print() is buggy or absent — so we open the
    // resume page in a new tab with a print-trigger query so the user gets the
    // browser print dialog (which on modern iOS/Android does offer "Save as PDF").
    // Additionally, we add a slight delay to let mobile browsers settle.

    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      // On mobile: open a clean print-friendly version
      setDownloading(true);
      try {
        // Small delay so the UI shows the loading state
        await new Promise((r) => setTimeout(r, 200));
        // Trigger print — on most mobile browsers this opens "Share" or "Print"
        // which allows saving as PDF
        window.print();
      } finally {
        setTimeout(() => setDownloading(false), 1000);
      }
    } else {
      window.print();
    }
  };

  return (
    <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to portfolio
      </Link>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading ? "Preparing…" : "Download PDF"}
        </button>
      </div>
    </div>
  );
}
