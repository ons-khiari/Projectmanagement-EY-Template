"use client";

import { useState } from "react";
import { Search, Edit, Settings, Plus } from "lucide-react";
import TaskColumn from "./task-column";
import type { Task } from "@/app/types/task";

// Sample task data
const sampleTasks: Record<string, Task[]> = {
  todo: [
    {
      id: "1",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "2",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "med",
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "3",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "high",
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "4",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
    },
  ],
  inProgress: [
    {
      id: "5",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "6",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "med",
      date: "23 August 2023",
      assignee: "OK",
    },
  ],
  done: [
    {
      id: "7",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "8",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "9",
      text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
    },
  ],
};

export default function TaskDashboard() {
  const [activeTab, setActiveTab] = useState("myTasks");
  const [tasks, setTasks] = useState(sampleTasks);

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

      <div className="grid grid-cols-3 gap-6">
        <TaskColumn
          title="To Do"
          count={tasks.todo.length}
          total={7}
          tasks={tasks.todo}
        />
        <TaskColumn
          title="In progress"
          count={tasks.inProgress.length}
          total={7}
          tasks={tasks.inProgress}
        />
        <TaskColumn
          title="Done"
          count={tasks.done.length}
          total={7}
          tasks={tasks.done}
        />
      </div>
    </div>
  );
}
