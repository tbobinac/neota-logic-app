export const SummaryCardVariant = {
  positive: "positive",
  negative: "negative",
  neutral: "neutral",
} as const;

export type SummaryCardVariant =
  (typeof SummaryCardVariant)[keyof typeof SummaryCardVariant];
