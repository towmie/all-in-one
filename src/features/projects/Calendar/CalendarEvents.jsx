import { parse } from "date-fns";
import { formatDate } from "../../../utils/utils";
import EventModal from "./EventModal";
import { useState } from "react";
import { cc } from "../../../utils/utils";
import { useEvents } from "./useEvents";

export default function CalendarEvents({ event }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { updateEvent, deleteEvent } = useEvents();
  return (
    <>
      <button
        onClick={() => setEditModalOpen(true)}
        className={cc("event", event.color, event.allDays && "all-day-event")}
      >
        {event.allDays ? (
          <div className="event-name">{event.name}</div>
        ) : (
          <>
            <div className={`color-dot ${event.color}`}></div>
            <div className="event-time">
              {formatDate(parse(event.startTime, "HH:mm", event.date), {
                timeStyle: "short",
              })}
            </div>
            <div className="event-name">{event.name}</div>
          </>
        )}
      </button>
      <EventModal
        event={event}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={(e) => updateEvent(e, event.id)}
        onDelete={() => deleteEvent(event.id)}
      />
    </>
  );
}
