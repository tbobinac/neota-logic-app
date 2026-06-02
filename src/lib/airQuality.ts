import { avg, round } from "./math";

export interface DailyPollution {
  date: string;
  hourly: number[];
}

export interface DailyAveragePollution {
  date: string;
  value: number;
}

interface PollutionPoint {
  value: number;
  date: string;
  hour: number;
}

export interface PollutionSummary {
  average: number;
  min: PollutionPoint;
  max: PollutionPoint;
}

export interface CityPollution {
  timestamps: string[];
  values: number[];
}

export const mergeCitiesPollutions = (
  citiesPollutions: CityPollution[],
): CityPollution => {
  const { timestamps } = citiesPollutions[0];

  return {
    timestamps,
    values: timestamps.map((_, i) =>
      round(avg(citiesPollutions.map((pollution) => pollution.values[i]))),
    ),
  };
};

export const getCityPollutionByDay = (
  cityPollution: CityPollution,
): DailyPollution[] => {
  const byDate = new Map<string, number[]>();

  cityPollution.timestamps.forEach((time, i) => {
    const date = time.slice(0, 10);
    const hour = Number(time.slice(11, 13));

    if (!byDate.has(date)) {
      byDate.set(date, Array(24).fill(0));
    }
    byDate.get(date)![hour] = round(cityPollution.values[i]);
  });

  return Array.from(byDate.entries()).map(([date, hourly]) => ({
    date,
    hourly,
  }));
};

export const getCityAveragePollutionByDay = (
  rows: DailyPollution[],
): DailyAveragePollution[] =>
  rows.map((row) => ({
    date: row.date,
    value: round(avg(row.hourly)),
  }));

export const getPollutionSummary = (
  rows: DailyPollution[],
): PollutionSummary => {
  let sum = 0;
  let count = 0;
  let min: PollutionPoint | undefined;
  let max: PollutionPoint | undefined;

  rows.forEach((row) => {
    row.hourly.forEach((value, hour) => {
      sum = sum + value;
      count++;

      const point = { value, date: row.date, hour };

      if (!min || value < min.value) min = point;
      if (!max || value > max.value) max = point;
    });
  });

  const empty = { value: 0, date: "", hour: 0 };

  return {
    average: round(count ? sum / count : 0),
    min: min ? { ...min, value: round(min.value) } : empty,
    max: max ? { ...max, value: round(max.value) } : empty,
  };
};
