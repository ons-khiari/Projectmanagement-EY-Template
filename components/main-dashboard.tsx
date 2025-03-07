"use client";

import { useState } from "react";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  FolderKanban,
  MoreHorizontal,
  PieChart,
  Plus,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { Project } from "@/app/types/project";
import type { Task } from "@/app/types/task";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";

// Sample data
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Dashboard design project",
    description:
      "The project is about designing a web application's Dashboard.",
    progress: 75,
    progressColor: "blue",
    startDate: "10 Jan",
    endDate: "30 Jan",
    projectManager: { id: "1", avatar: "OK", color: "#27acaa" },
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
    ],
  },
  {
    id: "2",
    title: "Mobile app development",
    description: "Developing a mobile application for client management.",
    progress: 45,
    progressColor: "orange",
    startDate: "15 Feb",
    endDate: "20 Mar",
    projectManager: { id: "3", avatar: "AS", color: "#f43f5e" },
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
    ],
  },
  {
    id: "3",
    title: "API integration project",
    description: "Integrating third-party APIs for payment processing.",
    progress: 90,
    progressColor: "yellow",
    startDate: "5 Mar",
    endDate: "15 Apr",
    projectManager: { id: "4", avatar: "MK", color: "#f43f5e" },
    members: [
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
    ],
  },
];

const sampleTasks: Task[] = [
  {
    id: "1",
    text: "Complete user authentication module",
    priority: "high",
    date: "Today",
    assignee: "OK",
    project: "Dashboard design project",
    deliverable: "Deliverable 1",
    deliverablePhase: "Phase 1",
    status: "todo",
  },
  {
    id: "2",
    text: "Design dashboard wireframes",
    priority: "med",
    date: "Tomorrow",
    assignee: "JD",
    project: "Dashboard design project",
    deliverable: "Deliverable 1",
    deliverablePhase: "Phase 1",
    status: "in-progress",
  },
  {
    id: "3",
    text: "Review API documentation",
    priority: "low",
    date: "23 March",
    assignee: "AS",
    project: "Dashboard design project",
    deliverable: "Deliverable 1",
    deliverablePhase: "Phase 1",
    status: "done",
  },
];

const sampleDeliverablePhases: DeliverablePhase[] = [
  {
    id: "1",
    title: "User Interface Design",
    startDate: new Date(2023, 2, 15),
    endDate: new Date(2023, 2, 25),
    color: "blue",
  },
  {
    id: "2",
    title: "Backend Development",
    startDate: new Date(2023, 2, 20),
    endDate: new Date(2023, 3, 10),
    color: "orange",
  },
  {
    id: "3",
    title: "Testing Phase",
    startDate: new Date(2023, 3, 11),
    endDate: new Date(2023, 3, 20),
    color: "yellow",
  },
];

// KPI data
const kpiData = [
  {
    title: "Total Projects",
    value: "12",
    icon: FolderKanban,
    color: "bg-blue-500",
  },
  {
    title: "Active Tasks",
    value: "28",
    icon: CheckCircle2,
    color: "bg-green-500",
  },
  {
    title: "Deliverables",
    value: "45",
    icon: FileText,
    color: "bg-purple-500",
  },
  { title: "Team Members", value: "8", icon: Users, color: "bg-orange-500" },
];

export default function MainDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Priority colors
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    med: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
  };

  // Progress bar colors
  const progressColors = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    yellow: "bg-[#ffe500]",
    green: "bg-green-500",
  };

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#444444]">Dashboard</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, tasks, deliverables..."
            className="h-9 w-64 rounded-md border border-gray-300 pl-9 pr-4 text-sm focus:border-[#ffe500] focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center">
              <div className={`mr-4 rounded-full ${kpi.color} p-3 text-white`}>
                <kpi.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {kpi.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Project Progress */}
        <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">
              Project Progress
            </h2>
            <Link
              href="/projects"
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              View all projects
              <TrendingUp className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {sampleProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-md border border-gray-200 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{project.title}</h3>
                  <span className="text-sm text-gray-500">
                    {project.progress}%
                  </span>
                </div>
                <div className="mb-3 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${
                      progressColors[
                        project.progressColor as keyof typeof progressColors
                      ]
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.avatar}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">Recent Tasks</h2>
            <Link
              href="/tasks"
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              View all tasks
              <TrendingUp className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {sampleTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-md border border-gray-200 p-3"
              >
                <div className="mb-2">
                  <p className="text-sm text-gray-800">{task.text}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                        priorityColors[
                          task.priority as keyof typeof priorityColors
                        ]
                      }`}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {task.date}
                    </span>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#27acaa] text-xs text-white">
                    {task.assignee}
                  </div>
                </div>
              </div>
            ))}
            <button className="flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 p-2 text-sm text-gray-500 hover:bg-gray-50">
              <Plus className="mr-1 h-4 w-4" />
              Add new task
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming Deliverables */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">
              Upcoming Deliverables
            </h2>
            <Link
              href="/schedule"
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              View schedule
              <TrendingUp className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {sampleDeliverablePhases.map((phase) => {
              const colorSet = {
                blue: "bg-blue-100 text-blue-800 border-l-4 border-blue-500",
                orange:
                  "bg-orange-100 text-orange-800 border-l-4 border-orange-500",
                yellow:
                  "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500",
                green:
                  "bg-green-100 text-green-800 border-l-4 border-green-500",
                purple:
                  "bg-purple-100 text-purple-800 border-l-4 border-purple-500",
              };

              return (
                <div
                  key={phase.id}
                  className={`rounded-md border border-gray-200 p-3 ${
                    colorSet[phase.color as keyof typeof colorSet]
                  }`}
                >
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800">{phase.title}</h4>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">
                      {phase.startDate.toLocaleDateString()} -{" "}
                      {phase.endDate.toLocaleDateString()}
                    </span>
                    <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Workload */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">Team Workload</h2>
            <Link
              href="/users"
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              View team
              <TrendingUp className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#27acaa] text-xs text-white">
                OK
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">
                    Ons Khiari
                  </p>
                  <span className="text-xs text-gray-500">85%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-[#27acaa]"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6366f1] text-xs text-white">
                JD
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">John Doe</p>
                  <span className="text-xs text-gray-500">65%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-[#6366f1]"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f43f5e] text-xs text-white">
                AS
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">
                    Anna Smith
                  </p>
                  <span className="text-xs text-gray-500">45%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-[#f43f5e]"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">
              Activity Summary
            </h2>
            <div className="flex items-center gap-2">
              <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <BarChart3 className="h-4 w-4" />
              </button>
              <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <PieChart className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex flex-col">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Tasks Completed
                </span>
                <span className="text-sm font-medium text-gray-800">24/36</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: "67%" }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Deliverables On Time
                </span>
                <span className="text-sm font-medium text-gray-800">18/20</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Budget Utilization
                </span>
                <span className="text-sm font-medium text-gray-800">75%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-orange-500"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Team Satisfaction
                </span>
                <span className="text-sm font-medium text-gray-800">92%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
