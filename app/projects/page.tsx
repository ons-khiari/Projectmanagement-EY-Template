import ProjectsDashboard from "@/components/projects-dashboard";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function ProjectsPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <ProjectsDashboard />
        </main>
      </div>
    </div>
  );
}
