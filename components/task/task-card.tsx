import type { Task } from "@/app/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface TaskCardProps {
  task: Task;
  index: number;
  isDragging?: boolean;
  onSelect?: (task: Task) => void;
}

export default function TaskCard({
  task,
  index,
  isDragging = false,
  onSelect,
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

  const handleClick = () => {
    if (onSelect) {
      onSelect(task);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-md border border-gray-200 bg-white p-3 shadow-sm relative hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* Drag handle */}
      <div
        className="absolute right-2 top-2 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-100"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      {/* Clickable content */}
      <div className="cursor-pointer pr-6" onClick={handleClick}>
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
    </div>
  );
}
