import { SummaryCard } from "@/components/summary/SummaryCard";
import type { PollutionSummary } from "@/lib/airQuality";
import { formatDateTime } from "@/lib/date";

interface SummaryCardsProps {
  summary: PollutionSummary;
}

export const SummaryCards = ({ summary }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <SummaryCard label="Average" value={summary.average} />
      <SummaryCard
        label="Peak"
        value={summary.max.value}
        caption={formatDateTime(summary.max.date, summary.max.hour)}
        variant="negative"
      />
      <SummaryCard
        label="Cleanest"
        value={summary.min.value}
        caption={formatDateTime(summary.min.date, summary.min.hour)}
        variant="positive"
      />
    </div>
  );
};
