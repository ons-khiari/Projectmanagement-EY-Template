"use client";

import { useState } from "react";
import { Search, Edit, Settings, Plus } from "lucide-react";
import TaskColumn from "./task-column";
import type { Task } from "@/app/types/task";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import TaskCard from "./task-card";
import { TaskDetails } from "./task-details";

// Sample task data
const sampleTasks: Record<string, Task[]> = {
  todo: [
    {
      id: "1",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
      project: "Project 6",
    },
    {
      id: "2",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "med",
      date: "23 August 2023",
      assignee: "OK",
      project: "Project 6",
    },
    {
      id: "3",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "high",
      date: "23 August 2023",
      assignee: "OK",
      project: "Project 6",
    },
    {
      id: "4",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
      project: "Project 6",
    },
  ],
  inProgress: [
    {
      id: "5",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
      project: "Project 6",
    },
    {
      id: "6",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "med",
      date: "23 August 2023",
      assignee: "OK",
      project: "Project 6",
    },
  ],
  done: [
    {
      id: "7",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
      project: "Project 6",
    },
    {
      id: "8",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
      project: "Project 6",
    },
    {
      id: "9",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
      project: "Project 6",
    },
  ],
};

export default function TaskDashboard() {
  const [activeTab, setActiveTab] = useState("myTasks");
  const [tasks, setTasks] = useState(sampleTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Find the container and index of an item
  const findContainer = (id: string) => {
    if (id in tasks) return id;

    const container = Object.keys(tasks).find((key) =>
      tasks[key].some((item) => item.id === id)
    );

    return container || null;
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id as string;
    const container = findContainer(id);

    if (container) {
      const index = tasks[container].findIndex((item) => item.id === id);
      if (index !== -1) {
        setActiveId(id);
        setActiveTask(tasks[container][index]);
      }
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setActiveTask(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) {
      setActiveId(null);
      setActiveTask(null);
      return;
    }

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      setActiveTask(null);
      return;
    }

    // Find the indexes of the active and over items
    const activeIndex = tasks[activeContainer].findIndex(
      (item) => item.id === activeId
    );
    const overIndex = tasks[overContainer].findIndex(
      (item) => item.id === overId
    );

    // If items are in the same container, reorder
    if (activeContainer === overContainer) {
      const newItems = [...tasks[activeContainer]];
      const reorderedItems = arrayMove(newItems, activeIndex, overIndex);

      setTasks({
        ...tasks,
        [activeContainer]: reorderedItems,
      });
    }
    // If items are in different containers, move from one to another
    else {
      const activeItems = [...tasks[activeContainer]];
      const overItems = [...tasks[overContainer]];
      const [item] = activeItems.splice(activeIndex, 1);

      // Insert into the new container
      overItems.splice(overIndex, 0, item);

      setTasks({
        ...tasks,
        [activeContainer]: activeItems,
        [overContainer]: overItems,
      });
    }

    setActiveId(null);
    setActiveTask(null);
  };

  // Handle drag over - for dropping into empty containers
  const handleDragOver = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    // Check if we're dropping directly onto a container
    if (overId === "todo" || overId === "inProgress" || overId === "done") {
      const activeItems = [...tasks[activeContainer]];
      const overItems = [...tasks[overContainer]];
      const activeIndex = activeItems.findIndex((item) => item.id === activeId);

      if (activeIndex !== -1) {
        const [item] = activeItems.splice(activeIndex, 1);
        overItems.push(item);

        setTasks({
          ...tasks,
          [activeContainer]: activeItems,
          [overContainer]: overItems,
        });
      }
    }
  };

  // Handle task selection
  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#444444]">Tasks/</h1>
        <div></div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-48 rounded-md border border-gray-300 pl-9 pr-4 text-sm focus:border-[#ffe500] focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>

        <button className="flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]">
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="mb-4 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            className={`border-b-2 px-1 py-2 text-sm font-medium ${
              activeTab === "myTasks"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("myTasks")}
          >
            My Tasks
          </button>
          <button
            className={`border-b-2 px-1 py-2 text-sm font-medium ${
              activeTab === "others"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("others")}
          >
            Others
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="grid grid-cols-3 gap-6 bg-gray-50 p-4">
          <TaskColumn
            title="To Do"
            count={tasks.todo.length}
            total={7}
            tasks={tasks.todo}
            id="todo"
            onTaskSelect={handleTaskSelect}
          />
          <TaskColumn
            title="In progress"
            count={tasks.inProgress.length}
            total={7}
            tasks={tasks.inProgress}
            id="inProgress"
            onTaskSelect={handleTaskSelect}
          />
          <TaskColumn
            title="Done"
            count={tasks.done.length}
            total={7}
            tasks={tasks.done}
            id="done"
            onTaskSelect={handleTaskSelect}
          />
        </div>

        {/* Drag overlay for visual feedback */}
        <DragOverlay>
          {activeId && activeTask ? (
            <div className="opacity-80">
              <TaskCard task={activeTask} index={0} isDragging={true} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Details Panel */}
      <TaskDetails
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}
