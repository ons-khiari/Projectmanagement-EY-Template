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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  MessageCircle,
  Plus,
  CheckCircle2,
  User,
  Briefcase,
  FileText,
  Layers,
  Calendar,
  MoreHorizontal,
  Trash2,
  Copy,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

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

interface Comment {
  id: string;
  user: string;
  userColor: string;
  text: string;
  timestamp: string;
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

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "OK",
      userColor: "#27acaa",
      text: "I've started working on this task. Will update the progress soon.",
      timestamp: "2 days ago",
    },
    {
      id: "2",
      user: "JD",
      userColor: "#6366f1",
      text: "Let me know if you need any help with this.",
      timestamp: "1 day ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      user: "OK",
      userColor: "#27acaa",
      text: newComment,
      timestamp: "Just now",
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  if (!task) return null;

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

  const priorityColor =
    priorityColors[task.priority as keyof typeof priorityColors] ||
    priorityColors.low;
  const statusColor = task.status
    ? statusColors[task.status as keyof typeof statusColors]
    : statusColors.todo;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-white border-b pb-4 px-6 pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Badge className={priorityColor}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
                Priority
              </Badge>
              {task.status && (
                <Badge className={statusColor}>
                  {task.status === "todo"
                    ? "To Do"
                    : task.status === "in-progress"
                    ? "In Progress"
                    : "Done"}
                </Badge>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <SheetHeader className="text-left">
            <SheetTitle className="text-left text-xl font-bold">
              {task.text}
            </SheetTitle>
          </SheetHeader>

          <div className="flex items-center gap-2 mt-4">
            <Button size="sm" variant="outline" className="h-8">
              <Plus className="h-4 w-4 mr-1" />
              Add sub-task
            </Button>
            {task.status !== "done" && (
              <Button size="sm" variant="outline" className="h-8 ml-auto">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mark as complete
              </Button>
            )}
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="details" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="subtasks" className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Sub-tasks
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                Comments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Task Information</h3>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Assigned to:</span>
                      <div className="flex items-center ml-auto">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback
                            style={{
                              backgroundColor: getAvatarColor(task.assignee),
                            }}
                          >
                            {task.assignee || "UN"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm ml-2">
                          {task.assignee
                            ? getFullName(task.assignee)
                            : "Unassigned"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Due date:</span>
                      <span className="text-sm ml-auto">{task.date}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Project:</span>
                      <span className="text-sm ml-auto">
                        {task.project || "Not assigned"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Deliverable:</span>
                      <span className="text-sm ml-auto">
                        {task.deliverable || "Not assigned"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Phase:</span>
                      <span className="text-sm ml-auto">
                        {task.deliverablePhase || "Not assigned"}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">
                      Project Manager:
                    </span>
                    <div className="flex items-center ml-auto">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback style={{ backgroundColor: "#27acaa" }}>
                          OK
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm ml-2">Ons Khiari</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Description</h3>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
                <Separator />
                <p className="text-sm text-gray-600">{task.text}</p>
                {!task.text && (
                  <div className="flex items-center justify-center py-4 text-gray-400">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>No description provided</span>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="subtasks" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">
                  Sub-tasks ({subTasks.filter((st) => st.completed).length}/
                  {subTasks.length})
                </h3>
                <Button size="sm" variant="outline" className="h-7">
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>

              <div className="space-y-3 bg-gray-50 p-4 rounded-lg border">
                {subTasks.map((subTask) => (
                  <div
                    key={subTask.id}
                    className="flex items-start gap-2 p-3 rounded-md hover:bg-gray-100 transition-colors border border-gray-100"
                  >
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
                      className={`text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        subTask.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {subTask.text}
                    </label>
                  </div>
                ))}

                {subTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <CheckCircle2 className="h-8 w-8 mb-2 opacity-20" />
                    <span>No sub-tasks yet</span>
                    <Button size="sm" variant="outline" className="mt-4">
                      <Plus className="h-3 w-3 mr-1" />
                      Add your first sub-task
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">
                  Comments ({comments.length})
                </h3>
              </div>

              <div className="space-y-4">
                <div className="relative bg-gray-50 p-4 rounded-lg border">
                  <textarea
                    className="min-h-[100px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 text-xs"
                      >
                        Looks good!
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 text-xs"
                      >
                        Need help?
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 text-xs"
                      >
                        Can you clarify..?
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      onClick={addComment}
                      disabled={!newComment.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback
                            style={{ backgroundColor: comment.userColor }}
                          >
                            {comment.user}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {getFullName(comment.user)}
                        </span>
                        <span className="text-xs text-gray-500 ml-auto">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}

                  {comments.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <MessageCircle className="h-8 w-8 mb-2 opacity-20" />
                      <span>No comments yet</span>
                      <p className="text-xs text-center mt-1">
                        Be the first to share your thoughts
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
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
