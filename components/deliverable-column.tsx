import type { Deliverable } from "@/app/types/deliverable";
import DeliverableCard from "./deliverable-card";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface DeliverableColumnProps {
  title: string;
  count: number;
  total: number;
  deliverables: Deliverable[];
  id: string; // Column ID for drag and drop
}

export default function DeliverableColumn({
  title,
  count,
  total,
  deliverables,
  id,
}: DeliverableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-[#444444]">{title}</h3>
        <span className="text-sm text-gray-500">
          {count} / {total}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-3 min-h-[200px] p-2 rounded-md transition-colors duration-200 ${
          isOver ? "bg-gray-200" : ""
        }`}
      >
        <SortableContext
          items={deliverables.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {deliverables.map((deliverable, index) => (
            <DeliverableCard
              key={deliverable.id}
              deliverable={deliverable}
              index={index}
            />
          ))}
        </SortableContext>
        {deliverables.length === 0 && (
          <div className="text-center py-4 text-gray-400 text-sm">
            Drop items here
          </div>
        )}
      </div>
    </div>
  );
}
