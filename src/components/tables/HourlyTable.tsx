import type { CityPolutionHourly } from "./AirQualityTable";

const HOURS = Array.from({ length: 24 }, (_, h) => h);
const round1 = (n: number) => Math.round(n * 10) / 10;

interface HourlyTableProps {
  rows: CityPolutionHourly[];
  min: number;
  max: number;
}

export const HourlyTable = ({ rows, min, max }: HourlyTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="px-3 py-2 text-left font-medium">City</th>
            {HOURS.map((h) => (
              <th key={h} className="px-2 py-2 text-center font-medium">
                {String(h).padStart(2, "0")}h
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.cityId} className={i % 2 ? "bg-muted" : ""}>
              <td className="px-3 py-2 font-medium">{row.cityName}</td>
              {HOURS.map((h) => {
                const v = round1(row.hourly[h]);
                const isMin = v === min;
                const isMax = v === max;
                return (
                  <td key={h} className="px-1 py-1">
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
