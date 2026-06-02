import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectOption } from "@/types/select";
import { cn } from "@/lib/utils";

interface SelectDropdownProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SelectDropdown = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
}: SelectDropdownProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "rounded-xl border-transparent bg-muted px-3.5",
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
