"use client";

import { Calendar, Link2, Users, Briefcase, GripVertical } from "lucide-react";
import Link from "next/link";
import type { Deliverable } from "@/app/types/deliverable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DeliverableCardProps {
  deliverable: Deliverable;
  projectId?: string;
  phaseId?: string;
  index?: number;
  isDragging?: boolean;
}

export default function DeliverableCard({
  deliverable,
  projectId,
  phaseId,
  index,
  isDragging = false,
}: DeliverableCardProps) {
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

  // Create the card content
  const cardContent = (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md relative overflow-hidden group">
      {/* Drag handle */}
      <div
        className="absolute right-3 top-3 cursor-grab active:cursor-grabbing p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      {/* Priority Number Badge - Circle style like in project details */}
      <div className="absolute -top-1 -left-1 w-8 h-8 bg-[#ffe500] rounded-full flex items-center justify-center font-bold text-[#444444] border-2 border-white shadow-sm">
        D{deliverable.priority_number}
      </div>

      <div className="mb-3 flex items-center gap-2 pl-6">
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
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-800">
        {deliverable.title}
      </h3>

      <p className="mb-4 text-sm text-gray-600 line-clamp-2">
        {deliverable.description}
      </p>

      {/* Project information */}
      <div className="mb-3 flex items-center text-xs text-gray-500">
        <Briefcase className="mr-1 h-3 w-3" />
        <span className="font-medium">Project:</span>
        <span className="ml-1">{deliverable.project}</span>
      </div>

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
  );

  // If projectId and phaseId are provided, wrap in Link, otherwise just return the card
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-50" : ""}`}
    >
      {projectId && phaseId ? (
        <Link
          href={`/projects/${projectId}/phases/${phaseId}/deliverables/${deliverable.id}`}
        >
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
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
