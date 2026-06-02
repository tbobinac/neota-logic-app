import { SummaryCard } from "@/components/summary/SummaryCard";
import type { PollutionSummary } from "@/lib/airQuality";
import { formatDateTime } from "@/lib/date";

interface SummaryCardsProps {
  summary: PollutionSummary;
}

export const SummaryCards = ({ summary }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <SummaryCard label="Average" value={summary.average} />
      <SummaryCard
        label={`Peak · ${formatDateTime(summary.max.date, summary.max.hour)}`}
        value={summary.max.value}
        variant="negative"
      />
      <SummaryCard
        label={`Cleanest · ${formatDateTime(summary.min.date, summary.min.hour)}`}
        value={summary.min.value}
        variant="positive"
      />
    </div>
  );
};
