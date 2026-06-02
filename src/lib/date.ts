import { subDays, startOfDay, endOfDay, format } from "date-fns";

const MAX_RANGE_DAYS = 90;

export const getAllowedDateRange = () => {
  const now = new Date();
  return {
    min: startOfDay(subDays(now, MAX_RANGE_DAYS)),
    max: endOfDay(subDays(now, 1)),
  };
};

export const formatDateTime = (date: string, hour: number) =>
  `${format(new Date(date), "d MMM")} · ${String(hour).padStart(2, "0")}:00`;

export const formatTableDate = (date: string) =>
  format(new Date(date), "EEE dd/MM");

export const formatTableShortDate = (date: string) =>
  format(new Date(date), "dd/MM");
