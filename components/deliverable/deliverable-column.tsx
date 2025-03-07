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

  // Helper function to extract ID from project or phase name
  const extractId = (name: string): string => {
    // If the name contains a number (e.g., "Project 1"), extract the number
    const match = name.match(/\d+/);
    return match ? match[0] : "1"; // Default to '1' if no number found
  };

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
          {deliverables.map((deliverable, index) => {
            // Extract project and phase IDs from the deliverable
            const projectId = extractId(deliverable.project);
            const phaseId = extractId(deliverable.deliverablePhase);

            return (
              <DeliverableCard
                key={deliverable.id}
                deliverable={deliverable}
                projectId={projectId}
                phaseId={phaseId}
                index={index}
              />
            );
          })}
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
