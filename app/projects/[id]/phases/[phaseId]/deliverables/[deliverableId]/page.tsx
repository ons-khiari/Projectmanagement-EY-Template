"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Link2,
  Plus,
  User,
  Users,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import type { Project } from "@/app/types/project";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";
import type { Deliverable } from "@/app/types/deliverable";
import type { Task } from "@/app/types/task";
import { TaskDetails } from "@/components/task/task-details";
import { Badge } from "@/components/ui/badge";

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
    // Other phases...
  ],
  // Other projects...
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
        // Other deliverables...
      ],
      // Other phases...
    },
    // Other projects...
  };

// Sample tasks
const sampleTasks: {
  [key: string]: { [key: string]: { [key: string]: Task[] } };
} = {
  "1": {
    "1": {
      "1": [
        {
          id: "1",
          text: "Conduct user interviews",
          priority: "high",
          date: "10 Jan 2023",
          assignee: "OK",
          project: "Dashboard design project",
          deliverable: "User Research Report",
          deliverablePhase: "Research & Planning",
          status: "done",
        },
        {
          id: "2",
          text: "Analyze survey results",
          priority: "med",
          date: "11 Jan 2023",
          assignee: "OK",
          project: "Dashboard design project",
          deliverable: "User Research Report",
          deliverablePhase: "Research & Planning",
          status: "done",
        },
        {
          id: "3",
          text: "Compile research findings",
          priority: "high",
          date: "12 Jan 2023",
          assignee: "OK",
          project: "Dashboard design project",
          deliverable: "User Research Report",
          deliverablePhase: "Research & Planning",
          status: "in-progress",
        },
        {
          id: "4",
          text: "Create user personas",
          priority: "med",
          date: "12 Jan 2023",
          assignee: "JD",
          project: "Dashboard design project",
          deliverable: "User Research Report",
          deliverablePhase: "Research & Planning",
          status: "todo",
        },
      ],
      // Other deliverables...
    },
    // Other phases...
  },
  // Other projects...
};

export default function DeliverableDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const phaseId = params.phaseId as string;
  const deliverableId = params.deliverableId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [phase, setPhase] = useState<DeliverablePhase | null>(null);
  const [deliverable, setDeliverable] = useState<Deliverable | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
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
        const foundDeliverable = phaseDeliverables.find(
          (d) => d.id === deliverableId
        );

        if (foundDeliverable) {
          setDeliverable(foundDeliverable);

          const projectTasks = sampleTasks[projectId] || {};
          const phaseTasks = projectTasks[phaseId] || {};
          const deliverableTasks = phaseTasks[deliverableId] || [];
          setTasks(deliverableTasks);
        }
      }
    }
  }, [projectId, phaseId, deliverableId]);

  // Priority colors
  const priorityColors = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    med: "bg-orange-100 text-orange-800 border-orange-200",
    high: "bg-red-100 text-red-800 border-red-200",
    default: "bg-gray-100 text-gray-800 border-gray-200", // Fallback color
  };

  // Status colors
  const statusColors = {
    todo: "bg-gray-100 text-gray-800 border-gray-200",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    done: "bg-green-100 text-green-800 border-green-200",
    default: "bg-gray-100 text-gray-800 border-gray-200", // Fallback color
  };

  const handleEdit = () => {
    router.push(
      `/projects/${projectId}/phases/${phaseId}/deliverables/${deliverableId}/edit`
    );
  };

  const handleDelete = () => {
    // In a real app, you would call an API to delete the deliverable
    console.log(`Deleting deliverable ${deliverableId}`);
    setShowDeleteModal(false);
    router.push(`/projects/${projectId}/phases/${phaseId}`);
  };

  if (!project || !phase || !deliverable) {
    return (
      <div className="flex h-screen w-full flex-col bg-white">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto p-6">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Deliverable not found</h2>
                <p className="mt-2 text-gray-600">
                  The deliverable you are looking for does not exist.
                </p>
                <Link
                  href={`/projects/${projectId}/phases/${phaseId}`}
                  className="mt-4 inline-block rounded-md bg-[#ffe500] px-4 py-2 font-medium text-[#444444]"
                >
                  Back to Phase
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
                  <Link
                    href={`/projects/${projectId}/phases/${phaseId}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {phase.title}
                  </Link>
                  <span className="text-gray-500">/</span>
                  <h1 className="text-2xl font-semibold text-[#444444]">
                    Deliverable {deliverable.priority_number}: &quot;
                    {deliverable.title}&quot;
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
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-[#444444]">
                  {deliverable.title}
                </h2>
                <Badge
                  className={
                    priorityColors[
                      deliverable.priority as keyof typeof priorityColors
                    ] || priorityColors.default
                  }
                >
                  {deliverable.priority.charAt(0).toUpperCase() +
                    deliverable.priority.slice(1)}
                </Badge>
                <Badge
                  className={`rounded-full px-2 py-1 text-xs font-medium bg-[#ffe500] text-gray-800 border-gray-200`}
                >
                  D{deliverable.priority_number}
                </Badge>
              </div>
            </div>

            <p className="mb-6 text-gray-600">{deliverable.description}</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium text-[#444444]">
                  Deliverable Details
                </h3>
                <div className="space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Due Date:
                    </span>
                    <div className="flex items-center text-sm text-gray-800">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      {deliverable.date}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Project:
                    </span>
                    <span className="text-sm text-gray-800">
                      {deliverable.project}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Phase:
                    </span>
                    <span className="text-sm text-gray-800">
                      {deliverable.deliverablePhase}
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
                  {deliverable.link && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Document:
                      </span>
                      <a
                        href={deliverable.link}
                        className="flex items-center text-sm text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Link2 className="mr-1 h-4 w-4" />
                        View Document
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-[#444444]">
                  Assigned To
                </h3>
                <div className="space-y-3 rounded-md border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Team Members:
                    </span>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {deliverable.assignee.length} assignee(s)
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {deliverable.assignee.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between bg-white p-2 rounded-md border border-gray-100"
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
                        <span className="text-xs text-gray-500">Assignee</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#444444]">Tasks</h2>
            <button className="flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]">
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
              <div className="text-center">
                <p className="text-gray-500">No tasks yet</p>
                <button className="mt-2 flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]">
                  <Plus className="h-4 w-4" />
                  <span>Add Task</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-md border border-gray-200 p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedTask(task);
                      setIsTaskDetailsOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          task.status === "done"
                            ? "bg-green-500 text-white"
                            : "border border-gray-300 bg-white"
                        }`}
                      >
                        {task.status === "done" && (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {task.text}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                            className={
                              priorityColors[
                                task.priority as keyof typeof priorityColors
                              ] || priorityColors.default
                            }
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </Badge>
                          <Badge
                            className={
                              task.status
                                ? statusColors[
                                    task.status as keyof typeof statusColors
                                  ] || statusColors.default
                                : statusColors.default
                            }
                          >
                            {task.status === "todo"
                              ? "To Do"
                              : task.status === "in-progress"
                              ? "In Progress"
                              : task.status === "done"
                              ? "Done"
                              : "To Do"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{task.date}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="mr-1 h-3 w-3" />
                        <span>{task.assignee}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <TaskDetails
            task={selectedTask}
            isOpen={isTaskDetailsOpen}
            onClose={() => setIsTaskDetailsOpen(false)}
          />

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Delete Deliverable
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
                    Are you sure you want to delete the deliverable :
                    {deliverable.title} ? This action cannot be undone and will
                    also delete all tasks associated with this deliverable.
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
