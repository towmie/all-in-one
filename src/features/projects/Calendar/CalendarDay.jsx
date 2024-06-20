import { endOfDay, isBefore, isSameMonth, isToday } from "date-fns";
import { useMemo, useState } from "react";
import EventModal from "./EventModal";
import CalendarEvents from "./CalendarEvents";
import OverflowContainer from "./OverflowContainer";
import ViewMoreCalendarEventsModal from "./ViewMoreCalendarEventsModal";
import { cc, formatDate } from "../../../utils/utils";

export default function CalendarDay({
  day,
  showWeekName,
  selectedMonth,
  events,
}) {
  const [isNewEventModalOpen, setNewEventModalOpen] = useState(false);
  const [isViewMoreEventModalOpen, setViewMoreEventModalOpen] = useState(false);

  const sortedEvents = useMemo(() => {
    if (!Array.isArray(events)) {
      return [];
    }
    const timeToNumber = (time) => parseFloat(time.replace(":", "."));

    return [...events]?.sort((a, b) => {
      if (a.allDay && b.allDay) {
        return 0;
      } else if (a.allDay) {
        return -1;
      } else if (b.allDay) {
        return 1;
      } else {
        return timeToNumber(a.startTime) - timeToNumber(b.startTime);
      }
    });
  }, [events]);

  return (
    <div
      className={cc(
        "day",
        !isSameMonth(day, selectedMonth) && "non-month-day",
        isBefore(endOfDay(day), new Date()) && "old-month-day"
      )}
    >
      <div className="day-header">
        {showWeekName && (
          <div className="week-name">
            {formatDate(day, { weekday: "short" })}
          </div>
        )}
        <div className={cc("day-number", isToday(day) && "today")}>
          {formatDate(day, { day: "numeric" })}
        </div>
        <button
          className="add-event-btn"
          onClick={() => setNewEventModalOpen(true)}
        >
          +
        </button>
      </div>
      {sortedEvents.length > 0 && (
        <OverflowContainer
          items={sortedEvents}
          getKey={(event) => event.id}
          renderItem={(event) => <CalendarEvents event={event} />}
          renderOverflow={(amount) => (
            <>
              <button
                onClick={() => setViewMoreEventModalOpen(true)}
                className="events-view-more-btn"
              >
                View {amount} More
              </button>
              <ViewMoreCalendarEventsModal
                events={sortedEvents}
                isOpen={isViewMoreEventModalOpen}
                onClose={() => setViewMoreEventModalOpen(false)}
              />
            </>
          )}
          className="events"
        />
      )}
      <EventModal
        date={day}
        isOpen={isNewEventModalOpen}
        onClose={() => setNewEventModalOpen(false)}
        type="create"
      />
    </div>
  );
}
