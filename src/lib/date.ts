import { subDays, format } from "date-fns";

export const getAllowedDateRange = (rangeDays: number) => {
  const now = new Date();
  return {
    min: subDays(now, rangeDays),
    max: now,
  };
};

export const formatDateTime = (date: string, hour: number) =>
  `${format(new Date(date), "d MMM")} · ${String(hour).padStart(2, "0")}:00`;

export const formatTableDate = (date: string) =>
  format(new Date(date), "EEE dd/MM");

export const formatTableShortDate = (date: string) =>
  format(new Date(date), "dd/MM");
