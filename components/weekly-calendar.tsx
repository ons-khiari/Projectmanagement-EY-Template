"use client";

import { useState } from "react";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";
import { ChevronDown, ChevronUp } from "lucide-react";
import { months } from "@/app/utils/months";

interface WeeklyCalendarProps {
  year: number;
  month: number;
  week: number; // 0-indexed week of the month
  deliverablePhases: DeliverablePhase[];
}

export default function WeeklyCalendar({
  year,
  month,
  week,
  deliverablePhases,
}: WeeklyCalendarProps) {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  // Get the first day of the month
  const firstDayOfMonth = new Date(year, month, 1);

  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
  const firstDayAdjusted = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // Calculate the first day of the requested week
  // Week 0 starts with the Monday of the week containing the 1st of the month
  // If the 1st is not a Monday, we may need to go back to the previous month
  const startOffset = week * 7 - firstDayAdjusted;
  const weekStart = new Date(year, month, 1 + startOffset);

  // Generate the 7 days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Update the isPhaseActiveOnDay function to exclude weekends
  const isPhaseActiveOnDay = (phase: DeliverablePhase, date: Date) => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    // Check if it's a weekend (Saturday = 6, Sunday = 0)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return false; // No deliverables on weekends
    }

    return phase.startDate <= dayEnd && phase.endDate >= dayStart;
  };

  // Check if a day is the start of a phase
  const isPhaseStart = (phase: DeliverablePhase, date: Date) => {
    const phaseStart = new Date(phase.startDate);
    phaseStart.setHours(0, 0, 0, 0);

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    return phaseStart.getTime() === dayStart.getTime();
  };

  // Check if a day is the end of a phase
  const isPhaseEnd = (phase: DeliverablePhase, date: Date) => {
    const phaseEnd = new Date(phase.endDate);
    phaseEnd.setHours(0, 0, 0, 0);

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    return phaseEnd.getTime() === dayStart.getTime();
  };

  // Get phases for a specific day
  const getPhasesForDay = (date: Date) => {
    return deliverablePhases.filter((phase) => isPhaseActiveOnDay(phase, date));
  };

  // Format date as "Mon, 15"
  const formatDayHeader = (date: Date) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayOfWeek = date.getDay();
    // Convert from Sunday=0 to Monday=0
    const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    return `${days[adjustedDayOfWeek]}, ${date.getDate()}`;
  };

  // Phase colors with better contrast
  const phaseColors = {
    blue: {
      bg: "bg-blue-500",
      text: "text-white",
      hover: "hover:bg-blue-600",
      border: "border-blue-600",
      light: "bg-blue-50",
      lightText: "text-blue-800",
      lightBorder: "border-blue-200",
    },
    orange: {
      bg: "bg-orange-500",
      text: "text-white",
      hover: "hover:bg-orange-600",
      border: "border-orange-600",
      light: "bg-orange-50",
      lightText: "text-orange-800",
      lightBorder: "border-orange-200",
    },
    yellow: {
      bg: "bg-[#ffe500]",
      text: "text-[#444444]",
      hover: "hover:bg-[#f5dc00]",
      border: "border-[#f5dc00]",
      light: "bg-yellow-50",
      lightText: "text-yellow-800",
      lightBorder: "border-yellow-200",
    },
    green: {
      bg: "bg-green-500",
      text: "text-white",
      hover: "hover:bg-green-600",
      border: "border-green-600",
      light: "bg-green-50",
      lightText: "text-green-800",
      lightBorder: "border-green-200",
    },
    purple: {
      bg: "bg-purple-500",
      text: "text-white",
      hover: "hover:bg-purple-600",
      border: "border-purple-600",
      light: "bg-purple-50",
      lightText: "text-purple-800",
      lightBorder: "border-purple-200",
    },
  };

  // Get the border radius class based on phase position
  const getPhaseCardStyle = (phase: DeliverablePhase, date: Date) => {
    const isStart = isPhaseStart(phase, date);
    const isEnd = isPhaseEnd(phase, date);

    if (isStart && isEnd) return "rounded-md";
    if (isStart) return "rounded-l-md rounded-r-none border-r-0";
    if (isEnd) return "rounded-r-md rounded-l-none border-l-0";
    return "rounded-none border-l-0 border-r-0";
  };

  // Toggle phase details
  const togglePhaseDetails = (phaseId: string) => {
    if (expandedPhase === phaseId) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(phaseId);
    }
  };

  // Get week date range for header
  const getWeekDateRange = () => {
    const startDate = weekDays[0];
    const endDate = weekDays[6];

    // If the week spans two months
    if (startDate.getMonth() !== endDate.getMonth()) {
      return `${startDate.getDate()} ${
        months[startDate.getMonth()]
      } - ${endDate.getDate()} ${
        months[endDate.getMonth()]
      } ${endDate.getFullYear()}`;
    }

    return `${startDate.getDate()} - ${endDate.getDate()} ${
      months[startDate.getMonth()]
    } ${startDate.getFullYear()}`;
  };

  return (
    <div className="w-full bg-white p-4">
      <h3 className="mb-4 text-center text-lg font-medium text-gray-800">
        {getWeekDateRange()}
      </h3>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, index) => {
          const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday

          return (
            <div
              key={`day-header-${index}`}
              className={`p-2 text-center ${
                isToday(date)
                  ? "rounded-t-md bg-[#27acaa] font-medium text-white"
                  : isWeekend
                  ? "bg-gray-300 text-gray-600"
                  : date.getMonth() !== month
                  ? "bg-gray-100 text-gray-500"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {formatDayHeader(date)}
              {isWeekend && <div className="text-xs font-normal">Weekend</div>}
            </div>
          );
        })}
      </div>

      {/* Calendar body */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, dayIndex) => {
          const dayPhases = getPhasesForDay(date);
          const isCurrentMonth = date.getMonth() === month;
          const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday

          return (
            <div
              key={`day-${dayIndex}`}
              className={`min-h-[300px] rounded-b-md p-2 ${
                isToday(date)
                  ? "ring-2 ring-[#27acaa] ring-opacity-50"
                  : isWeekend
                  ? "bg-gray-200"
                  : !isCurrentMonth
                  ? "bg-gray-100"
                  : "bg-gray-50"
              }`}
            >
              {isWeekend ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                  <span className="mb-2 text-sm font-medium">Weekend</span>
                  <span className="text-xs">No deliverables scheduled</span>
                </div>
              ) : (
                // Phases for this day
                <div className="space-y-2">
                  {dayPhases.map((phase) => {
                    const colorSet =
                      phaseColors[phase.color as keyof typeof phaseColors];
                    const cardStyle = getPhaseCardStyle(phase, date);
                    const isStart = isPhaseStart(phase, date);
                    const isExpanded = expandedPhase === phase.id;

                    return (
                      <div
                        key={`day-phase-${phase.id}`}
                        className={`border transition-colors duration-150 ${cardStyle} ${
                          hoveredPhase === phase.id
                            ? `${colorSet.bg} ${colorSet.text} ${colorSet.border}`
                            : `${colorSet.light} ${colorSet.lightBorder} ${colorSet.lightText}`
                        }`}
                        onMouseEnter={() => setHoveredPhase(phase.id)}
                        onMouseLeave={() => setHoveredPhase(null)}
                      >
                        <div
                          className="flex cursor-pointer items-center justify-between p-2"
                          onClick={() => togglePhaseDetails(phase.id)}
                        >
                          <div className="flex-1 truncate text-sm">
                            {isStart ? phase.title : ""}
                          </div>
                          {isStart && (
                            <button className="ml-1 flex h-5 w-5 items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10">
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>

                        {isExpanded && isStart && (
                          <div
                            className={`border-t ${colorSet.lightBorder} p-2 text-xs`}
                          >
                            <div className="mb-1">
                              <span className="font-medium">Start:</span>{" "}
                              {phase.startDate.toLocaleDateString()}
                            </div>
                            <div className="mb-1">
                              <span className="font-medium">End:</span>{" "}
                              {phase.endDate.toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Duration:</span>{" "}
                              {Math.ceil(
                                (phase.endDate.getTime() -
                                  phase.startDate.getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {dayPhases.length === 0 && (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No deliverables
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
