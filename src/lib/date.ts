import { subDays, startOfDay, endOfDay, format, parseISO } from "date-fns";

const MAX_RANGE_DAYS = 90;

export const getAllowedDateRange = () => {
  const now = new Date();
  return {
    min: startOfDay(subDays(now, MAX_RANGE_DAYS)),
    max: endOfDay(subDays(now, 1)),
  };
};

export const formatDateTime = (date: string, hour: number) =>
  `${format(parseISO(date), "d MMM")} · ${String(hour).padStart(2, "0")}:00`;

export const formatTableDate = (date: string) =>
  format(parseISO(date), "EEE dd/MM");

export const formatTableShortDate = (date: string) =>
  format(parseISO(date), "dd/MM");
