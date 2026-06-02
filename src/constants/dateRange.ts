import { DateRangeValue } from "@/enums/dateRange";
import type { DateRange } from "@/types/dateRange";

export const DATE_RANGES: DateRange[] = [
  { id: "7d", label: "Last 7 days", value: DateRangeValue.last7days },
  { id: "14d", label: "Last 14 days", value: DateRangeValue.last14days },
  { id: "30d", label: "Last 30 days", value: DateRangeValue.last30days },
  { id: "90d", label: "Last 90 days", value: DateRangeValue.last90days },
];
