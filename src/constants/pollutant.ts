import type { Pollutant } from "@/types/pollutant";

export const POLLUTANT_UNIT = "µg/m³";

export const POLLUTANTS: Pollutant[] = [
  { id: "pm2_5", label: "PM2.5", value: "pm2_5" },
  { id: "pm10", label: "PM10", value: "pm10" },
  { id: "o3", label: "Ozone (O₃)", value: "ozone" },
  { id: "no2", label: "Nitrogen dioxide (NO₂)", value: "nitrogen_dioxide" },
  { id: "so2", label: "Sulphur dioxide (SO₂)", value: "sulphur_dioxide" },
];
