"use client";

import type React from "react";

import {
  Calendar,
  Clock,
  Building2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/app/types/project";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  // Progress bar colors with a default fallback
  const progressColors = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    yellow: "bg-[#ffe500]",
    default: "bg-gray-500", // Fallback color
  };

  // Use the progressColor if it exists, otherwise use the default
  const progressColor = project.progressColor
    ? progressColors[project.progressColor as keyof typeof progressColors] ||
      progressColors.default
    : progressColors.default;

  // Client type badge colors
  const clientTypeColors = {
    individual: "bg-purple-100 text-purple-800",
    company: "bg-blue-100 text-blue-800",
    government: "bg-green-100 text-green-800",
    "non-profit": "bg-orange-100 text-orange-800",
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/projects/${project.id}/edit`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, you would call an API to delete the project
    console.log(`Deleting project ${project.id}`);
    // Then redirect to projects list
    router.push("/projects");
  };

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md relative">


        {/* Action buttons */}
        <div className="absolute right-4 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
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
                Edit project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {project.progress}% completed
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full ${progressColor}`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <h3 className="mb-2 text-lg font-medium text-[#444444]">
          {project.title}
        </h3>

        <p className="mb-4 text-sm text-gray-600">{project.description}</p>

        {/* Client information */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            {project.client.logo ? (
              <Image
                src={project.client.logo || "/placeholder.svg"}
                alt={project.client.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            ) : (
              <Building2 className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              {project.client.name}
            </p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                clientTypeColors[project.client.type]
              }`}
            >
              {project.client.type.charAt(0).toUpperCase() +
                project.client.type.slice(1)}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-gray-700">
              Project Manager:
            </div>
            <div className="flex items-center">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs text-white mr-2"
                style={{ backgroundColor: project.projectManager.color }}
              >
                {project.projectManager.avatar}
              </div>
              <span className="text-sm text-gray-700">
                {getFullName(project.projectManager.avatar)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700">
              Team Members:
            </div>
            <div className="flex -space-x-2">
              {project.members.map((member) => (
                <div
                  key={member.id}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs text-white"
                  style={{ backgroundColor: member.color }}
                  title={getFullName(member.avatar)}
                >
                  {member.avatar}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="mr-1 h-3 w-3" />
            <span>Start date: {project.startDate}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="mr-1 h-3 w-3" />
            <span>End date: {project.endDate}</span>
          </div>
        </div>
      </div>
    </Link>
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
