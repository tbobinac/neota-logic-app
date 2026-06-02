import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DailyPollution } from "@/lib/airQuality";
import { formatTableShortDate } from "@/lib/date";
import { avg, round } from "@/lib/math";
import { cn } from "@/lib/utils";

const BLOCKS = [
  { label: "0-4", hours: [0, 1, 2, 3] },
  { label: "4-8", hours: [4, 5, 6, 7] },
  { label: "8-12", hours: [8, 9, 10, 11] },
  { label: "12-16", hours: [12, 13, 14, 15] },
  { label: "16-20", hours: [16, 17, 18, 19] },
  { label: "20-24", hours: [20, 21, 22, 23] },
];

interface AirQualityBlockTableProps {
  rows: DailyPollution[];
}

export const AirQualityBlockTable = ({ rows }: AirQualityBlockTableProps) => {
  const blockRows = rows.map((row) => ({
    date: row.date,
    blocks: BLOCKS.map((b) => round(avg(b.hours.map((h) => row.hourly[h])))),
  }));

  const allBlockValues = blockRows.flatMap((r) => r.blocks);
  const min = Math.min(...allBlockValues);
  const max = Math.max(...allBlockValues);

  return (
    <Table
      containerClassName="max-h-[600px] rounded-2xl border bg-card shadow-sm"
      className="table-fixed"
    >
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="sticky top-0 z-10 border-b border-border bg-card shadow-[inset_0_-1px_0_0_var(--border)] font-semibold text-foreground">
            Date
          </TableHead>
          {BLOCKS.map((b) => (
            <TableHead
              key={b.label}
              className="sticky top-0 z-10 border-b border-border bg-card shadow-[inset_0_-1px_0_0_var(--border)] text-center font-normal text-muted-foreground"
            >
              {b.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {blockRows.map((row, i) => (
          <TableRow key={row.date} className={i % 2 ? "bg-muted/30" : ""}>
            <TableCell className="whitespace-nowrap font-semibold">
              {formatTableShortDate(row.date)}
            </TableCell>
            {row.blocks.map((v, idx) => {
              const isMin = v === min;
              const isMax = v === max;
              return (
                <TableCell key={idx} className="p-1.5 text-center tabular-nums">
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-lg py-1",
                      isMin && "bg-emerald-600 font-semibold text-white",
                      isMax && "bg-red-600 font-semibold text-white",
                    )}
                  >
                    {v}
                  </span>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
