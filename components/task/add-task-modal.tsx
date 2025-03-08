"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X, Plus, Calendar, Briefcase, FileText, Layers } from "lucide-react";
import type { Task } from "@/app/types/task";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Partial<Task>) => void;
  projectId?: string;
  projectTitle?: string;
  phaseId?: string;
  phaseTitle?: string;
  deliverableId?: string;
  deliverableTitle?: string;
}

export function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
  projectId,
  projectTitle,
  phaseId,
  phaseTitle,
  deliverableId,
  deliverableTitle,
}: AddTaskModalProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"low" | "med" | "high">("med");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  // Available team members
  const teamMembers = [
    { id: "1", avatar: "OK", color: "#27acaa", name: "Ons Khiari" },
    { id: "2", avatar: "JD", color: "#6366f1", name: "John Doe" },
    { id: "3", avatar: "AS", color: "#f43f5e", name: "Anna Smith" },
    { id: "4", avatar: "MK", color: "#8b5cf6", name: "Mike Kim" },
    { id: "5", avatar: "RL", color: "#ec4899", name: "Rachel Lee" },
  ];

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setText("");
      setPriority("med");
      setDueDate("");
      setAssignee("");
    }
  }, [isOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create task object
    const newTask: Partial<Task> = {
      text,
      priority,
      date: dueDate,
      assignee,
      project: projectTitle || "",
      deliverable: deliverableTitle,
      deliverablePhase: phaseTitle,
      status: "todo",
    };

    onAdd(newTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {(projectTitle || phaseTitle || deliverableTitle) && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-sm text-gray-500">Adding task to:</span>
                <div className="font-medium text-gray-800">
                  {projectTitle && (
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-gray-500 mr-1" />
                      <span>Project: {projectTitle}</span>
                    </div>
                  )}
                  {phaseTitle && (
                    <div className="flex items-center mt-1">
                      <Layers className="h-4 w-4 text-gray-500 mr-1" />
                      <span>Phase: {phaseTitle}</span>
                    </div>
                  )}
                  {deliverableTitle && (
                    <div className="flex items-center mt-1">
                      <FileText className="h-4 w-4 text-gray-500 mr-1" />
                      <span>Deliverable: {deliverableTitle}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                  required
                  placeholder="Describe the task..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="assignee"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Assignee <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="assignee"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                    required
                  >
                    <option value="">Select an assignee</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.avatar}>
                        {member.name}
                      </option>
                    ))}
                  </select>

                  {assignee && (
                    <div className="mt-2 flex items-center">
                      <div
                        className="h-6 w-6 rounded-full flex items-center justify-center text-white mr-2"
                        style={{
                          backgroundColor: teamMembers.find(
                            (m) => m.avatar === assignee
                          )?.color,
                        }}
                      >
                        {assignee}
                      </div>
                      <span className="text-sm">
                        {teamMembers.find((m) => m.avatar === assignee)?.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPriority("low")}
                    className={`flex-1 py-2 px-3 rounded-md border ${
                      priority === "low"
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Low
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority("med")}
                    className={`flex-1 py-2 px-3 rounded-md border ${
                      priority === "med"
                        ? "bg-orange-100 text-orange-800 border-orange-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority("high")}
                    className={`flex-1 py-2 px-3 rounded-md border ${
                      priority === "high"
                        ? "bg-red-100 text-red-800 border-red-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    High
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#ffe500] rounded-md text-[#444444] font-medium hover:bg-[#f5dc00] flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
