import { PollutantValue } from "@/enums/pollutant";
import type { Pollutant } from "@/types/pollutant";

export const POLLUTANT_UNIT = "µg/m³";

export const POLLUTANTS: Pollutant[] = [
  { id: "pm2_5", label: "PM2.5", value: PollutantValue.pm2_5 },
  { id: "pm10", label: "PM10", value: PollutantValue.pm10 },
  { id: "o3", label: "Ozone (O₃)", value: PollutantValue.ozone },
  {
    id: "no2",
    label: "Nitrogen dioxide (NO₂)",
    value: PollutantValue.nitrogenDioxide,
  },
  {
    id: "so2",
    label: "Sulphur dioxide (SO₂)",
    value: PollutantValue.sulphurDioxide,
  },
];
