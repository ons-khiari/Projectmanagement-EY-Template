import type { Deliverable } from "@/app/types/deliverable";
import DeliverableCard from "./deliverable-card";

interface DeliverableColumnProps {
  title: string;
  count: number;
  total: number;
  deliverables: Deliverable[];
}

export default function DeliverableColumn({
  title,
  count,
  total,
  deliverables,
}: DeliverableColumnProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-[#444444]">{title}</h3>
        <span className="text-sm text-gray-500">
          {count} / {total}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {deliverables.map((deliverable) => (
          <DeliverableCard key={deliverable.id} deliverable={deliverable} />
        ))}
      </div>
    </div>
  );
}
