"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus, Calendar } from "lucide-react";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";

interface AddPhaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (phase: Partial<DeliverablePhase>) => void;
  projectTitle?: string;
}

export function AddPhaseModal({
  isOpen,
  onClose,
  onAdd,
  projectTitle,
}: AddPhaseModalProps) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [color, setColor] = useState("blue");

  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setStartDate("");
      setEndDate("");
      setColor("blue");
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

    // Create phase object
    const newPhase: Partial<DeliverablePhase> = {
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      color,
    };

    onAdd(newPhase);
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
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Deliverable Phase
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {projectTitle && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-sm text-gray-500">Adding phase to:</span>
                <div className="font-medium text-gray-800">{projectTitle}</div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phase Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                  required
                  placeholder="e.g., Research & Planning"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phase Color
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setColor("blue")}
                    className={`w-8 h-8 rounded-full bg-blue-500 ${
                      color === "blue"
                        ? "ring-2 ring-offset-2 ring-blue-500"
                        : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("orange")}
                    className={`w-8 h-8 rounded-full bg-orange-500 ${
                      color === "orange"
                        ? "ring-2 ring-offset-2 ring-orange-500"
                        : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("yellow")}
                    className={`w-8 h-8 rounded-full bg-[#ffe500] ${
                      color === "yellow"
                        ? "ring-2 ring-offset-2 ring-[#ffe500]"
                        : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("green")}
                    className={`w-8 h-8 rounded-full bg-green-500 ${
                      color === "green"
                        ? "ring-2 ring-offset-2 ring-green-500"
                        : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("purple")}
                    className={`w-8 h-8 rounded-full bg-purple-500 ${
                      color === "purple"
                        ? "ring-2 ring-offset-2 ring-purple-500"
                        : ""
                    }`}
                  ></button>
                </div>

                <div className="mt-3">
                  <div
                    className={`p-3 rounded-md border-l-4 ${
                      color === "blue"
                        ? "border-blue-500 bg-blue-50"
                        : color === "orange"
                        ? "border-orange-500 bg-orange-50"
                        : color === "yellow"
                        ? "border-yellow-500 bg-yellow-50"
                        : color === "green"
                        ? "border-green-500 bg-green-50"
                        : "border-purple-500 bg-purple-50"
                    }`}
                  >
                    <span className="text-sm font-medium">
                      Preview: {title || "Phase Title"}
                    </span>
                  </div>
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
                Create Phase
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
