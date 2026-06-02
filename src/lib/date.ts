import { subDays, format } from "date-fns";

const MAX_RANGE_DAYS = 90;
const DATETIME_LOCAL_FORMAT = "yyyy-MM-dd'T'HH:mm";

export const getAllowedDateRange = () => {
  const now = new Date();
  return {
    min: format(subDays(now, MAX_RANGE_DAYS), DATETIME_LOCAL_FORMAT),
    max: format(now, DATETIME_LOCAL_FORMAT),
  };
};

export const formatDateTime = (date: string, hour: number) =>
  `${format(new Date(date), "d MMM")} · ${String(hour).padStart(2, "0")}:00`;

export const formatTableDate = (date: string) =>
  format(new Date(date), "EEE dd/MM");

export const formatTableShortDate = (date: string) =>
  format(new Date(date), "dd/MM");
