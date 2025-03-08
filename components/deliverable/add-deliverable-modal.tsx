"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus, Calendar, Link2, User } from "lucide-react";
import type { Deliverable } from "@/app/types/deliverable";

interface AddDeliverableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (deliverable: Partial<Deliverable>) => void;
  projectTitle?: string;
  phaseTitle?: string;
}

export function AddDeliverableModal({
  isOpen,
  onClose,
  onAdd,
  projectTitle,
  phaseTitle,
}: AddDeliverableModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [priority, setPriority] = useState<"low" | "med" | "high">("med");
  const [priorityNumber, setPriorityNumber] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

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
      setTitle("");
      setDescription("");
      setLink("");
      setPriority("med");
      setPriorityNumber(1);
      setDueDate("");
      setSelectedAssignees([]);
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

    onAdd(newDeliverable);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Deliverable
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 130px)" }}
        >
          <form onSubmit={handleSubmit}>
            {(projectTitle || phaseTitle) && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-sm text-gray-500">
                  Adding deliverable to:
                </span>
                <div className="font-medium text-gray-800">
                  {projectTitle && `Project: ${projectTitle}`}
                  {projectTitle && phaseTitle && " / "}
                  {phaseTitle && `Phase: ${phaseTitle}`}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Deliverable Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                    required
                    placeholder="e.g., User Research Report"
                  />
                </div>

                <div>
                  <label
                    htmlFor="priorityNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Deliverable Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-500">D</span>
                    <input
                      id="priorityNumber"
                      type="number"
                      min="1"
                      value={priorityNumber}
                      onChange={(e) =>
                        setPriorityNumber(Number(e.target.value))
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                      required
                    />
                  </div>
                  <div className="mt-2 flex justify-center">
                    <div className="w-12 h-12 bg-[#ffe500] rounded-full flex items-center justify-center font-bold text-[#444444] border-2 border-white shadow-sm">
                      D{priorityNumber}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                  required
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
                    htmlFor="link"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Document Link
                  </label>
                  <div className="relative">
                    <input
                      id="link"
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                      placeholder="https://..."
                    />
                    <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignees <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center p-2 border rounded-md cursor-pointer ${
                        selectedAssignees.includes(member.id)
                          ? "border-[#ffe500] bg-yellow-50"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => toggleAssignee(member.id)}
                    >
                      <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-white mr-2"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.avatar}
                      </div>
                      <span>{member.name}</span>
                    </div>
                  ))}
                </div>
                {selectedAssignees.length > 0 && (
                  <div className="mt-2 flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">
                      {selectedAssignees.length} assignee(s) selected
                    </span>
                  </div>
                )}
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
                disabled={selectedAssignees.length === 0}
              >
                <Plus className="h-4 w-4 mr-1" />
                Create Deliverable
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
