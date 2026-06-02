import { useDashboardParams } from "@/hooks/useDashboardParams";
import { useAirQuality } from "@/hooks/useAirQuality";
import {
  getCityPollutionByDay,
  getCityAveragePollutionByDay,
} from "@/lib/airQuality";
import { Spinner } from "@/components/ui/spinner";
import { AirQualityChart } from "@/components/charts/AirQualityChart";
import { DisplayError } from "@/components/errors/DisplayError";

export const AirQualityChartSection = () => {
  const { city, rangeValue, pollutantValue } = useDashboardParams();

  const { data, isLoading, isError, refetch } = useAirQuality({
    city,
    pollutant: pollutantValue,
    range: rangeValue,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="size-6 text-primary" />
      </div>
    );
  }

  if (isError || !data) {
    return <DisplayError action={refetch} />;
  }

  const perCityDaily = data.results.map((res) =>
    getCityAveragePollutionByDay(getCityPollutionByDay(res)),
  );

  const chartDates = perCityDaily[0]?.map((d) => d.date) ?? [];

  const chartData = chartDates.map((date, i) => {
    const row: Record<string, string | number> = { date };
    data.cities.forEach((city, j) => {
      row[city.name] = perCityDaily[j][i]?.value ?? 0;
    });

    return row;
  });

  return (
    <AirQualityChart data={chartData} cities={data.cities.map((c) => c.name)} />
  );
};
