import { useDashboardParams } from "@/hooks/useDashboardParams";
import { useAirQuality } from "@/hooks/useAirQuality";
import {
  getCityPollutionByDay,
  getPollutionSummary,
  mergeCitiesPollutions,
} from "@/lib/airQuality";
import { Spinner } from "@/components/ui/spinner";
import { SummaryCards } from "@/components/summary/SummaryCards";
import { AirQualityTable } from "@/components/tables/AirQualityTable";
import { AirQualityBlockTable } from "@/components/tables/AirQualityBlockTable";
import { DisplayError } from "../errors/DisplayError";

export const AirQualityTableSection = () => {
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

  const pollutions =
    data.results.length === 1
      ? data.results[0]
      : mergeCitiesPollutions(data.results);

  const rows = getCityPollutionByDay(pollutions);

  const summary = getPollutionSummary(rows);

  return (
    <div className="flex flex-col gap-4">
      <SummaryCards summary={summary} />

      <div className="hidden lg:block">
        <AirQualityTable
          rows={rows}
          min={summary.min.value}
          max={summary.max.value}
        />
      </div>
      <div className="lg:hidden">
        <AirQualityBlockTable rows={rows} />
      </div>
    </div>
  );
};
