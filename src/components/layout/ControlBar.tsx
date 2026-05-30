import { SelectDropdown } from "@/components/dropdowns/SelectDropdown";
import { useDashboardParams } from "@/hooks/useDashboardParams";
import type { SelectOption } from "@/types/select";
import { TIME_RANGES } from "@/constants/timeRange";
import { POLLUTANTS } from "@/constants/pollutant";
import { CITIES, REGIONS, SHOW_ALL_ID } from "@/constants/city";

const CITY_OPTIONS: SelectOption[] = [
  { value: SHOW_ALL_ID, label: "Show all" },
  ...REGIONS.map((region) => ({ value: region.id, label: region.name })),
  ...CITIES.map((city) => ({ value: city.id, label: city.name })),
];

const RANGE_OPTIONS: SelectOption[] = TIME_RANGES.map((timeRange) => ({
  value: timeRange.id,
  label: timeRange.label,
}));

const POLLUTANT_OPTIONS: SelectOption[] = POLLUTANTS.map((pollutant) => ({
  value: pollutant.id,
  label: pollutant.label,
}));

export const ControlBar = () => {
  const { city, range, pollutant, setCity, setRange, setPollutant } =
    useDashboardParams();

  return (
    <div className="flex flex-wrap items-end gap-3 border-b px-4 py-3">
      <SelectDropdown
        label="City"
        placeholder="Select city"
        options={CITY_OPTIONS}
        value={city}
        onChange={setCity}
        className="w-50"
      />
      <SelectDropdown
        label="Time range"
        placeholder="Select range"
        options={RANGE_OPTIONS}
        value={range}
        onChange={setRange}
        className="w-50"
      />
      <SelectDropdown
        label="Pollutant"
        placeholder="Select pollutant"
        options={POLLUTANT_OPTIONS}
        value={pollutant}
        onChange={setPollutant}
        className="w-50"
      />
    </div>
  );
};
