"use client";

import { useState } from "react";
import type { DeliverablePhase } from "@/app/types/deliverable-phase";
import { Clock } from "lucide-react";
import { months } from "@/app/utils/months";

interface DailyCalendarProps {
  year: number;
  month: number;
  day: number;
  deliverablePhases: DeliverablePhase[];
}

export default function DailyCalendar({
  year,
  month,
  day,
  deliverablePhases,
}: DailyCalendarProps) {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  // Create the date object for the selected day
  const selectedDate = new Date(year, month, day);

  // Get day of week
  const dayOfWeek = selectedDate.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Check if the date is today
  const isToday = () => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  // Check if the selected day is a weekend
  const isWeekend = () => {
    const dayOfWeek = selectedDate.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  };

  // Get phases active on this day
  const getActivePhasesForDay = () => {
    // If it's a weekend, return an empty array
    if (isWeekend()) {
      return [];
    }

    return deliverablePhases.filter((phase) => {
      const dayStart = new Date(selectedDate);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(selectedDate);
      dayEnd.setHours(23, 59, 59, 999);

      return phase.startDate <= dayEnd && phase.endDate >= dayStart;
    });
  };

  // Check if a phase starts on this day
  const isPhaseStart = (phase: DeliverablePhase) => {
    const phaseStart = new Date(phase.startDate);
    phaseStart.setHours(0, 0, 0, 0);

    const dayStart = new Date(selectedDate);
    dayStart.setHours(0, 0, 0, 0);

    return phaseStart.getTime() === dayStart.getTime();
  };

  // Check if a phase ends on this day
  const isPhaseEnd = (phase: DeliverablePhase) => {
    const phaseEnd = new Date(phase.endDate);
    phaseEnd.setHours(0, 0, 0, 0);

    const dayStart = new Date(selectedDate);
    dayStart.setHours(0, 0, 0, 0);

    return phaseEnd.getTime() === dayStart.getTime();
  };

  // Generate time slots for the day (hourly)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const amPm = i < 12 ? "AM" : "PM";
    return {
      hour: i,
      displayTime: `${hour}:00 ${amPm}`,
    };
  });

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

  const activePhases = getActivePhasesForDay();

  return (
    <div className="w-full bg-white p-4">
      {/* Day header */}
      <div
        className={`mb-4 rounded-md p-3 text-center ${
          isToday()
            ? "bg-[#27acaa] text-white"
            : isWeekend()
            ? "bg-gray-300 text-gray-700"
            : "bg-gray-200"
        }`}
      >
        <h2 className="text-xl font-medium">
          {daysOfWeek[dayOfWeek]}, {months[month]} {day}, {year}
        </h2>
        {isWeekend() && (
          <div className="mt-1 text-sm">
            Weekend - No Deliverables Scheduled
          </div>
        )}
      </div>

      {isWeekend() ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-8 text-center">
          <div className="mb-4 rounded-full bg-gray-200 p-4">
            <Clock className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            Weekend Day
          </h3>
          <p className="max-w-md text-gray-500">
            No deliverables are scheduled for weekends. Enjoy your time off!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr]">
          {/* Time slots */}
          <div className="rounded-md border border-gray-200 bg-gray-50">
            <div className="border-b border-gray-200 p-3">
              <h3 className="font-medium text-gray-700">Schedule</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {timeSlots.map((slot) => (
                <div
                  key={`time-${slot.hour}`}
                  className="flex items-center p-2"
                >
                  <Clock className="mr-2 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {slot.displayTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverable phases */}
          <div className="rounded-md border border-gray-200">
            <div className="border-b border-gray-200 p-3">
              <h3 className="font-medium text-gray-700">Deliverable Phases</h3>
            </div>

            {activePhases.length > 0 ? (
              <div className="divide-y divide-gray-200 p-3">
                {activePhases.map((phase) => {
                  const colorSet =
                    phaseColors[phase.color as keyof typeof phaseColors];
                  const isStart = isPhaseStart(phase);
                  const isEnd = isPhaseEnd(phase);

                  return (
                    <div
                      key={`phase-${phase.id}`}
                      className={`mb-3 rounded-md border p-3 ${
                        hoveredPhase === phase.id
                          ? `${colorSet.bg} ${colorSet.text} ${colorSet.border}`
                          : `${colorSet.light} ${colorSet.lightBorder}`
                      }`}
                      onMouseEnter={() => setHoveredPhase(phase.id)}
                      onMouseLeave={() => setHoveredPhase(null)}
                    >
                      <div className="mb-2 flex items-center">
                        <div
                          className={`mr-2 h-3 w-3 rounded-full ${colorSet.bg}`}
                        ></div>
                        <h4
                          className={`font-medium ${
                            hoveredPhase === phase.id
                              ? "text-white"
                              : colorSet.lightText
                          }`}
                        >
                          {phase.title}
                        </h4>
                      </div>

                      <div
                        className={`text-sm ${
                          hoveredPhase === phase.id
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      >
                        <div className="mb-1">
                          <span className="font-medium">Start:</span>{" "}
                          {phase.startDate.toLocaleDateString()}
                          {isStart && (
                            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                              Starts Today
                            </span>
                          )}
                        </div>
                        <div className="mb-1">
                          <span className="font-medium">End:</span>{" "}
                          {phase.endDate.toLocaleDateString()}
                          {isEnd && (
                            <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                              Ends Today
                            </span>
                          )}
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
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center text-gray-500">
                No deliverable phases scheduled for this day
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
