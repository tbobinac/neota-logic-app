export const SummaryCardVariant = {
  positive: "positive",
  negative: "negative",
} as const;

export type SummaryCardVariant =
  (typeof SummaryCardVariant)[keyof typeof SummaryCardVariant];
