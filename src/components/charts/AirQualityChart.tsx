import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { CITIES } from "@/constants/city";
import { CHART_COLORS } from "@/constants/chart";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mockData = () =>
  DAYS.map((day) => {
    const entry: Record<string, string | number> = { day };
    CITIES.forEach((city) => {
      entry[city.id] = 20;
    });
    return entry;
  });

export const AirQualityChart = () => {
  const data = mockData();

  return (
    <div className="rounded-lg border p-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Daily mean PM2.5 (µg/m³) · stacked by city
      </p>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={32} />
          {CITIES.map((city, i) => (
            <Bar
              key={city.id}
              dataKey={city.id}
              name={city.name}
              stackId="a"
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              radius={i === CITIES.length - 1 ? [4, 4, 0, 0] : 0}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {CITIES.map((city, i) => (
          <span
            key={city.id}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <span
              className="size-2.5 rounded-sm"
              style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
            />
            <span className="md:hidden">{city.shortName}</span>
            <span className="hidden md:inline">{city.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
