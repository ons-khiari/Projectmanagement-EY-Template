"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import type { Project } from "@/app/types/project";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";

// Sample project data
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
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
      { id: "5", avatar: "RL", color: "#ec4899" },
    ],
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
    projectManager: { id: "3", avatar: "AS", color: "#f43f5e" },
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
      { id: "5", avatar: "RL", color: "#ec4899" },
    ],
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
    projectManager: { id: "2", avatar: "JD", color: "#6366f1" },
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
    ],
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
    projectManager: { id: "5", avatar: "RL", color: "#ec4899" },
    members: [
      { id: "1", avatar: "OK", color: "#27acaa" },
      { id: "2", avatar: "JD", color: "#6366f1" },
      { id: "3", avatar: "AS", color: "#f43f5e" },
      { id: "4", avatar: "MK", color: "#8b5cf6" },
    ],
  },
];

// Sample deliverable phases
const sampleDeliverablePhases: { [key: string]: DeliverablePhase[] } = {
  "1": [
    {
      id: "1",
      title: "Research & Planning",
      startDate: new Date(2023, 0, 10),
      endDate: new Date(2023, 0, 15),
      color: "blue",
    },
    {
      id: "2",
      title: "Design & Prototyping",
      startDate: new Date(2023, 0, 16),
      endDate: new Date(2023, 0, 22),
      color: "orange",
    },
    {
      id: "3",
      title: "Development & Testing",
      startDate: new Date(2023, 0, 23),
      endDate: new Date(2023, 0, 30),
      color: "yellow",
    },
  ],
  "2": [
    {
      id: "1",
      title: "Requirements Gathering",
      startDate: new Date(2023, 1, 15),
      endDate: new Date(2023, 1, 28),
      color: "blue",
    },
    {
      id: "2",
      title: "UI/UX Design",
      startDate: new Date(2023, 2, 1),
      endDate: new Date(2023, 2, 31),
      color: "orange",
    },
    {
      id: "3",
      title: "Development",
      startDate: new Date(2023, 3, 1),
      endDate: new Date(2023, 3, 20),
      color: "yellow",
    },
    {
      id: "4",
      title: "Testing & Deployment",
      startDate: new Date(2023, 3, 21),
      endDate: new Date(2023, 3, 30),
      color: "green",
    },
  ],
  "3": [
    {
      id: "1",
      title: "Market Research",
      startDate: new Date(2023, 2, 1),
      endDate: new Date(2023, 2, 15),
      color: "blue",
    },
    {
      id: "2",
      title: "Campaign Planning",
      startDate: new Date(2023, 2, 16),
      endDate: new Date(2023, 3, 15),
      color: "orange",
    },
    {
      id: "3",
      title: "Execution & Monitoring",
      startDate: new Date(2023, 3, 16),
      endDate: new Date(2023, 4, 15),
      color: "yellow",
    },
  ],
  "4": [
    {
      id: "1",
      title: "Site Analysis",
      startDate: new Date(2023, 3, 5),
      endDate: new Date(2023, 3, 20),
      color: "blue",
    },
    {
      id: "2",
      title: "Design & Wireframing",
      startDate: new Date(2023, 3, 21),
      endDate: new Date(2023, 4, 20),
      color: "orange",
    },
    {
      id: "3",
      title: "Development",
      startDate: new Date(2023, 4, 21),
      endDate: new Date(2023, 5, 10),
      color: "yellow",
    },
    {
      id: "4",
      title: "Testing & Launch",
      startDate: new Date(2023, 5, 11),
      endDate: new Date(2023, 5, 20),
      color: "green",
    },
  ],
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [deliverablePhases, setDeliverablePhases] = useState<
    DeliverablePhase[]
  >([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundProject = sampleProjects.find((p) => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      setDeliverablePhases(sampleDeliverablePhases[projectId] || []);
    }
  }, [projectId]);

  // Progress bar colors with a default fallback
  const progressColors = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    yellow: "bg-[#ffe500]",
    default: "bg-gray-500", // Fallback color
  };

  // Phase card colors
  const phaseColors = {
    blue: "border-l-4 border-blue-500 bg-blue-50",
    orange: "border-l-4 border-orange-500 bg-orange-50",
    yellow: "border-l-4 border-yellow-500 bg-yellow-50",
    green: "border-l-4 border-green-500 bg-green-50",
    default: "border-l-4 border-gray-500 bg-gray-50", // Fallback color
  };

  if (!project) {
    return (
      <div className="flex h-screen w-full flex-col bg-white">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto p-6">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Project not found</h2>
                <p className="mt-2 text-gray-600">
                  The project you are looking for does not exist.
                </p>
                <Link
                  href="/projects"
                  className="mt-4 inline-block rounded-md bg-[#ffe500] px-4 py-2 font-medium text-[#444444]"
                >
                  Back to Projects
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Use the progressColor if it exists, otherwise use the default
  const progressColor = project.progressColor
    ? progressColors[project.progressColor as keyof typeof progressColors] ||
      progressColors.default
    : progressColors.default;

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-3 rounded-full p-1 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </button>
            <h1 className="text-2xl font-semibold text-[#444444]">
              Project Details
            </h1>
          </div>

          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#444444]">
                {project.title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {project.progress}% completed
                </span>
              </div>
            </div>

            <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full ${progressColor}`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            <p className="mb-6 text-gray-600">{project.description}</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium text-[#444444]">
                  Project Details
                </h3>
                <div className="space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Start Date:
                    </span>
                    <span className="text-sm text-gray-800">
                      {project.startDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      End Date:
                    </span>
                    <span className="text-sm text-gray-800">
                      {project.endDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Status:
                    </span>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {project.progress < 100 ? "In Progress" : "Completed"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Project Manager:
                    </span>
                    <div className="flex items-center">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white mr-2"
                        style={{
                          backgroundColor: project.projectManager.color,
                        }}
                      >
                        {project.projectManager.avatar}
                      </div>
                      <span className="text-sm text-gray-800">
                        {getFullName(project.projectManager.avatar)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-[#444444]">
                  Team Members
                </h3>
                <div className="space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
                  {project.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-xs text-white"
                          style={{ backgroundColor: member.color }}
                        >
                          {member.avatar}
                        </div>
                        <span className="ml-3 text-sm text-gray-800">
                          {getFullName(member.avatar)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">Team Member</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#444444]">
              Deliverable Phases
            </h2>
            <button className="flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]">
              <Plus className="h-4 w-4" />
              <span>Add Phase</span>
            </button>
          </div>

          {deliverablePhases.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
              <div className="text-center">
                <p className="text-gray-500">No deliverable phases yet</p>
                <button className="mt-2 flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]">
                  <Plus className="h-4 w-4" />
                  <span>Add Phase</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {deliverablePhases.map((phase) => (
                <Link
                  key={phase.id}
                  href={`/projects/${projectId}/phases/${phase.id}`}
                  className="block"
                >
                  <div
                    className={`rounded-md border p-4 shadow-sm transition-all hover:shadow-md ${
                      phase.color
                        ? phaseColors[
                            phase.color as keyof typeof phaseColors
                          ] || phaseColors.default
                        : phaseColors.default
                    }`}
                  >
                    <h3 className="mb-3 text-lg font-medium text-gray-800">
                      {phase.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>
                          {phase.startDate.toLocaleDateString()} -{" "}
                          {phase.endDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Helper function to get full name from initials
function getFullName(initials: string): string {
  switch (initials) {
    case "OK":
      return "Ons Khiari";
    case "JD":
      return "John Doe";
    case "AS":
      return "Anna Smith";
    case "MK":
      return "Mike Kim";
    case "RL":
      return "Rachel Lee";
    default:
      return initials;
  }
}
