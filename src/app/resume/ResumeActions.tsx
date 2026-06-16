"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export function ResumeActions() {
  return (
    <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to portfolio
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
      >
        <Printer className="h-4 w-4" />
        Download PDF
      </button>
    </div>
  );
}
