import type { Task } from "@/app/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
  index: number;
  isDragging?: boolean;
}

export default function TaskCard({
  task,
  index,
  isDragging = false,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Priority colors
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    med: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
  };

  // Capitalize first letter of priority
  const priorityLabel =
    task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

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
      {/* <div className="absolute -top-0.5 -left-0.5 w-8 h-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-8 h-10 bg-[#ffe500] flex items-center justify-center font-bold text-[#444444]">
          T{index + 1}
        </div>
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-4 border-r-4 border-t-[8px] border-l-transparent border-r-transparent border-t-[#ffe500]"></div>
      </div> */}

      <div className="mb-3">
        <p className="text-sm text-[#444444]">{task.text}</p>
      </div>
      <div className="mb-4">
        <span className="text-xs text-gray-500">
          <strong className="font-medium text-[#444444]">Project:</strong>{" "}
          {task.project}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              priorityColors[task.priority as keyof typeof priorityColors]
            }`}
          >
            {priorityLabel}
          </span>
          <span className="text-xs text-gray-500">{task.date}</span>
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#27acaa] text-xs text-white">
          {task.assignee}
        </div>
      </div>
    </div>
  );
}
