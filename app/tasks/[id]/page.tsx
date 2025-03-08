"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Edit,
  Plus,
  Trash2,
  ArrowLeft,
  Calendar,
  User,
  Briefcase,
  FileText,
  Layers,
  MessageSquare,
  Clock,
  CheckSquare,
  Square,
  Send,
  AlertCircle,
  ChevronRight,
  Tag,
  LinkIcon,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import type { Task } from "@/app/types/task";

// Sample task data - in a real app, you would fetch this from an API
const sampleTasks: Record<string, Task> = {
  "1": {
    id: "1",
    text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
    priority: "low",
    date: "23 August 2023",
    assignee: "OK",
    project: "Project 6",
    deliverable: "Deliverable 1",
    deliverablePhase: "Phase 1",
    status: "in-progress",
  },
  "2": {
    id: "2",
    text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
    priority: "med",
    date: "23 August 2023",
    assignee: "OK",
    project: "Project 6",
    deliverable: "Deliverable 1",
    deliverablePhase: "Phase 1",
    status: "in-progress",
  },
  "3": {
    id: "3",
    text: "En tant que nouvel utilisateur, je veux que mon compte soit créé après inscription.",
    priority: "high",
    date: "23 August 2023",
    assignee: "OK",
    project: "Project 6",
    deliverable: "Deliverable 1",
    deliverablePhase: "Phase 1",
    status: "in-progress",
  },
};

interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

interface Comment {
  id: string;
  user: string;
  userColor: string;
  text: string;
  timestamp: string;
}

export default function TaskDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [subTasks, setSubTasks] = useState<SubTask[]>([
    {
      id: "1",
      text: "En tant qu'enseignant, je souhaite créer un examen afin de pouvoir évaluer les connaissances des étudiants sur le contenu du cours",
      completed: true,
    },
    {
      id: "2",
      text: "En tant qu'enseignant, je souhaite créer un examen afin de pouvoir évaluer les connaissances des étudiants sur le contenu du cours",
      completed: false,
    },
    {
      id: "3",
      text: "En tant qu'enseignant, je souhaite créer un examen afin de pouvoir évaluer les connaissances des étudiants sur le contenu du cours",
      completed: false,
    },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "OK",
      userColor: "#27acaa",
      text: "I've started working on this task. Will update the progress soon.",
      timestamp: "2 days ago",
    },
    {
      id: "2",
      user: "JD",
      userColor: "#6366f1",
      text: "Let me know if you need any help with this.",
      timestamp: "1 day ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  // Fetch task data
  useEffect(() => {
    // In a real app, you would fetch the task from an API
    // For now, we'll use the sample data
    if (taskId && sampleTasks[taskId]) {
      setTask(sampleTasks[taskId]);
    } else {
      // If task not found, redirect to tasks page
      router.push("/tasks");
    }
  }, [taskId, router]);

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      user: "OK",
      userColor: "#27acaa",
      text: newComment,
      timestamp: "Just now",
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleDelete = () => {
    // In a real app, you would call an API to delete the task
    console.log("Deleting task:", task?.id);
    setShowDeleteConfirm(false);
    router.push("/tasks");
  };

  const toggleSubtaskCompletion = (id: string) => {
    setSubTasks(
      subTasks.map((st) =>
        st.id === id ? { ...st, completed: !st.completed } : st
      )
    );
  };

  if (!task) {
    return (
      <div className="flex h-screen w-full flex-col bg-white">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27acaa] mx-auto mb-4"></div>
                <p className="text-gray-500">Loading task details...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Priority colors
  const priorityColors = {
    low: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
      icon: "text-blue-500",
      gradient: "from-blue-50 to-blue-100",
    },
    med: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-200",
      icon: "text-orange-500",
      gradient: "from-orange-50 to-orange-100",
    },
    high: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      icon: "text-red-500",
      gradient: "from-red-50 to-red-100",
    },
  };

  // Status colors
  const statusColors = {
    todo: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
      icon: "text-gray-500",
      gradient: "from-gray-50 to-gray-100",
    },
    "in-progress": {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
      icon: "text-blue-500",
      gradient: "from-blue-50 to-blue-100",
    },
    done: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      icon: "text-green-500",
      gradient: "from-green-50 to-green-100",
    },
  };

  const priorityColor =
    priorityColors[task.priority as keyof typeof priorityColors] ||
    priorityColors.low;
  const statusColor = task.status
    ? statusColors[task.status as keyof typeof statusColors]
    : statusColors.todo;

  const completedSubtasks = subTasks.filter((st) => st.completed).length;
  const totalSubtasks = subTasks.length;
  const completionPercentage =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="container mx-auto max-w-5xl py-8 px-4 sm:px-6">
            {/* Breadcrumb navigation */}
            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <button
                  onClick={() => router.push("/tasks")}
                  className="hover:text-[#27acaa] transition-colors"
                >
                  Tasks
                </button>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="font-medium text-gray-900">Task Details</span>
              </div>
            </div>

            {/* Back button and title */}
            <div className="mb-8 flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 rounded-full p-2 text-gray-500 hover:bg-white hover:text-[#27acaa] hover:shadow-sm transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Task Details</h1>
            </div>

            {/* Task header card */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="relative">
                {/* Colored top border based on priority */}
                <div className={`h-1.5 w-full ${priorityColor.bg}`}></div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor.bg} ${priorityColor.text} ${priorityColor.border} flex items-center`}
                      >
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {task.priority.charAt(0).toUpperCase() +
                          task.priority.slice(1)}{" "}
                        Priority
                      </span>
                      {task.status && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border} flex items-center`}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {task.status === "todo"
                            ? "To Do"
                            : task.status === "in-progress"
                            ? "In Progress"
                            : "Done"}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/tasks/${task.id}/edit`)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-red-300 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:shadow-sm transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {task.text}
                  </h2>

                  {/* Task metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <User className={`h-5 w-5 mr-3 ${priorityColor.icon}`} />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Assigned to
                        </p>
                        <div className="flex items-center">
                          <div
                            className="h-6 w-6 rounded-full flex items-center justify-center text-xs text-white mr-2"
                            style={{
                              backgroundColor: getAvatarColor(task.assignee),
                            }}
                          >
                            {task.assignee || "UN"}
                          </div>
                          <span className="text-sm font-medium">
                            {task.assignee
                              ? getFullName(task.assignee)
                              : "Unassigned"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <Calendar
                        className={`h-5 w-5 mr-3 ${priorityColor.icon}`}
                      />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Due date</p>
                        <p className="text-sm font-medium">{task.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <Briefcase
                        className={`h-5 w-5 mr-3 ${priorityColor.icon}`}
                      />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Project</p>
                        <p className="text-sm font-medium">
                          {task.project || "Not assigned"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar for subtasks */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progress ({completedSubtasks}/{totalSubtasks} subtasks)
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {completionPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#27acaa] rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[#ffe500] rounded-md text-sm font-medium text-[#444444] hover:bg-[#f5dc00] hover:shadow-sm transition-all">
                      <Plus className="h-4 w-4" />
                      <span>Add sub-task</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all">
                      <LinkIcon className="h-4 w-4" />
                      <span>Copy link</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all">
                      <ExternalLink className="h-4 w-4" />
                      <span>Open in new tab</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200 bg-white rounded-t-xl shadow-sm">
              <div className="flex">
                <button
                  className={`flex items-center gap-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === "details"
                      ? "border-b-2 border-[#27acaa] text-[#444444] bg-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Details
                </button>
                <button
                  className={`flex items-center gap-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === "subtasks"
                      ? "border-b-2 border-[#27acaa] text-[#444444] bg-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("subtasks")}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Sub-tasks ({completedSubtasks}/{totalSubtasks})
                </button>
                <button
                  className={`flex items-center gap-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === "comments"
                      ? "border-b-2 border-[#27acaa] text-[#444444] bg-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("comments")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comments ({comments.length})
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-b-xl shadow-sm p-6 mb-8">
              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-[#27acaa]" />
                        Task Information
                      </h3>
                      <button className="text-sm text-[#27acaa] hover:text-[#1d8a89] hover:underline flex items-center transition-colors">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center p-3 rounded-lg bg-white border border-gray-100 hover:border-[#27acaa] transition-colors">
                          <User className="h-4 w-4 text-gray-500 mr-3" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-600 block mb-1">
                              Assigned to:
                            </span>
                            <div className="flex items-center">
                              <div
                                className="h-6 w-6 rounded-full flex items-center justify-center text-xs text-white"
                                style={{
                                  backgroundColor: getAvatarColor(
                                    task.assignee
                                  ),
                                }}
                              >
                                {task.assignee || "UN"}
                              </div>
                              <span className="text-sm ml-2 font-medium">
                                {task.assignee
                                  ? getFullName(task.assignee)
                                  : "Unassigned"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center p-3 rounded-lg bg-white border border-gray-100 hover:border-[#27acaa] transition-colors">
                          <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-600 block mb-1">
                              Due date:
                            </span>
                            <span className="text-sm font-medium">
                              {task.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center p-3 rounded-lg bg-white border border-gray-100 hover:border-[#27acaa] transition-colors">
                          <Briefcase className="h-4 w-4 text-gray-500 mr-3" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-600 block mb-1">
                              Project:
                            </span>
                            <span className="text-sm font-medium">
                              {task.project || "Not assigned"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center p-3 rounded-lg bg-white border border-gray-100 hover:border-[#27acaa] transition-colors">
                          <FileText className="h-4 w-4 text-gray-500 mr-3" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-600 block mb-1">
                              Deliverable:
                            </span>
                            <span className="text-sm font-medium">
                              {task.deliverable || "Not assigned"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center p-3 rounded-lg bg-white border border-gray-100 hover:border-[#27acaa] transition-colors">
                          <Layers className="h-4 w-4 text-gray-500 mr-3" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-600 block mb-1">
                              Phase:
                            </span>
                            <span className="text-sm font-medium">
                              {task.deliverablePhase || "Not assigned"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center p-3 rounded-lg bg-white border border-gray-100 hover:border-[#27acaa] transition-colors">
                        <User className="h-4 w-4 text-gray-500 mr-3" />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-600 block mb-1">
                            Project Manager:
                          </span>
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full flex items-center justify-center text-xs text-white bg-[#27acaa]">
                              OK
                            </div>
                            <span className="text-sm ml-2 font-medium">
                              Ons Khiari
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-[#27acaa]" />
                        Description
                      </h3>
                      <button className="text-sm text-[#27acaa] hover:text-[#1d8a89] hover:underline flex items-center transition-colors">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {task.text}
                      </p>
                      {!task.text && (
                        <div className="flex items-center justify-center py-8 text-gray-400">
                          <span>No description provided</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Subtasks Tab */}
              {activeTab === "subtasks" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <CheckSquare className="h-5 w-5 mr-2 text-[#27acaa]" />
                      Sub-tasks ({completedSubtasks}/{totalSubtasks})
                    </h3>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[#ffe500] rounded-md text-sm font-medium text-[#444444] hover:bg-[#f5dc00] hover:shadow-sm transition-all">
                      <Plus className="h-4 w-4" />
                      Add Sub-task
                    </button>
                  </div>

                  <div className="space-y-3">
                    {subTasks.map((subTask) => (
                      <div
                        key={subTask.id}
                        className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 bg-white hover:shadow-sm"
                      >
                        <button
                          onClick={() => toggleSubtaskCompletion(subTask.id)}
                          className="mt-0.5 text-gray-500 hover:text-[#27acaa] transition-colors"
                        >
                          {subTask.completed ? (
                            <CheckSquare className="h-5 w-5 text-[#27acaa]" />
                          ) : (
                            <Square className="h-5 w-5" />
                          )}
                        </button>
                        <div className="flex-1">
                          <span
                            className={`text-sm leading-relaxed ${
                              subTask.completed
                                ? "line-through text-gray-400"
                                : "text-gray-700"
                            }`}
                          >
                            {subTask.text}
                          </span>
                          {subTask.completed && (
                            <p className="text-xs text-gray-400 mt-1">
                              Completed
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <button className="p-1 text-gray-400 hover:text-[#27acaa] rounded-full hover:bg-gray-100 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {subTasks.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckSquare className="h-12 w-12 mb-3 opacity-20" />
                        <span className="text-lg font-medium mb-1">
                          No sub-tasks yet
                        </span>
                        <p className="text-sm text-gray-500 mb-4">
                          Break down this task into smaller steps
                        </p>
                        <button className="flex items-center gap-1 px-4 py-2 bg-[#ffe500] rounded-md text-sm font-medium text-[#444444] hover:bg-[#f5dc00] hover:shadow-sm transition-all">
                          <Plus className="h-4 w-4" />
                          Add your first sub-task
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Comments Tab */}
              {activeTab === "comments" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-[#27acaa]" />
                    Comments ({comments.length})
                  </h3>

                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6">
                    <textarea
                      className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#27acaa] focus:ring-1 focus:ring-[#27acaa] resize-none transition-all"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex flex-wrap items-center gap-2">
                        <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs text-gray-700 hover:bg-gray-200 transition-colors">
                          Looks good!
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs text-gray-700 hover:bg-gray-200 transition-colors">
                          Need help?
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs text-gray-700 hover:bg-gray-200 transition-colors">
                          Can you clarify..?
                        </button>
                      </div>
                      <button
                        onClick={addComment}
                        disabled={!newComment.trim()}
                        className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          newComment.trim()
                            ? "bg-[#ffe500] text-[#444444] hover:bg-[#f5dc00] hover:shadow-sm"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <Send className="h-4 w-4" />
                        Post
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center text-sm text-white"
                            style={{ backgroundColor: comment.userColor }}
                          >
                            {comment.user}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium block">
                              {getFullName(comment.user)}
                            </span>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {comment.timestamp}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1 text-gray-400 hover:text-[#27acaa] rounded-full hover:bg-gray-100 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    ))}

                    {comments.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-50 rounded-lg border border-gray-200">
                        <MessageSquare className="h-12 w-12 mb-3 opacity-20" />
                        <span className="text-lg font-medium mb-1">
                          No comments yet
                        </span>
                        <p className="text-sm text-gray-500">
                          Be the first to share your thoughts
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl animate-fadeIn">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Delete Task</h3>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-center bg-red-50 text-red-500 p-4 rounded-lg mb-4">
                <AlertCircle className="h-6 w-6 mr-2" />
                <p className="text-sm font-medium">
                  This action cannot be undone
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this task? This will also delete
                all sub-tasks and comments associated with this task.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
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

// Helper function to get avatar color
function getAvatarColor(initials: string): string {
  switch (initials) {
    case "OK":
      return "#27acaa";
    case "JD":
      return "#6366f1";
    case "AS":
      return "#f43f5e";
    case "MK":
      return "#8b5cf6";
    case "RL":
      return "#ec4899";
    default:
      return "#94a3b8";
  }
}
