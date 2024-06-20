import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useMemo, useState } from "react";
import CalendarDay from "./CalendarDay";
import { formatDate } from "../../../utils/utils";
import { useEvents } from "./useEvents";
import "./index.css";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Spinner from "../../../ui/Spinner";

export default function Calendar() {
  const [selectedMonth, setSelectedMont] = useState(new Date());

  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({
      start: firstWeekStart,
      end: lastWeekEnd,
    });
  }, [selectedMonth]);

  const { events, isLoadingEvents } = useEvents();

  if (isLoadingEvents) return <Spinner />;

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn" onClick={() => setSelectedMont(new Date())}>
          Today
        </button>
        <div>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMont((m) => subMonths(m, 1))}
          >
            <FaAnglesLeft />
          </button>
          <span className="month-title">
            {formatDate(selectedMonth, { month: "long", year: "numeric" })}
          </span>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMont((m) => addMonths(m, 1))}
          >
            <FaAnglesRight />
          </button>
        </div>
      </div>
      <div className="days">
        {calendarDays.map((day, i) => (
          <CalendarDay
            events={events.filter((event) => isSameDay(day, event.date))}
            key={day.getTime()}
            day={day}
            showWeekName={i < 7}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  );
}
