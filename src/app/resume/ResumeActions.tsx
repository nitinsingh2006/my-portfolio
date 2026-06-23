"use client";

import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";

export function ResumeActions() {
  const handlePrint = () => {
    window.print();
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
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
        <a
          href="/Nitin_Singh_Resume.pdf"
          download="Nitin_Singh_Resume.pdf"
          className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>
    </div>
  );
}
