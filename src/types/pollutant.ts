import { PollutantValue } from "@/enums/pollutant";
export interface Pollutant {
  id: string;
  label: string;
  value: PollutantValue;
}
