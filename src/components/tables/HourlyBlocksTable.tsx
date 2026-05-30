import type { CityPolutionHourly } from "./AirQualityTable";

const BLOCKS = [
  { label: "0–4", hours: [0, 1, 2, 3] },
  { label: "4–8", hours: [4, 5, 6, 7] },
  { label: "8–12", hours: [8, 9, 10, 11] },
  { label: "12–16", hours: [12, 13, 14, 15] },
  { label: "16–20", hours: [16, 17, 18, 19] },
  { label: "20–24", hours: [20, 21, 22, 23] },
];

const round1 = (n: number) => Math.round(n * 10) / 10;
const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;

interface HourlyBlocksTableProps {
  rows: CityPolutionHourly[];
}

export const HourlyBlocksTable = ({ rows }: HourlyBlocksTableProps) => {
  const blockRows = rows.map((row) => ({
    ...row,
    blocks: BLOCKS.map((b) => round1(avg(b.hours.map((h) => row.hourly[h])))),
  }));

  const allBlockValues = blockRows.flatMap((r) => r.blocks);
  const min = Math.min(...allBlockValues);
  const max = Math.max(...allBlockValues);

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="px-2 py-2 text-left font-medium">City</th>
            {BLOCKS.map((b) => (
              <th key={b.label} className="px-2 py-2 text-center font-medium">
                {b.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {blockRows.map((row, i) => (
            <tr key={row.cityId} className={i % 2 ? "bg-muted" : ""}>
              <td className="px-2 py-2 font-medium">{row.shortName}</td>
              {row.blocks.map((v, idx) => {
                const isMin = v === min;
                const isMax = v === max;
                return (
                  <td key={idx} className="px-1 py-1">
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
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
