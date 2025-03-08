"use client";

import type React from "react";

import type { Task } from "@/app/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CheckCircle,
  Clock,
  GripVertical,
  Briefcase,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  index: number;
  onSelect?: (task: Task) => void;
}

export default function TaskCard({
  task,
  isDragging = false,
  index,
  onSelect,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Priority colors
  const priorityColors = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    med: "bg-orange-100 text-orange-800 border-orange-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };

  // Status colors
  const statusColors = {
    todo: "bg-gray-100 text-gray-800 border-gray-200",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    done: "bg-green-100 text-green-800 border-green-200",
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, you would navigate to the edit page or open an edit modal
    console.log(`Editing task ${task.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, you would call an API to delete the task
    console.log(`Deleting task ${task.id}`);
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(task);
    }
  };
  console.log("task", index);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm relative hover:shadow-md transition-all group ${
        isDragging ? "opacity-50" : ""
      } ${
        task.status === "done"
          ? "border-l-4 border-l-green-500"
          : task.priority === "high"
          ? "border-l-4 border-l-red-500"
          : ""
      }`}
    >
      {/* Drag handle */}
      <div
        className="absolute right-3 top-3 cursor-grab active:cursor-grabbing p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
        {...attributes}
        {...listeners}
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
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Task status indicator */}
      {task.status === "done" && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
          <CheckCircle className="h-3 w-3" />
        </div>
      )}

      <br />
      {/* Clickable content */}
      <div className="cursor-pointer pr-6" onClick={handleClick}>
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-800 line-clamp-2">
            {task.text}
          </p>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <Badge
            variant="outline"
            className={
              priorityColors[task.priority as keyof typeof priorityColors]
            }
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>

          {task.status && (
            <Badge
              variant="outline"
              className={
                statusColors[task.status as keyof typeof statusColors] ||
                statusColors.todo
              }
            >
              {task.status === "todo"
                ? "To Do"
                : task.status === "in-progress"
                ? "In Progress"
                : "Done"}
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            <span className="truncate">{task.project}</span>
          </div>

          {task.deliverable && (
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span className="truncate">{task.deliverable}</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{task.date}</span>
          </div>

          <div className="flex -space-x-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-white border-2 border-white"
              style={{ backgroundColor: getAvatarColor(task.assignee) }}
              title={task.assignee}
            >
              {task.assignee.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
