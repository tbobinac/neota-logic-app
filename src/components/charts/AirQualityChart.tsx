import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { CHART_COLORS } from "@/constants/chart";

interface AirQualityChartProps {
  data: Record<string, string | number>[];
  cities: string[];
}

export const AirQualityChart = ({ data, cities }: AirQualityChartProps) => {
  const showLegend = cities.length > 1;

  return (
    <div className="h-125 w-full rounded-lg border p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => format(new Date(d), "d MMM")}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
            minTickGap={24}
          />
          <YAxis tick={{ fontSize: 12 }} width={40} />
          <Tooltip
            labelFormatter={(d) => format(new Date(d as string), "EEE d MMM")}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: 12, paddingTop: 24 }}
            />
          )}
          {cities.map((cityName, i) => (
            <Bar
              key={cityName}
              dataKey={cityName}
              stackId="pollution"
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              radius={i === cities.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
