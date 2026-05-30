import { POLLUTANT_UNIT } from "@/constants/pollutant";
import { SummaryCardVariant } from "@/enums/summary";

interface SummaryCardProps {
  label: string;
  value: number;
  variant?: SummaryCardVariant;
}

export const SummaryCard = ({ label, value, variant }: SummaryCardProps) => {
  const valueColor =
    variant === SummaryCardVariant.negative
      ? "text-red-700"
      : variant === SummaryCardVariant.positive
        ? "text-green-700"
        : "";
  return (
    <div className="rounded-md bg-muted px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-2xl font-medium ${valueColor}`}>
        {value}
        <span className="ml-1 text-xs font-normal text-muted-foreground">
          {POLLUTANT_UNIT}
        </span>
      </div>
    </div>
  );
};
