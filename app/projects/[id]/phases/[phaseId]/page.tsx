"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus, Edit, Trash2, X } from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import type { Project } from "@/app/types/project";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";
import type { Deliverable } from "@/app/types/deliverable";

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
    client: {
      id: "1",
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      type: "company",
    },
  },
  // Other projects...
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
  // Other phases...
};

// Sample deliverables
const sampleDeliverables: { [key: string]: { [key: string]: Deliverable[] } } =
  {
    "1": {
      "1": [
        {
          id: "1",
          title: "User Research Report",
          description: "Comprehensive analysis of user needs and preferences",
          link: "/documents/user-research.pdf",
          project: "Dashboard design project",
          priority: "high",
          priority_number: 1,
          date: "12 Jan 2023",
          assignee: [{ id: "1", avatar: "OK", color: "#27acaa" }],
          deliverablePhase: "Research & Planning",
          status: "done",
        },
        {
          id: "2",
          title: "Competitor Analysis",
          description: "Analysis of competing dashboard solutions",
          link: "/documents/competitor-analysis.pdf",
          project: "Dashboard design project",
          priority: "med",
          priority_number: 2,
          date: "14 Jan 2023",
          assignee: [{ id: "2", avatar: "JD", color: "#6366f1" }],
          deliverablePhase: "Research & Planning",
          status: "done",
        },
      ],
      "2": [
        {
          id: "3",
          title: "Wireframes",
          description: "Low-fidelity wireframes for dashboard layout",
          link: "/documents/wireframes.pdf",
          project: "Dashboard design project",
          priority: "high",
          priority_number: 1,
          date: "18 Jan 2023",
          assignee: [{ id: "3", avatar: "AS", color: "#f43f5e" }],
          deliverablePhase: "Design & Prototyping",
          status: "in-progress",
        },
        {
          id: "4",
          title: "Design System",
          description: "UI components and style guide",
          link: "/documents/design-system.pdf",
          project: "Dashboard design project",
          priority: "high",
          priority_number: 1,
          date: "20 Jan 2023",
          assignee: [
            { id: "3", avatar: "AS", color: "#f43f5e" },
            { id: "5", avatar: "RL", color: "#ec4899" },
          ],
          deliverablePhase: "Design & Prototyping",
          status: "todo",
        },
      ],
      "3": [
        {
          id: "5",
          title: "Frontend Implementation",
          description: "Implementation of dashboard UI components",
          link: "/documents/frontend-implementation.pdf",
          project: "Dashboard design project",
          priority: "high",
          priority_number: 1,
          date: "25 Jan 2023",
          assignee: [{ id: "4", avatar: "MK", color: "#8b5cf6" }],
          deliverablePhase: "Development & Testing",
          status: "todo",
        },
        {
          id: "6",
          title: "Testing Report",
          description: "Results of user testing and feedback",
          link: "/documents/testing-report.pdf",
          project: "Dashboard design project",
          priority: "med",
          priority_number: 2,
          date: "28 Jan 2023",
          assignee: [
            { id: "1", avatar: "OK", color: "#27acaa" },
            { id: "2", avatar: "JD", color: "#6366f1" },
          ],
          deliverablePhase: "Development & Testing",
          status: "todo",
        },
      ],
    },
    // Other projects and phases...
  };

export default function DeliverablePhaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const phaseId = params.phaseId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [phase, setPhase] = useState<DeliverablePhase | null>(null);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundProject = sampleProjects.find((p) => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);

      const phases = sampleDeliverablePhases[projectId] || [];
      const foundPhase = phases.find((p) => p.id === phaseId);
      if (foundPhase) {
        setPhase(foundPhase);

        const projectDeliverables = sampleDeliverables[projectId] || {};
        const phaseDeliverables = projectDeliverables[phaseId] || [];
        setDeliverables(phaseDeliverables);
      }
    }
  }, [projectId, phaseId]);

  // Priority colors
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    med: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800", // Fallback color
  };

  // Phase colors
  const phaseColors = {
    blue: "border-l-4 border-blue-500 bg-blue-50",
    orange: "border-l-4 border-orange-500 bg-orange-50",
    yellow: "border-l-4 border-yellow-500 bg-yellow-50",
    green: "border-l-4 border-green-500 bg-green-50",
    default: "border-l-4 border-gray-500 bg-gray-50", // Fallback color
  };

  const handleEdit = () => {
    router.push(`/projects/${projectId}/phases/${phaseId}/edit`);
  };

  const handleDelete = () => {
    // In a real app, you would call an API to delete the phase
    console.log(`Deleting phase ${phaseId}`);
    setShowDeleteModal(false);
    router.push(`/projects/${projectId}`);
  };

  if (!project || !phase) {
    return (
      <div className="flex h-screen w-full flex-col bg-white">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto p-6">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Phase not found</h2>
                <p className="mt-2 text-gray-600">
                  The deliverable phase you are looking for does not exist.
                </p>
                <Link
                  href={`/projects/${projectId}`}
                  className="mt-4 inline-block rounded-md bg-[#ffe500] px-4 py-2 font-medium text-[#444444]"
                >
                  Back to Project
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-3 rounded-full p-1 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/projects/${projectId}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {project.title}
                  </Link>
                  <span className="text-gray-500">/</span>
                  <h1 className="text-2xl font-semibold text-[#444444]">
                    {phase.title}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-1 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#444444]">
                Phase Details
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium text-[#444444]">
                  Phase Information
                </h3>
                <div
                  className={`space-y-3 rounded-md border p-4 ${
                    phase.color
                      ? phaseColors[phase.color as keyof typeof phaseColors] ||
                        phaseColors.default
                      : phaseColors.default
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Phase:
                    </span>
                    <span className="text-sm text-gray-800">{phase.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Start Date:
                    </span>
                    <span className="text-sm text-gray-800">
                      {phase.startDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      End Date:
                    </span>
                    <span className="text-sm text-gray-800">
                      {phase.endDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Project:
                    </span>
                    <span className="text-sm text-gray-800">
                      {project.title}
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
                  Timeline
                </h3>
                <div className="space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Duration:
                    </span>
                    <span className="text-sm text-gray-800">
                      {Math.ceil(
                        (phase.endDate.getTime() - phase.startDate.getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Status:
                    </span>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {new Date() > phase.endDate
                        ? "Completed"
                        : new Date() >= phase.startDate
                        ? "In Progress"
                        : "Upcoming"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#444444]">
              Deliverables
            </h2>
            <button className="flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]">
              <Plus className="h-4 w-4" />
              <span>Add Deliverable</span>
            </button>
          </div>

          {deliverables.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
              <div className="text-center">
                <p className="text-gray-500">No deliverables yet</p>
                <button className="mt-2 flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]">
                  <Plus className="h-4 w-4" />
                  <span>Add Deliverable</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((deliverable) => (
                <Link
                  key={deliverable.id}
                  href={`/projects/${projectId}/phases/${phaseId}/deliverables/${deliverable.id}`}
                  className="block"
                >
                  <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md relative">
                    {/* Deliverable Number Badge */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#ffe500] rounded-full flex items-center justify-center font-bold text-[#444444] border-2 border-white shadow-sm">
                      D{deliverable.priority_number}
                    </div>

                    <div className="mb-2 flex items-center justify-between pl-6">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                          deliverable.priority
                            ? priorityColors[
                                deliverable.priority as keyof typeof priorityColors
                              ] || priorityColors.default
                            : priorityColors.default
                        }`}
                      >
                        {deliverable.priority
                          ? deliverable.priority.charAt(0).toUpperCase() +
                            deliverable.priority.slice(1)
                          : "Normal"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {deliverable.date}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800">
                      Deliverable {deliverable.priority_number}:{" "}
                      {deliverable.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {deliverable.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {deliverable.assignee.map((member) => (
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
                </Link>
              ))}
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Delete Phase
                  </h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mb-5">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete the phase &quot;
                    {phase.title} &quot; ? This action cannot be undone and will
                    also delete all deliverables associated with this phase.
                  </p>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded-md border border-red-300 bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
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
