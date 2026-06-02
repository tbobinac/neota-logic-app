export const PollutantValue = {
  pm2_5: "pm2_5",
  pm10: "pm10",
  ozone: "ozone",
  nitrogenDioxide: "nitrogen_dioxide",
  sulphurDioxide: "sulphur_dioxide",
} as const;

export type PollutantValue =
  (typeof PollutantValue)[keyof typeof PollutantValue];
