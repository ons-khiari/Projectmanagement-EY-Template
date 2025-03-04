import type { Deliverable } from "@/app/types/deliverable";
import { Link2 } from "lucide-react";

interface DeliverableCardProps {
  deliverable: Deliverable;
}

export default function DeliverableCard({ deliverable }: DeliverableCardProps) {
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
      className={`rounded-md border border-gray-200 bg-white p-3 shadow-sm ${
        priorityColors[deliverable.priority as keyof typeof priorityColors]
      }`}
    >
      <div className="mb-2">
        <h4 className="font-medium text-[#444444]">{deliverable.title}</h4>
      </div>
      <div className="mb-3">
        <p className="text-xs text-gray-600">{deliverable.description}</p>
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
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#27acaa] text-xs text-white">
          {deliverable.assignee}
        </div>
      </div>
    </div>
  );
}
