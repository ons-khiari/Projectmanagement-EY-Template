"use client";

import { useState } from "react";
import { Search, Edit, Settings, Pencil, Trash2 } from "lucide-react";
import type { User } from "@/app/types/user";

// Sample user data
const sampleUsers: User[] = [
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
    role: "client",
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
    if (activeTab === "clients")
      return user.role.includes("client") && matchesSearch;

    // For any other tab, exclude users with 'admin' or 'client' role and apply the search query
    return (
      !user.role.includes("admin") &&
      !user.role.includes("client") &&
      matchesSearch
    );
  });

  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
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
              activeTab === "clients"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("clients")}
          >
            Clients
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                Phone number
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
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#27acaa] text-xs text-white">
                      {user.avatar}
                    </div>
                    <span className="ml-3 text-sm text-gray-800">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {user.phoneNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">{user.cin}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{user.role}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="rounded p-1 text-green-500 hover:bg-gray-100">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded p-1 text-red-500 hover:bg-gray-100"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
