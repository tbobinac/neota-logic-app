import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  min: Date;
  max: Date;
}

const HOURS = Array.from({ length: 24 }, (_, h) => String(h).padStart(2, "0"));

const buildValue = (date: Date, hour: string) =>
  `${format(date, "yyyy-MM-dd")}T${hour}:00`;

export const DateTimePicker = ({
  value,
  onChange,
  min,
  max,
}: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);

  const selectedDate = value ? new Date(value) : undefined;
  const hour = value ? value.slice(11, 13) : "";

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    onChange(buildValue(date, hour || "00"));
  };

  const handleSelectHour = (nextHour: string) => {
    const date = selectedDate ?? max;
    onChange(buildValue(date, nextHour));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-start font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="size-4" />
          {value
            ? `${format(selectedDate!, "d MMM yyyy")} · ${hour}:00`
            : "Pick date & time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelectDate}
          disabled={{ before: min, after: max }}
          defaultMonth={selectedDate ?? max}
          classNames={{ root: "w-full" }}
          autoFocus
        />
        <div className="border-t p-3">
          <Select value={hour} onValueChange={handleSelectHour}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select hour" />
            </SelectTrigger>
            <SelectContent>
              {HOURS.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}:00
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
};
