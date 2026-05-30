import { z } from "zod";

export const newDataPointSchema = z.object({
  cityId: z.string().min(1, "Select a city"),
  pollutantId: z.string().min(1, "Select a pollutant"),
  datetime: z.string().min(1, "Pick a date and time"),
  value: z
    .number({ message: "Enter a value" })
    .min(0, "Value must be 0 or more"),
});

export type NewDataPointForm = z.infer<typeof newDataPointSchema>;
