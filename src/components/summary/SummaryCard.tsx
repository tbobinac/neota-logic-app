import { POLLUTANT_UNIT } from "@/constants/pollutant";
import { SummaryCardVariant } from "@/enums/summary";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  label: string;
  value: number;
  caption?: string;
  variant?: SummaryCardVariant;
}

const VARIANTS: Record<string, { border: string; dot: string; label: string }> =
  {
    [SummaryCardVariant.positive]: {
      border: "border-l-emerald-500",
      dot: "bg-emerald-500",
      label: "text-emerald-700",
    },
    [SummaryCardVariant.negative]: {
      border: "border-l-red-600",
      dot: "bg-red-600",
      label: "text-red-600",
    },
    neutral: {
      border: "border-l-blue-500",
      dot: "bg-blue-500",
      label: "text-blue-700",
    },
  };

export const SummaryCard = ({
  label,
  value,
  caption,
  variant,
}: SummaryCardProps) => {
  const v = VARIANTS[variant ?? "neutral"];

  return (
    <div
      className={cn(
        "rounded-2xl border border-l-4 bg-card p-5 shadow-sm",
        v.border,
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn("size-2 rounded-full", v.dot)} />
        <span className={cn("text-sm font-semibold", v.label)}>{label}</span>
        {caption && (
          <span className="text-sm text-muted-foreground">· {caption}</span>
        )}
      </div>
      <div className="mt-2 text-4xl font-bold tracking-tight tabular-nums text-foreground">
        {value}
        <span className="ml-1.5 text-sm font-normal text-muted-foreground">
          {POLLUTANT_UNIT}
        </span>
      </div>
    </div>
  );
};
