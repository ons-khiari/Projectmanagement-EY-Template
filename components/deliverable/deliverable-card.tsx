import type { Deliverable } from "@/app/types/deliverable";
import { Link2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DeliverableCardProps {
  deliverable: Deliverable;
  index: number;
  isDragging?: boolean;
}

export default function DeliverableCard({
  deliverable,
  index,
  isDragging = false,
}: DeliverableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: deliverable.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Priority colors
  const priorityColors = {
    low: "bg-blue-100 text-blue-800 border-l-4 border-blue-500",
    med: "bg-orange-100 text-orange-800 border-l-4 border-orange-500",
    high: "bg-red-100 text-red-800 border-l-4 border-red-500",
  };

  // Capitalize first letter of priority
  const priorityLabel =
    deliverable.priority.charAt(0).toUpperCase() +
    deliverable.priority.slice(1);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-md border border-gray-200 bg-white p-3 shadow-sm relative cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* Ribbon badge */}
      <div className="absolute -top-0.5 -left-0.5 w-8 h-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-8 h-10 bg-[#ffe500] flex items-center justify-center font-bold text-[#444444]">
          D{deliverable.priority_number}
        </div>
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-4 border-r-4 border-t-[8px] border-l-transparent border-r-transparent border-t-[#ffe500]"></div>
      </div>

      <div className="mb-2 pl-7">
        <h4 className="font-medium text-[#444444]">{deliverable.title}</h4>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-500">{deliverable.description}</p>
      </div>
      <div className="mb-3">
        <a
          href="#"
          className="flex items-center text-xs text-blue-500 hover:underline"
        >
          <Link2 className="mr-1 h-3 w-3" />
          {deliverable.link}
        </a>
      </div>
      <div className="mb-4">
        <span className="text-xs text-gray-500">
          <strong className="font-medium text-[#444444]">Project:</strong>{" "}
          {deliverable.project}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${priorityColors[
              deliverable.priority as keyof typeof priorityColors
            ]
              .split(" ")
              .slice(0, 2)
              .join(" ")}`}
          >
            {priorityLabel}
          </span>
          <span className="text-xs text-gray-500">{deliverable.date}</span>
        </div>
        <div className="flex -space-x-2">
          {deliverable.assignee.map((assignee) => (
            <div
              key={assignee.id}
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs text-white"
              style={{ backgroundColor: assignee.color }}
            >
              {assignee.avatar}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
