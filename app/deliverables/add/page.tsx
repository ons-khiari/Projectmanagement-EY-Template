"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  Link2,
  User,
  ArrowLeft,
  ChevronRight,
  Briefcase,
  Layers,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import type { Deliverable } from "@/app/types/deliverable";
import Link from "next/link";

export default function AddDeliverablePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projectTitle = searchParams.get("projectTitle");
  const phaseId = searchParams.get("phaseId");
  const phaseTitle = searchParams.get("phaseTitle");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [priority, setPriority] = useState<"low" | "med" | "high">("med");
  const [priorityNumber, setPriorityNumber] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [formattedDate, setFormattedDate] = useState("");

  // Available team members
  const teamMembers = [
    { id: "1", avatar: "OK", color: "#27acaa", name: "Ons Khiari" },
    { id: "2", avatar: "JD", color: "#6366f1", name: "John Doe" },
    { id: "3", avatar: "AS", color: "#f43f5e", name: "Anna Smith" },
    { id: "4", avatar: "MK", color: "#8b5cf6", name: "Mike Kim" },
    { id: "5", avatar: "RL", color: "#ec4899", name: "Rachel Lee" },
  ];

  // Format the date whenever it changes
  useEffect(() => {
    if (dueDate) {
      const date = new Date(dueDate);
      setFormattedDate(
        date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    } else {
      setFormattedDate("");
    }
  }, [dueDate]);

  const toggleAssignee = (memberId: string) => {
    if (selectedAssignees.includes(memberId)) {
      setSelectedAssignees(selectedAssignees.filter((id) => id !== memberId));
    } else {
      setSelectedAssignees([...selectedAssignees, memberId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create deliverable object
    const newDeliverable: Partial<Deliverable> = {
      title,
      description,
      link: link || undefined,
      priority,
      priority_number: priorityNumber,
      date: dueDate,
      assignee: selectedAssignees.map((assigneeId) => {
        const member = teamMembers.find((m) => m.id === assigneeId);
        return {
          id: member?.id || "",
          avatar: member?.avatar || "",
          color: member?.color || "",
        };
      }),
      project: projectTitle || "",
      deliverablePhase: phaseTitle || "",
      status: "todo",
    };

    // Here you would typically save the deliverable to your backend
    console.log("New deliverable:", newDeliverable);

    // Navigate back to appropriate page
    if (projectId && phaseId) {
      router.push(`/projects/${projectId}/phases/${phaseId}`);
    } else if (projectId) {
      router.push(`/projects/${projectId}`);
    } else {
      router.push("/deliverables");
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-500";
      case "med":
        return "bg-orange-500";
      case "high":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get priority text color
  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-blue-800 bg-blue-100 border-blue-300";
      case "med":
        return "text-orange-800 bg-orange-100 border-orange-300";
      case "high":
        return "text-red-800 bg-red-100 border-red-300";
      default:
        return "text-gray-800 bg-gray-100 border-gray-300";
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="container mx-auto max-w-5xl py-8 px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center text-sm text-gray-500">
              <Link
                href="/deliverables"
                className="hover:text-gray-700 transition-colors"
              >
                Deliverables
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="font-medium text-gray-900">
                Add New Deliverable
              </span>
            </nav>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => router.back()}
                  className="mr-4 rounded-full p-2 text-gray-500 hover:bg-white hover:text-gray-700 transition-all duration-200 hover:shadow-sm"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">
                  Add New Deliverable
                </h1>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div
                className={`h-1.5 w-full ${getPriorityColor(priority)}`}
              ></div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                {(projectTitle || phaseTitle) && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      Deliverable Context
                    </h3>
                    <div className="space-y-2">
                      {projectTitle && (
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-100 text-blue-600 mr-3">
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">
                              Project
                            </span>
                            <p className="font-medium text-gray-800">
                              {projectTitle}
                            </p>
                          </div>
                        </div>
                      )}

                      {phaseTitle && (
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-100 text-purple-600 mr-3">
                            <Layers className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Phase</span>
                            <p className="font-medium text-gray-800">
                              {phaseTitle}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Deliverable Title{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe500] focus:border-transparent transition-all duration-200"
                        required
                        placeholder="e.g., User Research Report"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="priorityNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Deliverable Number{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center">
                        <span className="mr-2 text-gray-500 font-medium">
                          D
                        </span>
                        <input
                          id="priorityNumber"
                          type="number"
                          min="1"
                          value={priorityNumber}
                          onChange={(e) =>
                            setPriorityNumber(Number(e.target.value))
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe500] focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                      <div className="mt-3 flex justify-center">
                        <div className="w-16 h-16 bg-[#ffe500] rounded-full flex items-center justify-center font-bold text-xl text-[#444444] border-2 border-white shadow-md">
                          D{priorityNumber}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe500] focus:border-transparent transition-all duration-200"
                      required
                      placeholder="Provide a detailed description of this deliverable..."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="dueDate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Due Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="dueDate"
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe500] focus:border-transparent transition-all duration-200"
                          required
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                      {formattedDate && (
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formattedDate}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="link"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Document Link
                      </label>
                      <div className="relative">
                        <input
                          id="link"
                          type="text"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffe500] focus:border-transparent transition-all duration-200"
                          placeholder="https://..."
                        />
                        <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                      {link && (
                        <div className="mt-2 flex items-center text-sm text-blue-600">
                          <Link2 className="h-4 w-4 mr-1" />
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline truncate"
                          >
                            {link}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPriority("low")}
                        className={`flex items-center justify-center py-3 px-4 rounded-lg border transition-all duration-200 ${
                          priority === "low"
                            ? "bg-blue-100 text-blue-800 border-blue-300 shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-5 w-5 mr-2 ${
                            priority === "low"
                              ? "text-blue-500"
                              : "text-gray-400"
                          }`}
                        />
                        <span>Low</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriority("med")}
                        className={`flex items-center justify-center py-3 px-4 rounded-lg border transition-all duration-200 ${
                          priority === "med"
                            ? "bg-orange-100 text-orange-800 border-orange-300 shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <Clock
                          className={`h-5 w-5 mr-2 ${
                            priority === "med"
                              ? "text-orange-500"
                              : "text-gray-400"
                          }`}
                        />
                        <span>Medium</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriority("high")}
                        className={`flex items-center justify-center py-3 px-4 rounded-lg border transition-all duration-200 ${
                          priority === "high"
                            ? "bg-red-100 text-red-800 border-red-300 shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <AlertCircle
                          className={`h-5 w-5 mr-2 ${
                            priority === "high"
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                        <span>High</span>
                      </button>
                    </div>

                    <div className="mt-3 p-3 rounded-lg border flex items-center space-x-3">
                      <div
                        className={`h-3 w-3 rounded-full ${getPriorityColor(
                          priority
                        )}`}
                      ></div>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-md ${getPriorityTextColor(
                          priority
                        )}`}
                      >
                        {priority === "low"
                          ? "Low Priority"
                          : priority === "med"
                          ? "Medium Priority"
                          : "High Priority"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {priority === "low"
                          ? "Can be completed when time allows"
                          : priority === "med"
                          ? "Should be completed soon"
                          : "Requires immediate attention"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignees <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedAssignees.includes(member.id)
                              ? "border-[#ffe500] bg-yellow-50 shadow-sm"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => toggleAssignee(member.id)}
                        >
                          <div
                            className="h-10 w-10 rounded-full flex items-center justify-center text-white mr-3 shadow-sm"
                            style={{ backgroundColor: member.color }}
                          >
                            {member.avatar}
                          </div>
                          <span className="font-medium">{member.name}</span>
                          {selectedAssignees.includes(member.id) && (
                            <CheckCircle2 className="h-5 w-5 ml-auto text-[#ffe500]" />
                          )}
                        </div>
                      ))}
                    </div>
                    {selectedAssignees.length > 0 && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-700">
                            {selectedAssignees.length} assignee(s) selected
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedAssignees.map((id) => {
                            const member = teamMembers.find((m) => m.id === id);
                            return (
                              <div
                                key={id}
                                className="flex items-center bg-white px-3 py-1 rounded-full border shadow-sm"
                              >
                                <div
                                  className="h-5 w-5 rounded-full flex items-center justify-center text-white mr-1.5"
                                  style={{ backgroundColor: member?.color }}
                                >
                                  <span className="text-xs">
                                    {member?.avatar}
                                  </span>
                                </div>
                                <span className="text-sm">{member?.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#ffe500] rounded-lg text-[#444444] font-medium hover:bg-[#f5dc00] transition-colors duration-200 flex items-center shadow-sm"
                    disabled={selectedAssignees.length === 0}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Deliverable
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
