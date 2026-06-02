import { useSearchParams } from "react-router-dom";
import { DATE_RANGES } from "@/constants/dateRange";
import { POLLUTANTS } from "@/constants/pollutant";
import { DateRangeValue } from "@/enums/dateRange";
import { PollutantValue } from "@/enums/pollutant";

const DEFAULTS_PARAMS = {
  city: "zagreb",
  range: "7d",
  pollutant: "pm2_5",
};

export const useDashboardParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get("city") ?? DEFAULTS_PARAMS.city;
  const range = searchParams.get("range") ?? DEFAULTS_PARAMS.range;
  const pollutant = searchParams.get("pollutant") ?? DEFAULTS_PARAMS.pollutant;

  const rangeValue =
    DATE_RANGES.find((r) => r.id === range)?.value ?? DateRangeValue.last7days;
  const pollutantValue =
    POLLUTANTS.find((p) => p.id === pollutant)?.value ?? PollutantValue.pm2_5;

  const setParam = (key: string, value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(key, value);
        return next;
      },
      { replace: true },
    );
  };

  return {
    city,
    range,
    pollutant,
    rangeValue,
    pollutantValue,
    setCity: (value: string) => setParam("city", value),
    setRange: (value: string) => setParam("range", value),
    setPollutant: (value: string) => setParam("pollutant", value),
  };
};
