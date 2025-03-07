import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/app/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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

  return (
    <Link href={`/projects/${project.id}`} className="block">
      <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
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
