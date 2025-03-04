import type { Task } from "@/app/types/task";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
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
    <div className="rounded-md border border-gray-200 bg-white p-3 shadow-sm">
      <div className="mb-3">
        <p className="text-sm text-[#444444]">{task.text}</p>
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
