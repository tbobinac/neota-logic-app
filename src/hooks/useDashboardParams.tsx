import { SHOW_ALL_ID } from "@/constants/city";
import { useSearchParams } from "react-router-dom";

const DEFAULTS = {
  city: SHOW_ALL_ID,
  range: "7d",
  pollutant: "pm2_5",
};

export const useDashboardParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get("city") ?? DEFAULTS.city;
  const range = searchParams.get("range") ?? DEFAULTS.range;
  const pollutant = searchParams.get("pollutant") ?? DEFAULTS.pollutant;

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
    setCity: (v: string) => setParam("city", v),
    setRange: (v: string) => setParam("range", v),
    setPollutant: (v: string) => setParam("pollutant", v),
  };
};
