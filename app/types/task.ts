export interface Task {
  id: string;
  text: string;
  priority: "low" | "med" | "high";
  date: string;
  assignee: string;
  project: string;
  deliverable?: string;
  deliverablePhase?: string;
  status: "todo" | "in-progress" | "done";
}
