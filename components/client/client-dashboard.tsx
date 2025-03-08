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
  Globe,
  Briefcase,
  Building2,
  User,
  Building,
  Heart,
} from "lucide-react";
import { clients as sampleClients, type ClientType } from "@/app/types/client";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ClientsDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [clients, setClients] = useState(sampleClients);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter clients based on active tab and search query
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.industry?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      );

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "companies")
      return client.type === "company" && matchesSearch;
    if (activeTab === "individuals")
      return client.type === "individual" && matchesSearch;
    if (activeTab === "others")
      return (
        (client.type === "government" || client.type === "non-profit") &&
        matchesSearch
      );
    return matchesSearch;
  });

  // Handle client deletion
  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  // Get client type badge properties
  const getClientTypeBadge = (type: ClientType) => {
    switch (type) {
      case "individual":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <User className="mr-1 h-3 w-3" />,
        };
      case "company":
        return {
          color: "bg-purple-100 text-purple-800 border-purple-200",
          icon: <Building2 className="mr-1 h-3 w-3" />,
        };
      case "government":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <Building className="mr-1 h-3 w-3" />,
        };
      case "non-profit":
        return {
          color: "bg-orange-100 text-orange-800 border-orange-200",
          icon: <Heart className="mr-1 h-3 w-3" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Building2 className="mr-1 h-3 w-3" />,
        };
    }
  };

  // Get industry icon
  const getIndustryIcon = (industry?: string) => {
    if (!industry) return <Briefcase className="h-3.5 w-3.5 text-gray-400" />;

    // You can add more specific industry icons here
    return <Briefcase className="h-3.5 w-3.5 text-gray-400" />;
  };

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#444444]">Clients/</h1>
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
              activeTab === "companies"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("companies")}
          >
            Companies
          </button>
          <button
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              activeTab === "individuals"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("individuals")}
          >
            Individuals
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

      {/* Clients table */}
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
                Type
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                Industry
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => {
              const { color, icon } = getClientTypeBadge(client.type);
              return (
                <tr
                  key={client.id}
                  className="border-b border-gray-200 transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#27acaa] to-[#32c5c2] text-sm font-medium text-white shadow-sm">
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {client.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="mr-2 h-3.5 w-3.5 text-gray-400" />
                        {client.email}
                      </div>
                      {client.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-2 h-3.5 w-3.5 text-gray-400" />
                          {client.phone}
                        </div>
                      )}
                      {client.website && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Globe className="mr-2 h-3.5 w-3.5 text-gray-400" />
                          {client.website}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`flex w-fit items-center border px-2 py-1 ${color}`}
                    >
                      {icon}
                      <span className="capitalize">{client.type}</span>
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {client.industry ? (
                      <div className="flex items-center text-sm text-gray-600">
                        {getIndustryIcon(client.industry)}
                        <span className="ml-2">{client.industry}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
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
                            <p>Edit client</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="rounded-full p-1.5 text-red-500 hover:bg-red-50"
                              onClick={() => handleDeleteClient(client.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete client</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </td>
                </tr>
              );
            })}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <Building2 className="mb-2 h-10 w-10 text-gray-300" />
                    <p>No clients found</p>
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
