import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CITIES } from "@/constants/city";
import { POLLUTANTS } from "@/constants/pollutant";
import { getAllowedDateRange } from "@/lib/date";
import { useDashboardParams } from "@/hooks/useDashboardParams";
import { DateTimePicker } from "@/components/forms/DateTimePicker";
import {
  editDataPointSchema,
  type EditDataPointForm as EditDataPointFormValues,
} from "@/validations/editDataPoint";
import type { AirQualityData } from "@/hooks/useAirQuality";

interface EditDataPointFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const EditDataPointForm = ({
  onSuccess,
  onCancel,
}: EditDataPointFormProps) => {
  const { city, pollutant } = useDashboardParams();
  const queryClient = useQueryClient();

  const dateRange = getAllowedDateRange();

  const form = useForm<EditDataPointFormValues>({
    resolver: zodResolver(editDataPointSchema),
    defaultValues: {
      cityId: CITIES.some((c) => c.id === city) ? city : "",
      pollutantId: POLLUTANTS.some((p) => p.id === pollutant) ? pollutant : "",
      datetime: "",
      value: undefined,
    },
  });

  const onSubmit = (values: EditDataPointFormValues) => {
    const pollutantValue = POLLUTANTS.find(
      (pollutant) => pollutant.id === values.pollutantId,
    )?.value;

    const queries = queryClient.getQueriesData<AirQualityData>({
      queryKey: ["airQuality"],
    });

    queries.forEach(([key, data]) => {
      if (!data) return;
      if (key[2] !== pollutantValue) return;

      const cityIndex = data.cities.findIndex(
        (city) => city.id === values.cityId,
      );

      if (cityIndex === -1) return;

      const result = data.results[cityIndex];
      const hourIndex = result.timestamps.indexOf(values.datetime);
      if (hourIndex === -1) return;

      const updatedValues = [...result.values];
      updatedValues[hourIndex] = values.value;

      const updatedResults = [...data.results];
      updatedResults[cityIndex] = { ...result, values: updatedValues };

      queryClient.setQueryData<AirQualityData>(key, {
        ...data,
        results: updatedResults,
      });
    });

    toast.success("Data point saved");
    onSuccess();
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="cityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                City
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-xl border-transparent bg-muted">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CITIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pollutantId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Pollutant
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-xl border-transparent bg-muted">
                    <SelectValue placeholder="Select pollutant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {POLLUTANTS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Date & time
              </FormLabel>
              <FormControl>
                <DateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                  min={dateRange.min}
                  max={dateRange.max}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Value (µg/m³)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  className="w-full rounded-xl border-transparent bg-muted"
                  placeholder="e.g. 23.5"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
