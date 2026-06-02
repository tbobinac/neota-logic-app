import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DailyPollution } from "@/lib/airQuality";
import { formatTableDate } from "@/lib/date";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 24 }, (_, h) => h);

interface AirQualityTableProps {
  rows: DailyPollution[];
  min: number;
  max: number;
}

export const AirQualityTable = ({ rows, min, max }: AirQualityTableProps) => {
  return (
    <Table containerClassName="max-h-[calc(100svh-24rem)] min-h-[20rem] rounded-2xl border bg-card shadow-sm">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="sticky top-0 z-10 border-b border-border bg-card shadow-[inset_0_-1px_0_0_var(--border)] font-semibold text-foreground">
            Date
          </TableHead>
          {HOURS.map((h) => (
            <TableHead
              key={h}
              className="sticky top-0 z-10 border-b border-border bg-card shadow-[inset_0_-1px_0_0_var(--border)] text-center font-normal text-muted-foreground"
            >
              {String(h).padStart(2, "0")}h
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={row.date} className={i % 2 ? "bg-muted/30" : ""}>
            <TableCell className="whitespace-nowrap font-semibold">
              {formatTableDate(row.date)}
            </TableCell>
            {row.hourly.map((v, h) => {
              const isMin = v === min;
              const isMax = v === max;
              return (
                <TableCell key={h} className="p-1.5 text-center tabular-nums">
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
