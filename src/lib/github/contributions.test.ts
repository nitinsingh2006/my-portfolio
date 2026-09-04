import test from "node:test";
import assert from "node:assert/strict";

type TestDay = { date: string; count: number };

test("Chronological Date Sorting", () => {
  const unsorted: TestDay[] = [
    { date: "2026-05-10", count: 2 },
    { date: "2025-08-31", count: 0 },
    { date: "2026-01-01", count: 5 },
  ];

  const sorted = [...unsorted].sort((a, b) => a.date.localeCompare(b.date));

  assert.equal(sorted[0].date, "2025-08-31");
  assert.equal(sorted[1].date, "2026-01-01");
  assert.equal(sorted[2].date, "2026-05-10");
});

test("Summation of Daily Contribution Counts", () => {
  const days: TestDay[] = [
    { date: "2026-01-01", count: 4 },
    { date: "2026-01-02", count: 1 },
    { date: "2026-01-03", count: 0 },
    { date: "2026-01-04", count: 10 },
  ];

  const total = days.reduce((sum, d) => sum + d.count, 0);

  assert.equal(total, 15);
});
