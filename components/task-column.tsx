import type { Task } from "@/app/types/task";
import TaskCard from "./task-card";

interface TaskColumnProps {
  title: string;
  count: number;
  total: number;
  tasks: Task[];
}

export default function TaskColumn({
  title,
  count,
  total,
  tasks,
}: TaskColumnProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-[#444444]">{title}</h3>
        <span className="text-sm text-gray-500">
          {count} / {total}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
