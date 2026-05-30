import { SummaryCard } from "@/components/summary/SummaryCard";
import { SummaryCardVariant } from "@/enums/summary";

export const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <SummaryCard label="Average" value={20} />
      <SummaryCard
        label="Peak hour · 08:00"
        value={20}
        variant={SummaryCardVariant.negative}
      />
      <SummaryCard
        label="Cleanest · 04:00"
        value={20}
        variant={SummaryCardVariant.positive}
      />
    </div>
  );
};
