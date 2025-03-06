"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
} from "lucide-react";
import ImprovedMonthlyCalendar from "./monthly-calendar";
import WeeklyCalendar from "./weekly-calendar";
import DailyCalendar from "./daily-calendar";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";
import { months } from "@/app/utils/months";
import {
  ScheduleFilterBar,
  type ScheduleFilterState,
} from "./schedule-filter";

// Sample deliverable phase data with more variety
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
    title: "Deliverable of QA phase",
    startDate: new Date(2023, 2, 8), // March 8, 2023
    endDate: new Date(2023, 2, 19), // March 19, 2023
    color: "yellow",
  },
  {
    id: "4",
    title: "Deliverable of deployment phase",
    startDate: new Date(2023, 2, 15), // March 15, 2023
    endDate: new Date(2023, 2, 25), // March 25, 2023
    color: "green",
  },
  {
    id: "5",
    title: "Deliverable of documentation phase",
    startDate: new Date(2023, 2, 20), // March 20, 2023
    endDate: new Date(2023, 2, 28), // March 28, 2023
    color: "purple",
  },
  // Add more phases on the same days to demonstrate the "more" functionality
  {
    id: "6",
    title: "Deliverable of testing phase",
    startDate: new Date(2023, 2, 8), // March 8, 2023
    endDate: new Date(2023, 2, 12), // March 12, 2023
    color: "blue",
  },
  {
    id: "7",
    title: "Deliverable of review phase",
    startDate: new Date(2023, 2, 8), // March 8, 2023
    endDate: new Date(2023, 2, 10), // March 10, 2023
    color: "green",
  },
  {
    id: "8",
    title: "Deliverable of planning phase",
    startDate: new Date(2023, 2, 8), // March 8, 2023
    endDate: new Date(2023, 2, 14), // March 14, 2023
    color: "purple",
  },
];

export default function ImprovedScheduleDashboard() {
  const [viewMode, setViewMode] = useState("monthly");
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2023);
  const [currentWeek, setCurrentWeek] = useState(0); // First week of the month
  const [currentDay, setCurrentDay] = useState(1); // First day of the month
  const [deliverablePhases, setDeliverablePhases] = useState(
    sampleDeliverablePhases
  );
  const [filteredDeliverablePhases, setFilteredDeliverablePhases] = useState(
    sampleDeliverablePhases
  );
  const [showHelp, setShowHelp] = useState(true);
  const [filters, setFilters] = useState<ScheduleFilterState>({
    startDate: null,
    endDate: null,
  });

  // Apply filters to deliverable phases
  useEffect(() => {
    const newFilteredPhases = deliverablePhases.filter((phase) => {
      // Filter by start date
      if (filters.startDate) {
        // Convert both dates to midnight for date-only comparison
        const filterStartDate = new Date(filters.startDate);
        filterStartDate.setHours(0, 0, 0, 0);

        const phaseStartDate = new Date(phase.startDate);
        phaseStartDate.setHours(0, 0, 0, 0);

        if (phaseStartDate < filterStartDate) {
          return false;
        }
      }

      // Filter by end date
      if (filters.endDate) {
        // Convert both dates to midnight for date-only comparison
        const filterEndDate = new Date(filters.endDate);
        filterEndDate.setHours(23, 59, 59, 999);

        const phaseEndDate = new Date(phase.endDate);
        phaseEndDate.setHours(23, 59, 59, 999);

        if (phaseEndDate > filterEndDate) {
          return false;
        }
      }

      return true;
    });

    setFilteredDeliverablePhases(newFilteredPhases);
  }, [deliverablePhases, filters]);

  // Calculate the number of weeks in the current month
  const getWeeksInMonth = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday as first day

    return Math.ceil((daysInMonth + firstDayAdjusted) / 7);
  };

  // Function to navigate to previous month/week/day
  const goToPrevious = () => {
    if (viewMode === "monthly") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
      setCurrentWeek(0); // Reset to first week when changing months
      setCurrentDay(1); // Reset to first day when changing months
    } else if (viewMode === "weekly") {
      if (currentWeek === 0) {
        // Go to previous month, last week
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
        // Set to last week of the new month
        setTimeout(() => {
          setCurrentWeek(getWeeksInMonth() - 1);
        }, 0);
      } else {
        setCurrentWeek(currentWeek - 1);
      }
    } else if (viewMode === "daily") {
      if (currentDay === 1) {
        // Go to previous month, last day
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
        // Set to last day of the new month
        const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
        setCurrentDay(lastDayOfMonth);
      } else {
        setCurrentDay(currentDay - 1);
      }
    }
  };

  // Function to navigate to next month/week/day
  const goToNext = () => {
    if (viewMode === "monthly") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
      setCurrentWeek(0); // Reset to first week when changing months
      setCurrentDay(1); // Reset to first day when changing months
    } else if (viewMode === "weekly") {
      const weeksInMonth = getWeeksInMonth();

      if (currentWeek >= weeksInMonth - 1) {
        // Go to next month, first week
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
        setCurrentWeek(0);
      } else {
        setCurrentWeek(currentWeek + 1);
      }
    } else if (viewMode === "daily") {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      if (currentDay >= daysInMonth) {
        // Go to next month, first day
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
        setCurrentDay(1);
      } else {
        setCurrentDay(currentDay + 1);
      }
    }
  };

  // Function to go to today
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setCurrentDay(today.getDate());

    // Calculate the current week
    const firstDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).getDay();
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;
    const todayDate = today.getDate();
    const currentWeekIndex = Math.floor((todayDate + firstDayAdjusted - 1) / 7);

    setCurrentWeek(currentWeekIndex);
  };

  // Close help tooltip
  const closeHelp = () => {
    setShowHelp(false);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: ScheduleFilterState) => {
    setFilters(newFilters);
  };

  // Get the current view title
  const getCurrentViewTitle = () => {
    if (viewMode === "monthly") {
      return `${months[currentMonth]} ${currentYear}`;
    } else if (viewMode === "weekly") {
      // Calculate the first day of the week
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const firstDayAdjusted = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

      const startOffset = currentWeek * 7 - firstDayAdjusted;
      const weekStart = new Date(currentYear, currentMonth, 1 + startOffset);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      // Format: "Mar 5 - Mar 11, 2023" or "Mar 26 - Apr 1, 2023"
      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${months[weekStart.getMonth()].substring(
          0,
          3
        )} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      } else {
        return `${months[weekStart.getMonth()].substring(
          0,
          3
        )} ${weekStart.getDate()} - ${months[weekEnd.getMonth()].substring(
          0,
          3
        )} ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      }
    } else if (viewMode === "daily") {
      const date = new Date(currentYear, currentMonth, currentDay);
      const dayOfWeek = date.getDay();
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      return `${daysOfWeek[dayOfWeek]}, ${months[currentMonth]} ${currentDay}, ${currentYear}`;
    }

    return "";
  };

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

      {/* Filter Bar */}
      <ScheduleFilterBar onFilterChange={handleFilterChange} />

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

      {/* Improved navigation */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-medium text-[#444444]">
            {getCurrentViewTitle()}
          </h2>
          <button
            onClick={goToNext}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <button
          onClick={goToToday}
          className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          <CalendarIcon className="h-4 w-4" />
          <span>Today</span>
        </button>
      </div>

      {/* Calendar */}
      <div className="overflow-auto rounded-lg bg-white shadow-sm">
        {viewMode === "monthly" && (
          <ImprovedMonthlyCalendar
            year={currentYear}
            month={currentMonth}
            deliverablePhases={filteredDeliverablePhases}
          />
        )}
        {viewMode === "weekly" && (
          <WeeklyCalendar
            year={currentYear}
            month={currentMonth}
            week={currentWeek}
            deliverablePhases={filteredDeliverablePhases}
          />
        )}
        {viewMode === "daily" && (
          <DailyCalendar
            year={currentYear}
            month={currentMonth}
            day={currentDay}
            deliverablePhases={filteredDeliverablePhases}
          />
        )}
      </div>
    </div>
  );
}
