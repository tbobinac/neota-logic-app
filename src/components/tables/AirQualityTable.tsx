import { CITIES } from "@/constants/city";
import { SummaryCards } from "../summary/SummaryCards";
import { POLLUTANT_UNIT } from "@/constants/pollutant";
import { HourlyTable } from "./HourlyTable";
import { HourlyBlocksTable } from "./HourlyBlocksTable";

export interface CityPolutionHourly {
  cityId: string;
  cityName: string;
  shortName: string;
  hourly: number[];
}

const HOURS = Array.from({ length: 24 }, (_, h) => h);

const mockData = (): CityPolutionHourly[] =>
  CITIES.map((city) => ({
    cityId: city.id,
    cityName: city.name,
    shortName: city.shortName,
    hourly: HOURS.map(() => 20),
  }));

export const AirQualityTable = () => {
  const rows = mockData();
  const allValues = rows.flatMap((r) => r.hourly);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  return (
    <div className="flex flex-col gap-4">
      <SummaryCards />

      <p className="text-sm text-muted-foreground">
        Average PM2.5 by hour of day ({POLLUTANT_UNIT})
      </p>

      <div className="hidden lg:block">
        <HourlyTable rows={rows} min={min} max={max} />
      </div>
      <div className="lg:hidden">
        <HourlyBlocksTable rows={rows} />
      </div>
    </div>
  );
};
