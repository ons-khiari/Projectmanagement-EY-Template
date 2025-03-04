"use client";

import {
  LayoutGrid,
  Calendar,
  FolderKanban,
  FileText,
  CheckSquare,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: FileText, label: "Deliverables", href: "/deliverables" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" }, // Changed from "/dashboard" to "/tasks"
];

export default function Sidebar() {
  const pathname = usePathname(); // Get current route

  return (
    <aside className="flex w-48 flex-col border-r border-gray-200 bg-white">
      <nav className="flex flex-1 flex-col py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href; // Check if current route matches
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`group flex items-center rounded-md px-3 py-2 ${
                    isActive
                      ? "border-l-4 border-[#ffe500] bg-gray-100 font-medium text-[#444444]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-gray-200 p-4">
        <button className="flex w-full items-center rounded-md px-3 py-2 text-gray-600 hover:bg-gray-100">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
