export interface Deliverable {
  id: string;
  title: string;
  description: string;
  link: string;
  priority: string;
  date: string;
  assignee: {
    id: string;
    avatar: string;
    color: string;
  }[];
  project: string;
}
