import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { jsonFetch } from "@/lib/jsonFetch";
import { getSelectedCities } from "@/constants/city";
import { BASE_URL } from "@/constants/api";
import type { PollutantValue } from "@/enums/pollutant";
import type { City } from "@/types/city";
import type { CityPollution } from "@/lib/airQuality";

export interface AirQualityResponse {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
  } & Partial<Record<PollutantValue, number[]>>;
}

export interface AirQualityData {
  cities: City[];
  results: CityPollution[];
}

interface UseAirQualityParams {
  city: string;
  pollutant: PollutantValue;
  range: number;
}

export const useAirQuality = ({
  city,
  pollutant,
  range,
}: UseAirQualityParams) => {
  const cities = getSelectedCities(city);

  return useQuery({
    queryKey: ["airQuality", city, pollutant, range],
    queryFn: async (): Promise<AirQualityData> => {
      const params = new URLSearchParams({
        latitude: cities.map((c) => c.latitude).join(","),
        longitude: cities.map((c) => c.longitude).join(","),
        hourly: pollutant,
        past_days: String(range),
        forecast_days: "0",
      });

      const data = await jsonFetch<AirQualityResponse | AirQualityResponse[]>(
        `${BASE_URL}/v1/air-quality?${params}`,
      );

      const raw = Array.isArray(data) ? data : [data];

      const results = raw.map((res) => ({
        timestamps: res.hourly.time,
        values: res.hourly[pollutant] || [],
      }));

      return { cities, results };
    },
    placeholderData: keepPreviousData,
  });
};
