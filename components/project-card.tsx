import { Users } from "lucide-react";
import type { Project } from "@/app/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Progress bar colors
  const progressColors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-[#ffe500]",
    orange: "bg-orange-500",
  };

  const progressColor =
    progressColors[project.progressColor as keyof typeof progressColors];

  return (
    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2">
        <p className="text-xs text-gray-500">{project.status}</p>
        <h3 className="text-base font-medium text-[#444444]">
          {project.title}
        </h3>
      </div>

      <p className="mb-3 text-xs text-gray-600">{project.description}</p>

      <div className="mb-3 flex items-center">
        <Users className="mr-2 h-4 w-4 text-blue-500" />
        <span className="text-xs text-gray-600">
          Team members : {project.teamMembers}
        </span>
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xs text-gray-500">
            Start date : {project.startDate}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-500">
            Estimated end date : {project.endDate}
          </span>
        </div>
      </div>
    </div>
  );
}
