export interface Deliverable {
  id: string;
  title: string;
  description: string;
  link: string; // Ensure this is present
  project: string;
  priority: "low" | "med" | "high";
  priority_number: number;
  date: string;
  assignee: {
    id: string;
    avatar: string;
    color: string;
  }[];
  deliverablePhase?: string;
  status: "todo" | "in-progress" | "done";
}
