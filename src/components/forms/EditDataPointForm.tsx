import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

interface EditDataPointFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const EditDataPointForm = ({
  onSuccess,
  onCancel,
}: EditDataPointFormProps) => {
  const { city, pollutant, rangeValue } = useDashboardParams();

  const dateRange = getAllowedDateRange(rangeValue);

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
    console.log("data point:", values);
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
              <FormLabel>City</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
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
              <FormLabel>Pollutant</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
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
              <FormLabel>Date & time</FormLabel>
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
              <FormLabel>Value (µg/m³)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  className="w-full"
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

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Add point
          </Button>
        </div>
      </form>
    </Form>
  );
};
