"use client";

import type { Task } from "@/app/types/task";
import { useState, useRef, useEffect } from "react";
import {
  Edit,
  Plus,
  Trash2,
  X,
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
} from "lucide-react";

interface TaskDetailsProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export function TaskDetails({ task, isOpen, onClose }: TaskDetailsProps) {
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

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
    onClose();
  };

  const toggleSubtaskCompletion = (id: string) => {
    setSubTasks(
      subTasks.map((st) =>
        st.id === id ? { ...st, completed: !st.completed } : st
      )
    );
  };

  if (!task || !isOpen) return null;

  // Priority colors
  const priorityColors = {
    low: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
    },
    med: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-200",
    },
    high: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
    },
  };

  // Status colors
  const statusColors = {
    todo: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
    },
    "in-progress": {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
    },
    done: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
    },
  };

  const priorityColor =
    priorityColors[task.priority as keyof typeof priorityColors] ||
    priorityColors.low;
  const statusColor = task.status
    ? statusColors[task.status as keyof typeof statusColors]
    : statusColors.todo;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-lg flex flex-col h-full"
        style={{ animation: "slideIn 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColor.bg} ${priorityColor.text} ${priorityColor.border}`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
                Priority
              </span>
              {task.status && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
                >
                  {task.status === "todo"
                    ? "To Do"
                    : task.status === "in-progress"
                    ? "In Progress"
                    : "Done"}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4">{task.text}</h2>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Plus className="h-4 w-4" />
              Add sub-task
            </button>
            <div className="ml-auto flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-red-300 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex">
            <button
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                activeTab === "details"
                  ? "border-b-2 border-[#27acaa] text-[#444444]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("details")}
            >
              <FileText className="h-4 w-4" />
              Details
            </button>
            <button
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                activeTab === "subtasks"
                  ? "border-b-2 border-[#27acaa] text-[#444444]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("subtasks")}
            >
              <CheckSquare className="h-4 w-4" />
              Sub-tasks
            </button>
            <button
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                activeTab === "comments"
                  ? "border-b-2 border-[#27acaa] text-[#444444]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("comments")}
            >
              <MessageSquare className="h-4 w-4" />
              Comments
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Task Information
                  </h3>
                  <button className="text-xs text-blue-600 hover:underline flex items-center">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          Assigned to:
                        </span>
                        <div className="flex items-center ml-auto">
                          <div
                            className="h-6 w-6 rounded-full flex items-center justify-center text-xs text-white"
                            style={{
                              backgroundColor: getAvatarColor(task.assignee),
                            }}
                          >
                            {task.assignee || "UN"}
                          </div>
                          <span className="text-sm ml-2">
                            {task.assignee
                              ? getFullName(task.assignee)
                              : "Unassigned"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          Due date:
                        </span>
                        <span className="text-sm ml-auto">{task.date}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          Project:
                        </span>
                        <span className="text-sm ml-auto">
                          {task.project || "Not assigned"}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          Deliverable:
                        </span>
                        <span className="text-sm ml-auto">
                          {task.deliverable || "Not assigned"}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <Layers className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          Phase:
                        </span>
                        <span className="text-sm ml-auto">
                          {task.deliverablePhase || "Not assigned"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-600">
                        Project Manager:
                      </span>
                      <div className="flex items-center ml-auto">
                        <div className="h-6 w-6 rounded-full flex items-center justify-center text-xs text-white bg-[#27acaa]">
                          OK
                        </div>
                        <span className="text-sm ml-2">Ons Khiari</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Description
                  </h3>
                  <button className="text-xs text-blue-600 hover:underline flex items-center">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600">{task.text}</p>
                  {!task.text && (
                    <div className="flex items-center justify-center py-4 text-gray-400">
                      <span>No description provided</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Subtasks Tab */}
          {activeTab === "subtasks" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">
                  Sub-tasks ({subTasks.filter((st) => st.completed).length}/
                  {subTasks.length})
                </h3>
                <button className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50">
                  <Plus className="h-3 w-3" />
                  Add
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="space-y-2">
                  {subTasks.map((subTask) => (
                    <div
                      key={subTask.id}
                      className="flex items-start gap-2 p-3 rounded-md hover:bg-gray-100 transition-colors border border-gray-100 bg-white"
                    >
                      <button
                        onClick={() => toggleSubtaskCompletion(subTask.id)}
                        className="mt-0.5 text-gray-500 hover:text-[#27acaa]"
                      >
                        {subTask.completed ? (
                          <CheckSquare className="h-4 w-4 text-[#27acaa]" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                      <span
                        className={`text-sm leading-tight ${
                          subTask.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                      >
                        {subTask.text}
                      </span>
                    </div>
                  ))}

                  {subTasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <CheckSquare className="h-8 w-8 mb-2 opacity-20" />
                      <span>No sub-tasks yet</span>
                      <button className="mt-4 flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Plus className="h-3 w-3" />
                        Add your first sub-task
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Comments ({comments.length})
              </h3>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <textarea
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#27acaa] resize-none"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700 hover:bg-gray-300">
                      Looks good!
                    </button>
                    <button className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700 hover:bg-gray-300">
                      Need help?
                    </button>
                    <button className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-700 hover:bg-gray-300">
                      Can you clarify..?
                    </button>
                  </div>
                  <button
                    onClick={addComment}
                    disabled={!newComment.trim()}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium ${
                      newComment.trim()
                        ? "bg-[#ffe500] text-[#444444] hover:bg-[#f5dc00]"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Send className="h-3 w-3" />
                    Post
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="h-6 w-6 rounded-full flex items-center justify-center text-xs text-white"
                        style={{ backgroundColor: comment.userColor }}
                      >
                        {comment.user}
                      </div>
                      <span className="text-sm font-medium">
                        {getFullName(comment.user)}
                      </span>
                      <div className="flex items-center ml-auto text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {comment.timestamp}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>
                ))}

                {comments.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400 bg-white rounded-lg border border-gray-200">
                    <MessageSquare className="h-8 w-8 mb-2 opacity-20" />
                    <span>No comments yet</span>
                    <p className="text-xs text-center mt-1">
                      Be the first to share your thoughts
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Delete Task</h3>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-5">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this task? This action cannot be
                undone and will also delete all sub-tasks and comments.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
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

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
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
