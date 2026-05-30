import { SelectDropdown } from "@/components/dropdowns/SelectDropdown";
import { AddDataPointDialog } from "@/components/dialogs/AddDataPointDialog";
import { useDashboardParams } from "@/hooks/useDashboardParams";
import type { SelectOption } from "@/types/select";
import { CITIES, REGIONS, SHOW_ALL_ID } from "@/constants/city";
import { TIME_RANGES } from "@/constants/timeRange";
import { POLLUTANTS } from "@/constants/pollutant";

const CITY_OPTIONS: SelectOption[] = [
  { value: SHOW_ALL_ID, label: "Show all" },
  ...REGIONS.map((r): SelectOption => ({ value: r.id, label: r.name })),
  ...CITIES.map((c): SelectOption => ({ value: c.id, label: c.name })),
];

const RANGE_OPTIONS: SelectOption[] = TIME_RANGES.map((r) => ({
  value: r.id,
  label: r.label,
}));

const POLLUTANT_OPTIONS: SelectOption[] = POLLUTANTS.map((p) => ({
  value: p.id,
  label: p.label,
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
      <div className="ml-auto">
        <AddDataPointDialog />
      </div>
    </div>
  );
};
