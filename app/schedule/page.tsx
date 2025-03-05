import ScheduleDashboard from "@/components/schedule-dashboard";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function SchedulePage() {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <ScheduleDashboard />
        </main>
      </div>
    </div>
  );
}
