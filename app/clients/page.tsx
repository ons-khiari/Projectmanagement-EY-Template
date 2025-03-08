import ClientsDashboard from "@/components/client/client-dashboard";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function ClientsPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          <ClientsDashboard />
        </main>
      </div>
    </div>
  );
}
