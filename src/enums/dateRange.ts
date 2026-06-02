export const DateRangeValue = {
  last7days: 7,
  last14days: 14,
  last30days: 30,
  last90days: 90,
} as const;

export type DateRangeValue =
  (typeof DateRangeValue)[keyof typeof DateRangeValue];
