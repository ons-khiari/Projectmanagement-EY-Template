"use client";

import { useState, useEffect } from "react";
import { Search, Edit, Settings, Plus } from "lucide-react";
import ProjectCard from "./project-card";
import type { Project } from "@/app/types/project";
import {
  ProjectFilterBar,
  type ProjectFilterState,
} from "./project-filter";
import { AddProjectModal } from "./add-project-modal";

// Sample project data with different progress bar colors
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Dashboard design project",
    description:
      "The project is about designing a web application's Dashboard. The team members should create the design system, the logos and the components we need.",
    progress: 50,
    progressColor: "blue",
    startDate: "10 Jan 2023",
    endDate: "30 Jan 2023",
    projectManager: { id: "1", avatar: "OK", color: "#27acaa" },
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
      { id: "5", avatar: "RL", color: "#ec4899" },
    ],
    client: {
      id: "1",
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      type: "company",
    },
  },
  {
    id: "2",
    title: "Mobile app development",
    description:
      "Developing a mobile application for both iOS and Android platforms. The team will handle UI/UX design, development, and testing phases.",
    progress: 75,
    progressColor: "orange",
    startDate: "15 Feb 2023",
    endDate: "30 Apr 2023",
    projectManager: { id: "2", avatar: "JD", color: "#6366f1" },
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
      { id: "5", avatar: "RL", color: "#ec4899" },
    ],
    client: {
      id: "2",
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      type: "company",
    },
  },
  {
    id: "3",
    title: "Marketing campaign",
    description:
      "Planning and executing a comprehensive marketing campaign for the new product launch. Includes social media, email marketing, and PR activities.",
    progress: 25,
    progressColor: "yellow",
    startDate: "1 Mar 2023",
    endDate: "15 May 2023",
    projectManager: { id: "3", avatar: "AS", color: "#f43f5e" },
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
    ],
    client: {
      id: "3",
      name: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      type: "company",
    },
  },
  {
    id: "4",
    title: "Website redesign",
    description:
      "Complete overhaul of the company website with focus on improved user experience, modern design, and better conversion rates.",
    progress: 90,
    progressColor: "blue",
    startDate: "5 Apr 2023",
    endDate: "20 Jun 2023",
    projectManager: { id: "4", avatar: "MK", color: "#8b5cf6" },
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
    ],
    client: {
      id: "4",
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      type: "company",
    },
  },
];

export default function ProjectsDashboard() {
  const [activeTab, setActiveTab] = useState("myProjects");
  const [projects, setProjects] = useState(sampleProjects);
  const [filteredProjects, setFilteredProjects] = useState(sampleProjects);
  const [filters, setFilters] = useState<ProjectFilterState>({
    projectManager: null,
    members: null,
    startDate: null,
    endDate: null,
    progress: null,
  });

  // Apply filters to projects
  useEffect(() => {
    const newFilteredProjects = projects.filter((project) => {
     

      // Filter by members (multi-select)
      if (filters.members && filters.members.length > 0) {
        const memberAvatars = project.members.map((m) => m.avatar);
        // Check if any of the selected members are in this project
        const hasMatchingMember = filters.members.some((m) =>
          memberAvatars.includes(m)
        );
        if (!hasMatchingMember) return false;
      }

      // Filter by start date
      if (filters.startDate) {
        const projectStartDate = new Date(project.startDate);
        const filterStartDate = new Date(filters.startDate);

        if (projectStartDate < filterStartDate) {
          return false;
        }
      }

      // Filter by end date
      if (filters.endDate) {
        const projectEndDate = new Date(project.endDate);
        const filterEndDate = new Date(filters.endDate);

        if (projectEndDate > filterEndDate) {
          return false;
        }
      }

      // Filter by progress
      if (filters.progress !== null) {
        if (project.progress < filters.progress) {
          return false;
        }
      }

      return true;
    });

    setFilteredProjects(newFilteredProjects);
  }, [projects, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: ProjectFilterState) => {
    setFilters(newFilters);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add this function to handle adding a new project:
  const handleAddProject = (newProject: Partial<Project>) => {
    const projectWithId = {
      ...newProject,
      id: (projects.length + 1).toString(), // Create a unique ID
    } as Project;

    setProjects([...projects, projectWithId]);
  };

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

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]"
        >
          <Plus className="h-4 w-4" />
          <span>Add project</span>
        </button>
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProject}
      />
      
      {/* Filter Bar */}
      <ProjectFilterBar onFilterChange={handleFilterChange} />

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
        {filteredProjects.length === 0 ? (
          <div className="flex justify-center items-center h-40 text-gray-500">
            No projects match your filters
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
