"use client";

import type { Task } from "@/app/types/task";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";

interface TaskDetailsProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

export function TaskDetails({ task, isOpen, onClose }: TaskDetailsProps) {
  const [subTasks, setSubTasks] = useState<SubTask[]>([
    {
      id: "1",
      text: "En tant qu'enseignant, je souhaite créer un examen afin de pouvoir évaluer les connaissances des étudiants sur le contenu du cours",
      completed: true,
    },
    {
      id: "2",
      text: "En tant qu'enseignant, je souhaite créer un examen afin de pouvoir évaluer les connaissances des étudiants sur le contenu du cours",
      completed: false,
    },
    {
      id: "3",
      text: "En tant qu'enseignant, je souhaite créer un examen afin de pouvoir évaluer les connaissances des étudiants sur le contenu du cours",
      completed: false,
    },
  ]);

  if (!task) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left text-lg">{task.text}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <Plus className="h-4 w-4 mr-1" />
              Add sub-task
            </Button>
          </div>

          {/* Details Section */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-semibold">Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Assigned to
                </span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Unassigned</span>
                  <Button
                    variant="link"
                    className="text-xs text-blue-500 h-auto p-0"
                  >
                    Assign to me
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Team</span>
                <span className="text-sm">None</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Project manager
                </span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>OK</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Ons Khairi</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Task status
                </span>
                <div className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                  Low
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Project</span>
                <span className="text-sm">
                  {task.project || "Not assigned"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Deliverable
                </span>
                <span className="text-sm">
                  {task.deliverable || "Not assigned"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Deliverable Phase
                </span>
                <span className="text-sm">
                  {task.deliverablePhase || "Not assigned"}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-tasks Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Sub-tasks</h3>
            <div className="space-y-3 bg-gray-50 p-4 rounded-md">
              {subTasks.map((subTask) => (
                <div key={subTask.id} className="flex items-start gap-2">
                  <Checkbox
                    id={subTask.id}
                    checked={subTask.completed}
                    onCheckedChange={(checked) => {
                      setSubTasks(
                        subTasks.map((st) =>
                          st.id === subTask.id
                            ? { ...st, completed: checked as boolean }
                            : st
                        )
                      );
                    }}
                  />
                  <label
                    htmlFor={subTask.id}
                    className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      subTask.completed
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {subTask.text}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Comments</h3>
            <div className="relative bg-gray-50 p-4 rounded-md">
              <textarea
                className="min-h-[100px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add a comment..."
              />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Button size="sm" variant="secondary" className="h-7 text-xs">
                  Looks good!
                </Button>
                <Button size="sm" variant="secondary" className="h-7 text-xs">
                  Need help?
                </Button>
                <Button size="sm" variant="secondary" className="h-7 text-xs">
                  Can you clarify..?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
