import { SelectDropdown } from "@/components/dropdowns/SelectDropdown";
import { EditDataPointDialog } from "@/components/dialogs/EditDataPointDialog";
import { useDashboardParams } from "@/hooks/useDashboardParams";
import type { SelectOption } from "@/types/select";
import { CITIES, REGIONS } from "@/constants/city";
import { DATE_RANGES } from "@/constants/dateRange";
import { POLLUTANTS } from "@/constants/pollutant";

const CITY_OPTIONS: SelectOption[] = [
  ...REGIONS.map((r): SelectOption => ({ value: r.id, label: r.name })),
  ...CITIES.map((c): SelectOption => ({ value: c.id, label: c.name })),
];

const RANGE_OPTIONS: SelectOption[] = DATE_RANGES.map((r) => ({
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
    <div className="flex flex-col gap-3 border-b px-4 py-3 xs:flex-row xs:items-start min-[840px]:items-end">
      <div className="flex flex-col gap-3 min-[840px]:flex-row min-[840px]:items-end">
        <SelectDropdown
          label="City"
          placeholder="Select city"
          options={CITY_OPTIONS}
          value={city}
          onChange={setCity}
          className="w-full xs:w-50"
        />
        <SelectDropdown
          label="Time range"
          placeholder="Select range"
          options={RANGE_OPTIONS}
          value={range}
          onChange={setRange}
          className="w-full xs:w-50"
        />
        <SelectDropdown
          label="Pollutant"
          placeholder="Select pollutant"
          options={POLLUTANT_OPTIONS}
          value={pollutant}
          onChange={setPollutant}
          className="w-full xs:w-50"
        />
      </div>
      <EditDataPointDialog className="mt-auto w-full xs:ml-auto xs:w-auto" />
    </div>
  );
};
