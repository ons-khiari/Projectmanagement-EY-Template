"use client";

import type React from "react";

import { useState } from "react";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";
import { X } from "lucide-react";

interface MonthlyCalendarProps {
  year: number;
  month: number;
  deliverablePhases: DeliverablePhase[];
}

export default function ImprovedMonthlyCalendar({
  year,
  month,
  deliverablePhases,
}: MonthlyCalendarProps) {
  const [expandedDay, setExpandedDay] = useState<{
    day: number;
    weekIndex: number;
    dayIndex: number;
  } | null>(null);
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null); // Added state for hovered phase

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
  const firstDayAdjusted = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Get days from previous month to fill the first week
  const daysFromPrevMonth = firstDayAdjusted;
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

  // Create calendar grid
  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
  }));

  // Add days from previous month
  const prevMonthDays = Array.from({ length: daysFromPrevMonth }, (_, i) => ({
    day: daysInPrevMonth - daysFromPrevMonth + i + 1,
    currentMonth: false,
  }));

  // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
  const totalCells = 42;
  const daysFromNextMonth = totalCells - days.length - prevMonthDays.length;
  const nextMonthDays = Array.from({ length: daysFromNextMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: false,
  }));

  // Combine all days
  const allDays = [...prevMonthDays, ...days, ...nextMonthDays];

  // Create week rows
  const weeks: (typeof allDays)[] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  // Check if a date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Check if a deliverable phase is active on a specific day
  const isPhaseActiveOnDay = (
    phase: DeliverablePhase,
    day: number,
    isCurrentMonth: boolean
  ) => {
    if (!isCurrentMonth) return false;

    const date = new Date(year, month, day);

    // Check if it's a weekend (Saturday = 6, Sunday = 0)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return false; // No deliverables on weekends
    }

    return date >= phase.startDate && date <= phase.endDate;
  };

  // Check if a day is the start of a phase
  const isPhaseStart = (
    phase: DeliverablePhase,
    day: number,
    isCurrentMonth: boolean
  ) => {
    if (!isCurrentMonth) return false;

    const date = new Date(year, month, day);
    return date.getTime() === phase.startDate.getTime();
  };

  // Check if a day is the end of a phase
  const isPhaseEnd = (
    phase: DeliverablePhase,
    day: number,
    isCurrentMonth: boolean
  ) => {
    if (!isCurrentMonth) return false;

    const date = new Date(year, month, day);
    return date.getTime() === phase.endDate.getTime();
  };

  // Get phases for a specific day
  const getPhasesForDay = (day: number, isCurrentMonth: boolean) => {
    return deliverablePhases.filter((phase) =>
      isPhaseActiveOnDay(phase, day, isCurrentMonth)
    );
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
  const getPhaseCardStyle = (
    phase: DeliverablePhase,
    day: number,
    isCurrentMonth: boolean
  ) => {
    if (!isCurrentMonth) return "";

    const isStart = isPhaseStart(phase, day, isCurrentMonth);
    const isEnd = isPhaseEnd(phase, day, isCurrentMonth);

    if (isStart && isEnd) return "rounded-md";
    if (isStart) return "rounded-l-md rounded-r-none border-r-0";
    if (isEnd) return "rounded-r-md rounded-l-none border-l-0";
    return "rounded-none border-l-0 border-r-0";
  };

  // Handle clicking on "more" indicator
  const handleMoreClick = (
    day: number,
    weekIndex: number,
    dayIndex: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent event bubbling

    if (
      expandedDay &&
      expandedDay.day === day &&
      expandedDay.weekIndex === weekIndex &&
      expandedDay.dayIndex === dayIndex
    ) {
      setExpandedDay(null); // Toggle off if already expanded
    } else {
      setExpandedDay({ day, weekIndex, dayIndex });
    }
  };

  // Close expanded day view
  const closeExpandedDay = (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedDay(null);
  };

  return (
    <div className="w-full bg-white p-4">
      {/* Days of week header */}
      <div className="mb-4 grid grid-cols-7 gap-2">
        <div className="text-center text-sm font-medium text-gray-500">MON</div>
        <div className="text-center text-sm font-medium text-gray-500">TUE</div>
        <div className="text-center text-sm font-medium text-gray-500">WED</div>
        <div className="text-center text-sm font-medium text-gray-500">THU</div>
        <div className="text-center text-sm font-medium text-gray-500">FRI</div>
        <div className="text-center text-sm font-medium text-gray-500">SAT</div>
        <div className="text-center text-sm font-medium text-gray-500">SUN</div>
      </div>

      {/* Calendar grid */}
      {weeks.map((week, weekIndex) => (
        <div key={`week-${weekIndex}`} className="mb-2 grid grid-cols-7 gap-2">
          {week.map((dayObj, dayIndex) => {
            const dayPhases = getPhasesForDay(dayObj.day, dayObj.currentMonth);
            const visibleLimit = 3;
            const hasMore = dayPhases.length > visibleLimit;
            const isWeekend = dayIndex === 5 || dayIndex === 6; // Saturday or Sunday (5 = Sat, 6 = Sun in our grid)

            return (
              <div
                key={`day-${weekIndex}-${dayIndex}`}
                className={`relative min-h-[120px] rounded-lg p-2 transition-all duration-200 ${
                  !dayObj.currentMonth
                    ? "bg-gray-50 text-gray-400"
                    : isWeekend
                    ? "bg-gray-200 text-gray-500"
                    : dayPhases.length > 0
                    ? "bg-gray-50"
                    : "bg-white hover:bg-gray-50"
                } ${
                  isToday(dayObj.day) && dayObj.currentMonth
                    ? "ring-2 ring-[#27acaa] ring-opacity-50"
                    : ""
                }`}
                onClick={(e) =>
                  handleMoreClick(dayObj.day, weekIndex, dayIndex, e)
                }
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    isToday(dayObj.day) && dayObj.currentMonth
                      ? "bg-[#27acaa] text-white"
                      : ""
                  }`}
                >
                  {dayObj.day}
                </div>

                {isWeekend && dayObj.currentMonth && (
                  <div className="mt-1 text-center text-xs text-gray-500">
                    Weekend
                  </div>
                )}

                {/* Show phases for this day with connected cards */}
                {dayPhases.length > 0 && dayObj.currentMonth && !isWeekend && (
                  <div className="mt-2 space-y-1.5">
                    {dayPhases.slice(0, visibleLimit).map((phase) => {
                      const colorSet =
                        phaseColors[phase.color as keyof typeof phaseColors];
                      const cardStyle = getPhaseCardStyle(
                        phase,
                        dayObj.day,
                        dayObj.currentMonth
                      );
                      const isStart = isPhaseStart(
                        phase,
                        dayObj.day,
                        dayObj.currentMonth
                      );

                      return (
                        <div
                          key={`day-phase-${phase.id}`}
                          className={`flex h-6 items-center border ${cardStyle} ${
                            hoveredPhase === phase.id
                              ? `${colorSet.bg} ${colorSet.text} ${colorSet.border}`
                              : `${colorSet.light} ${colorSet.lightBorder} ${colorSet.lightText}`
                          } transition-colors duration-150 cursor-pointer`}
                          onMouseEnter={() => setHoveredPhase(phase.id)}
                          onMouseLeave={() => setHoveredPhase(null)}
                        >
                          <div className="w-full truncate px-1 text-xs">
                            {isStart ? phase.title : ""}
                          </div>
                        </div>
                      );
                    })}
                    {hasMore && (
                      <button
                        onClick={(e) =>
                          handleMoreClick(dayObj.day, weekIndex, dayIndex, e)
                        }
                        className="flex w-full items-center justify-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-300 transition-colors"
                      >
                        +{dayPhases.length - visibleLimit} more
                      </button>
                    )}
                  </div>
                )}
                {expandedDay &&
                  expandedDay.day === dayObj.day &&
                  expandedDay.weekIndex === weekIndex &&
                  expandedDay.dayIndex === dayIndex && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md bg-gray-50 p-4 shadow-lg border border-gray-200 max-w-[500px]">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          All Phases
                        </h4>
                        <button
                          onClick={closeExpandedDay}
                          className="rounded-full p-1 text-gray-500 hover:bg-gray-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto space-y-2">
                        {getPhasesForDay(dayObj.day, true).map((phase) => {
                          const colorSet =
                            phaseColors[
                              phase.color as keyof typeof phaseColors
                            ];

                          return (
                            <div
                              key={`expanded-phase-${phase.id}`}
                              className={`flex items-center rounded-md border p-3 ${colorSet.light} ${colorSet.lightBorder}`}
                            >
                              <div
                                className={`mr-2 h-3 w-3 rounded-full ${colorSet.bg}`}
                              ></div>
                              <div className="flex-1 min-w-0">
                                <div
                                  className={`font-medium ${colorSet.lightText} text-sm whitespace-normal`}
                                  title={phase.title} // Title will show full text on hover
                                >
                                  {phase.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {phase.startDate.toLocaleDateString()} -{" "}
                                  {phase.endDate.toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
