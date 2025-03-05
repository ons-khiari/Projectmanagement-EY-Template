import type { Task } from "@/app/types/task";
import TaskCard from "./task-card";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface TaskColumnProps {
  title: string;
  count: number;
  total: number;
  tasks: Task[];
  id: string; // Column ID for drag and drop
}

export default function TaskColumn({
  title,
  count,
  total,
  tasks,
  id,
}: TaskColumnProps) {
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
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="text-center py-4 text-gray-400 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
