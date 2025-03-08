"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus, Calendar, User, Building2 } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/app/types/project";
import type { Client } from "@/app/types/client";
import { clients } from "@/app/types/client";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Partial<Project>) => void;
}

export function AddProjectModal({
  isOpen,
  onClose,
  onAdd,
}: AddProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressColor, setProgressColor] = useState("blue");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [searchClient, setSearchClient] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [projectManager, setProjectManager] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const clientDropdownRef = useRef<HTMLDivElement>(null);

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
      setStartDate("");
      setEndDate("");
      setProgress(0);
      setProgressColor("blue");
      setSelectedClient(null);
      setSelectedMembers([]);
      setProjectManager("");
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

  // Close client dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        clientDropdownRef.current &&
        !clientDropdownRef.current.contains(event.target as Node)
      ) {
        setShowClientDropdown(false);
      }
    };

    if (showClientDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showClientDropdown]);

  // Filter clients based on search
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchClient.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create project object
    const newProject: Partial<Project> = {
      title,
      description,
      progress,
      progressColor,
      startDate,
      endDate,
      projectManager: projectManager
        ? {
            id: teamMembers.find((m) => m.id === projectManager)?.id || "",
            avatar:
              teamMembers.find((m) => m.id === projectManager)?.avatar || "",
            color:
              teamMembers.find((m) => m.id === projectManager)?.color || "",
          }
        : undefined,
      members: selectedMembers.map((memberId) => {
        const member = teamMembers.find((m) => m.id === memberId);
        return {
          id: member?.id || "",
          avatar: member?.avatar || "",
          color: member?.color || "",
        };
      }),
      client: selectedClient
        ? {
            id: selectedClient.id,
            name: selectedClient.name,
            logo: selectedClient.logo,
            type: selectedClient.type,
          }
        : undefined,
    };

    onAdd(newProject);
    onClose();
  };

  const toggleMember = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Project
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 md:col-span-2">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                    required
                  />
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
              </div>

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

              <div>
                <label
                  htmlFor="progress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Progress (%)
                </label>
                <input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                />
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${
                      progressColor === "blue"
                        ? "bg-blue-500"
                        : progressColor === "orange"
                        ? "bg-orange-500"
                        : progressColor === "yellow"
                        ? "bg-[#ffe500]"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="progressColor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Progress Color
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setProgressColor("blue")}
                    className={`w-8 h-8 rounded-full bg-blue-500 ${
                      progressColor === "blue"
                        ? "ring-2 ring-offset-2 ring-blue-500"
                        : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setProgressColor("orange")}
                    className={`w-8 h-8 rounded-full bg-orange-500 ${
                      progressColor === "orange"
                        ? "ring-2 ring-offset-2 ring-orange-500"
                        : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setProgressColor("yellow")}
                    className={`w-8 h-8 rounded-full bg-[#ffe500] ${
                      progressColor === "yellow"
                        ? "ring-2 ring-offset-2 ring-[#ffe500]"
                        : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setProgressColor("green")}
                    className={`w-8 h-8 rounded-full bg-green-500 ${
                      progressColor === "green"
                        ? "ring-2 ring-offset-2 ring-green-500"
                        : ""
                    }`}
                  ></button>
                </div>
              </div>

              <div className="relative" ref={clientDropdownRef}>
                <label
                  htmlFor="client"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Client
                </label>
                <div
                  className="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer"
                  onClick={() => setShowClientDropdown(!showClientDropdown)}
                >
                  {selectedClient ? (
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100 mr-2">
                        {selectedClient.logo ? (
                          <Image
                            src={selectedClient.logo || "/placeholder.svg"}
                            alt={selectedClient.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Building2 className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                      <span>{selectedClient.name}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">Select a client</span>
                  )}
                </div>

                {showClientDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div className="p-2 border-b">
                      <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchClient}
                        onChange={(e) => setSearchClient(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client) => (
                        <div
                          key={client.id}
                          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedClient(client);
                            setShowClientDropdown(false);
                          }}
                        >
                          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100 mr-2">
                            {client.logo ? (
                              <Image
                                src={client.logo || "/placeholder.svg"}
                                alt={client.name}
                                width={32}
                                height={32}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Building2 className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-xs text-gray-500">
                              {client.type}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-center text-gray-500">
                        No clients found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="projectManager"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project Manager <span className="text-red-500">*</span>
                </label>
                <select
                  id="projectManager"
                  value={projectManager}
                  onChange={(e) => setProjectManager(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffe500]"
                  required
                >
                  <option value="">Select a project manager</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Members
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center p-2 border rounded-md cursor-pointer ${
                        selectedMembers.includes(member.id)
                          ? "border-[#ffe500] bg-yellow-50"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => toggleMember(member.id)}
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
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
