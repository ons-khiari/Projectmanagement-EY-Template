export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  progressColor: string;
  startDate: string;
  endDate: string;
  members: {
    id: string;
    avatar: string;
    color: string;
  }[];
}
