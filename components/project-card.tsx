import { Calendar, Clock } from "lucide-react";
import type { Project } from "@/app/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Progress bar colors
  const progressColors = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    yellow: "bg-[#ffe500]",
  };

  const progressColor =
    progressColors[project.progressColor as keyof typeof progressColors];

  return (
    <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
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
        <div className="mb-1 text-sm font-medium text-gray-700">Members :</div>
        <div className="flex -space-x-2">
          {project.members.map((member) => (
            <div
              key={member.id}
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs text-white"
              style={{ backgroundColor: member.color }}
            >
              {member.avatar}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="mr-1 h-3 w-3" />
          <span>Start date : {project.startDate}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="mr-1 h-3 w-3" />
          <span>Estimated end date : {project.endDate}</span>
        </div>
      </div>
    </div>
  );
}
