"use client";

import type React from "react";

import {
  Calendar,
  Link2,
  Users,
  Briefcase,
  GripVertical,
  Building2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { Deliverable } from "@/app/types/deliverable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DeliverableCardProps {
  deliverable: Deliverable;
  projectId?: string;
  phaseId?: string;
  isDragging?: boolean;
}

export default function DeliverableCard({
  deliverable,
  projectId,
  phaseId,
  isDragging = false,
}: DeliverableCardProps) {
  const router = useRouter();
  // Set up sortable functionality
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: deliverable.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Priority colors
  const priorityColors = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    med: "bg-orange-100 text-orange-800 border-orange-200",
    high: "bg-red-100 text-red-800 border-red-200",
    default: "bg-gray-100 text-gray-800 border-gray-200", // Fallback color
  };

  // Priority badges
  const priorityBadges = {
    low: "Low",
    med: "Medium",
    high: "High",
    default: "Normal", // Fallback
  };

  // If projectId and phaseId are provided, use those, otherwise extract from the deliverable
  const linkProjectId =
    projectId ||
    (deliverable.project ? deliverable.project.split(" ")[1] : "1");
  const linkPhaseId =
    phaseId ||
    (deliverable.deliverablePhase
      ? deliverable.deliverablePhase.split(" ")[1]
      : "1");

  // Handle card click
  const handleCardClick = () => {
    router.push(
      `/projects/${linkProjectId}/phases/${linkPhaseId}/deliverables/${deliverable.id}`
    );
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(
      `/projects/${linkProjectId}/phases/${linkPhaseId}/deliverables/${deliverable.id}/edit`
    );
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, you would call an API to delete the deliverable
    console.log(`Deleting deliverable ${deliverable.id}`);
    // Then redirect or update UI
  };

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-50" : ""}`}
    >
      <div
        className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md relative overflow-hidden group cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Drag handle - separated from the clickable area */}
        <div
          className="absolute right-3 top-3 cursor-grab active:cursor-grabbing p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the card
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>

        {/* Action buttons */}
        <div className="absolute right-10 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(true);
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem onClick={handleEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Deliverable
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Deliverable
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-3 flex items-center gap-2 pl-0">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              priorityColors[
                deliverable.priority as keyof typeof priorityColors
              ] || priorityColors.default
            }`}
          >
            {priorityBadges[
              deliverable.priority as keyof typeof priorityBadges
            ] || priorityBadges.default}
          </span>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium bg-[#ffe500] text-gray-800 border-gray-200`}
          >
            D{deliverable.priority_number}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-gray-800">
          {deliverable.title}
        </h3>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {deliverable.description}
        </p>

        {/* Project and client information */}
        <div className="mb-3 flex items-center text-xs text-gray-500">
          <Briefcase className="mr-1 h-3 w-3" />
          <span className="font-medium">Project:</span>
          <span className="ml-1">{deliverable.project}</span>
        </div>

        {/* Display client information if available */}
        {deliverable.client && (
          <div className="mb-3 flex items-center text-xs text-gray-500">
            <Building2 className="mr-1 h-3 w-3" />
            <span className="font-medium">Client:</span>
            <span className="ml-1">{deliverable.client.name}</span>
          </div>
        )}

        <div className="mb-3 flex items-center text-xs text-gray-500">
          <Calendar className="mr-1 h-3 w-3" />
          <span>{deliverable.date}</span>
        </div>

        {deliverable.link && (
          <div className="mb-4 flex items-center text-xs text-blue-500 hover:underline">
            <Link2 className="mr-1 h-3 w-3" />
            <span>{deliverable.link}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-500">
              {deliverable.assignee.length} assignee(s)
            </span>
          </div>
          <div className="flex -space-x-2">
            {deliverable.assignee.map((member) => (
              <div
                key={member.id}
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-white border-2 border-white"
                style={{ backgroundColor: member.color }}
                title={getFullName(member.avatar)}
              >
                {member.avatar}
              </div>
            ))}
          </div>
        </div>
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
