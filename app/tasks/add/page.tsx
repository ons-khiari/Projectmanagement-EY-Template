"use client";

import type React from "react";

import { useState } from "react";
import {
  Plus,
  Calendar,
  Briefcase,
  FileText,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import type { Task } from "@/app/types/task";

export default function AddTaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projectTitle = searchParams.get("projectTitle");
  const phaseId = searchParams.get("phaseId");
  const phaseTitle = searchParams.get("phaseTitle");
  const deliverableId = searchParams.get("deliverableId");
  const deliverableTitle = searchParams.get("deliverableTitle");

  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"low" | "med" | "high">("med");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");

  // Available team members
  const teamMembers = [
    { id: "1", avatar: "OK", color: "#27acaa", name: "Ons Khiari" },
    { id: "2", avatar: "JD", color: "#6366f1", name: "John Doe" },
    { id: "3", avatar: "AS", color: "#f43f5e", name: "Anna Smith" },
    { id: "4", avatar: "MK", color: "#8b5cf6", name: "Mike Kim" },
    { id: "5", avatar: "RL", color: "#ec4899", name: "Rachel Lee" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create task object
    const newTask: Partial<Task> = {
      text,
      priority,
      date: dueDate,
      assignee,
      project: projectTitle || "",
      deliverable: deliverableTitle || undefined,
      deliverablePhase: phaseTitle || undefined,
      status: "todo",
    };

    // Here you would typically save the task to your backend
    console.log("New task:", newTask);

    // Navigate back to appropriate page
    if (projectId && phaseId && deliverableId) {
      router.push(
        `/projects/${projectId}/phases/${phaseId}/deliverables/${deliverableId}`
      );
    } else if (projectId && phaseId) {
      router.push(`/projects/${projectId}/phases/${phaseId}`);
    } else if (projectId) {
      router.push(`/projects/${projectId}`);
    } else {
      router.push("/tasks");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto max-w-2xl py-6 px-4 sm:px-6">
            <div className="mb-6 flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 rounded-full p-2 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Add New Task</h1>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <form onSubmit={handleSubmit} className="p-6">
                {(projectTitle || phaseTitle || deliverableTitle) && (
                  <div className="mb-6 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <span className="text-sm text-gray-500">
                      Adding task to:
                    </span>
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

                <div className="space-y-6">
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
                      rows={4}
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
                            {
                              teamMembers.find((m) => m.avatar === assignee)
                                ?.name
                            }
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
                    onClick={() => router.back()}
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
        </main>
      </div>
    </div>
  );
}
