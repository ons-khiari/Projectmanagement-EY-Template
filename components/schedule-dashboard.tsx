"use client";

import { useState } from "react";
import { Search, Edit, Settings, Plus } from "lucide-react";
import MonthlyCalendar from "./monthly-calendar";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";

// Sample deliverable phase data
const sampleDeliverablePhases: DeliverablePhase[] = [
  {
    id: "1",
    title: "Deliverable of conception phase",
    startDate: new Date(2023, 2, 5), // March 5, 2023
    endDate: new Date(2023, 2, 16), // March 16, 2023
    color: "blue",
  },
  {
    id: "2",
    title: "Deliverable of dev phase",
    startDate: new Date(2023, 2, 6), // March 6, 2023
    endDate: new Date(2023, 2, 18), // March 18, 2023
    color: "orange",
  },
  {
    id: "3",
    title: "Deliverable of dev phase",
    startDate: new Date(2023, 2, 8), // March 8, 2023
    endDate: new Date(2023, 2, 19), // March 19, 2023
    color: "yellow",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ScheduleDashboard() {
  const [viewMode, setViewMode] = useState("monthly");
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2023);
  const [deliverablePhases, setDeliverablePhases] = useState(
    sampleDeliverablePhases
  );

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#444444]">Schedule/</h1>
        <div></div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
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

        <button className="flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]">
          <Plus className="h-4 w-4" />
          <span>Add Deliverable phase</span>
        </button>
      </div>

      {/* View mode tabs */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              viewMode === "daily"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setViewMode("daily")}
          >
            Daily
          </button>
          <button
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              viewMode === "weekly"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setViewMode("weekly")}
          >
            Weekly
          </button>
          <button
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              viewMode === "monthly"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setViewMode("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Month selector */}
      <div className="mb-4 grid grid-cols-12 gap-1">
        {months.map((month, index) => (
          <button
            key={month}
            className={`rounded-md px-2 py-1.5 text-center text-sm ${
              index === currentMonth
                ? "bg-blue-50 font-medium text-[#444444]"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentMonth(index)}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <div className="overflow-auto">
        <MonthlyCalendar
          year={currentYear}
          month={currentMonth}
          deliverablePhases={deliverablePhases}
        />
      </div>
    </div>
  );
}
