import type { DeliverablePhase } from "@/app/types/deliverable-phase";

interface MonthlyCalendarProps {
  year: number;
  month: number;
  deliverablePhases: DeliverablePhase[];
}

export default function MonthlyCalendar({
  year,
  month,
  deliverablePhases,
}: MonthlyCalendarProps) {
  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
  const firstDayAdjusted = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Create calendar grid
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Create week rows
  const weeks: number[][] = [];
  let week: number[] = Array(firstDayAdjusted).fill(0);

  days.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  // Add remaining days
  if (week.length > 0) {
    weeks.push([...week, ...Array(7 - week.length).fill(0)]);
  }

  // Check if a deliverable phase is active on a specific day
  const isPhaseActiveOnDay = (phase: DeliverablePhase, day: number) => {
    const date = new Date(year, month, day);
    return date >= phase.startDate && date <= phase.endDate;
  };

  // Get phases for a specific day
  const getPhasesForDay = (day: number) => {
    return deliverablePhases.filter((phase) => isPhaseActiveOnDay(phase, day));
  };

  // Get the position of a day in the calendar grid
  const getDayPosition = (day: number) => {
    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      const dayIndex = weeks[weekIndex].indexOf(day);
      if (dayIndex !== -1) {
        return { weekIndex, dayIndex };
      }
    }
    return null;
  };

  // Calculate the span of a phase in a week
  const getPhaseSpanInWeek = (phase: DeliverablePhase, weekIndex: number) => {
    const week = weeks[weekIndex];
    const validDays = week.filter(
      (day) => day > 0 && isPhaseActiveOnDay(phase, day)
    );

    if (validDays.length === 0) return null;

    const startDay = Math.min(...validDays);
    const endDay = Math.max(...validDays);

    const startPosition = week.indexOf(startDay);
    const endPosition = week.indexOf(endDay);

    return {
      start: startPosition,
      end: endPosition,
      span: endPosition - startPosition + 1,
    };
  };

  // Phase colors
  const phaseColors = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    yellow: "bg-[#ffe500]",
  };

  return (
    <div className="w-full border border-gray-200">
      {/* Days of week header */}
      <div className="grid grid-cols-7">
        <div className="border-b border-r border-gray-200 p-2 text-center text-sm font-medium text-gray-500">
          MON
        </div>
        <div className="border-b border-r border-gray-200 p-2 text-center text-sm font-medium text-gray-500">
          TUE
        </div>
        <div className="border-b border-r border-gray-200 p-2 text-center text-sm font-medium text-gray-500">
          WED
        </div>
        <div className="border-b border-r border-gray-200 p-2 text-center text-sm font-medium text-gray-500">
          THU
        </div>
        <div className="border-b border-r border-gray-200 p-2 text-center text-sm font-medium text-gray-500">
          FRI
        </div>
        <div className="border-b border-r border-gray-200 p-2 text-center text-sm font-medium text-gray-500">
          SAT
        </div>
        <div className="border-b border-gray-200 p-2 text-center text-sm font-medium text-gray-500">
          SUN
        </div>
      </div>

      {/* Calendar grid */}
      {weeks.map((week, weekIndex) => (
        <div key={`week-${weekIndex}`} className="relative">
          {/* Days */}
          <div className="grid grid-cols-7">
            {week.map((day, dayIndex) => (
              <div
                key={`day-${weekIndex}-${dayIndex}`}
                className={`min-h-[80px] border-b border-r border-gray-200 p-2 ${
                  day === 0 ? "bg-white" : "bg-gray-100"
                } ${dayIndex === 6 ? "border-r-0" : ""} ${
                  weekIndex === weeks.length - 1 ? "border-b-0" : ""
                }`}
              >
                {day > 0 && (
                  <div className="text-sm font-medium text-gray-700">{day}</div>
                )}
              </div>
            ))}
          </div>

          {/* Deliverable phases for this week */}
          <div className="absolute left-0 top-0 h-full w-full">
            {deliverablePhases.map((phase, phaseIndex) => {
              const span = getPhaseSpanInWeek(phase, weekIndex);
              if (!span) return null;

              // Calculate top position based on phase index
              const topPosition = 24 + phaseIndex * 20; // 24px for day number + spacing

              return (
                <div
                  key={`phase-${phase.id}-week-${weekIndex}`}
                  className={`absolute h-4 ${
                    phaseColors[phase.color as keyof typeof phaseColors]
                  }`}
                  style={{
                    left: `${(span.start / 7) * 100}%`,
                    width: `${(span.span / 7) * 100}%`,
                    top: `${topPosition}px`,
                  }}
                >
                  {span.span > 2 && (
                    <span className="ml-2 text-xs text-white">
                      {phase.title}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
