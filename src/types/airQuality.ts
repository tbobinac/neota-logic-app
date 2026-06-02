import type { PollutantValue } from "@/enums/pollutant";

export interface AirQualityResponse {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
  } & Partial<Record<PollutantValue, number[]>>;
}
