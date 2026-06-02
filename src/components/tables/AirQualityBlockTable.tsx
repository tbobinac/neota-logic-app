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
      containerClassName="max-h-[600px] rounded-lg border"
      className="table-fixed"
    >
      <TableHeader>
        <TableRow>
          <TableHead className="sticky top-0 z-10 bg-green-100 text-foreground">
            Date
          </TableHead>
          {BLOCKS.map((b) => (
            <TableHead
              key={b.label}
              className="sticky top-0 z-10 bg-green-100 text-center text-foreground"
            >
              {b.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {blockRows.map((row, i) => (
          <TableRow key={row.date} className={i % 2 ? "bg-muted/40" : ""}>
            <TableCell className="whitespace-nowrap font-medium">
              {formatTableShortDate(row.date)}
            </TableCell>
            {row.blocks.map((v, idx) => {
              const isMin = v === min;
              const isMax = v === max;
              return (
                <TableCell key={idx} className="p-1">
                  <span
                    className={`flex items-center justify-center rounded py-1 ${
                      isMin
                        ? "bg-green-100 font-medium text-green-800"
                        : isMax
                          ? "bg-red-100 font-medium text-red-800"
                          : ""
                    }`}
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
