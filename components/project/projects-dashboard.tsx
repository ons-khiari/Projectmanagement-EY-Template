"use client";

import { useState } from "react";
import { Search, Edit, Settings, Plus, Eye } from "lucide-react";
import ProjectCard from "./project-card";
import type { Project } from "@/app/types/project";

// Sample project data with different progress bar colors
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Dashboard design project",
    description:
      "The project is about designing a web application's Dashboard. The team members should create the design system, the logos and the components we need.",
    progress: 50,
    progressColor: "blue",
    startDate: "10 Jan",
    endDate: "30 Jan",
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
      { id: "5", avatar: "RL", color: "#ec4899" },
    ],
  },
  {
    id: "2",
    title: "Dashboard design project",
    description:
      "The project is about designing a web application's Dashboard. The team members should create the design system, the logos and the components we need.",
    progress: 50,
    progressColor: "orange",
    startDate: "10 Jan",
    endDate: "30 Jan",
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
      { id: "5", avatar: "RL", color: "#ec4899" },
    ],
  },
  {
    id: "3",
    title: "Dashboard design project",
    description:
      "The project is about designing a web application's Dashboard. The team members should create the design system, the logos and the components we need.",
    progress: 50,
    progressColor: "yellow",
    startDate: "10 Jan",
    endDate: "30 Jan",
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
    ],
  },
  {
    id: "4",
    title: "Dashboard design project",
    description:
      "The project is about designing a web application's Dashboard. The team members should create the design system, the logos and the components we need.",
    progress: 50,
    progressColor: "blue",
    startDate: "10 Jan",
    endDate: "30 Jan",
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
    ],
  },
];

export default function ProjectsDashboard() {
  const [activeTab, setActiveTab] = useState("myProjects");
  const [projects, setProjects] = useState(sampleProjects);
  const [viewOnly, setViewOnly] = useState(false);

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#444444]">Projects/</h1>
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
          <span>Add project</span>
        </button>
      </div>

      <div className="mb-4 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            className={`border-b-2 px-1 py-2 text-sm font-medium ${
              activeTab === "myProjects"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("myProjects")}
          >
            My projects
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

      <div className="bg-gray-50 p-4">
        {/* <div className="mb-4 flex items-center">
          <button
            className="flex items-center gap-1 text-sm text-gray-600"
            onClick={() => setViewOnly(!viewOnly)}
          >
            <Eye className="h-4 w-4" />
            <span>View Only :</span>
          </button>
        </div> */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
