export interface Deliverable {
  id: string;
  title: string;
  description: string;
  link: string;
  project: string;
  priority: "low" | "med" | "high";
  priority_number: number;
  date: string;
  assignee: {
    id: string;
    avatar: string;
    color: string;
  }[];
}
