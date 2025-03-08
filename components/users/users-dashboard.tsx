"use client";

import { useState } from "react";
import {
  Search,
  Edit,
  Settings,
  Pencil,
  Trash2,
  Mail,
  Phone,
  CreditCard,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import type { User as UserType } from "@/app/types/user";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample user data
const sampleUsers: UserType[] = [
  {
    id: "1",
    name: "Ons khiari",
    email: "ons.khiari@esprit.tn",
    phoneNumber: "+216 55678206",
    cin: "1273TU4YT21",
    role: "user",
    avatar: "OK",
  },
  {
    id: "2",
    name: "Arij ben said",
    email: "arij.bensaid@esprit.tn",
    phoneNumber: "+216 55678206",
    cin: "1273TU4YT21",
    role: "user",
    avatar: "AS",
  },
  {
    id: "3",
    name: "Ahmed Jguirim",
    email: "ahmed.jguirim@esprit.tn",
    phoneNumber: "+216 55678206",
    cin: "1273TU4YT21",
    role: "admin",
    avatar: "AJ",
  },
  {
    id: "4",
    name: "Amine Mhenni",
    email: "amine.mhenni@esprit.tn",
    phoneNumber: "+216 55678206",
    cin: "1273TU4YT21",
    role: "admin",
    avatar: "AM",
  },
];

export default function UsersDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on active tab and search query
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "admins")
      return user.role.includes("admin") && matchesSearch;

    // For any other tab, exclude users with 'admin' role and apply the search query
    return !user.role.includes("admin") && matchesSearch;
  });

  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // Get role badge color and icon
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return {
          color: "bg-purple-100 text-purple-800 border-purple-200",
          icon: <ShieldCheck className="mr-1 h-3 w-3" />,
        };
      case "user":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <User className="mr-1 h-3 w-3" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Users className="mr-1 h-3 w-3" />,
        };
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#444444]">Users/</h1>
        <div></div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-48 rounded-md border border-gray-300 pl-9 pr-4 text-sm focus:border-[#ffe500] focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              activeTab === "all"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              activeTab === "admins"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("admins")}
          >
            Admins
          </button>

          <button
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              activeTab === "others"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("others")}
          >
            Others
          </button>
        </div>
      </div>

      {/* Users table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                Contact
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                CIN
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                Role
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const { color, icon } = getRoleBadge(user.role);
              return (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#27acaa] to-[#32c5c2] text-sm font-medium text-white shadow-sm">
                        {user.avatar}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="mr-2 h-3.5 w-3.5 text-gray-400" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="mr-2 h-3.5 w-3.5 text-gray-400" />
                        {user.phoneNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="mr-2 h-3.5 w-3.5 text-gray-400" />
                      {user.cin}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`flex w-fit items-center border px-2 py-1 ${color}`}
                    >
                      {icon}
                      <span className="capitalize">{user.role}</span>
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <TooltipProvider>
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="rounded-full p-1.5 text-green-500 hover:bg-green-50">
                              <Pencil className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit user</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="rounded-full p-1.5 text-red-500 hover:bg-red-50"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete user</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </td>
                </tr>
              );
            })}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <Users className="mb-2 h-10 w-10 text-gray-300" />
                    <p>No users found</p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
