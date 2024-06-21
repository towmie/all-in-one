import EventModal from "./EventModal";
import { useState } from "react";
import { cc } from "../../../utils/utils";
// import { useEvents } from "./useEvents";

export default function CalendarEvents({ event }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const { updateEvent, deleteEvent } = useEvents();

  return (
    <>
      <button
        onClick={() => setEditModalOpen(true)}
        className={cc("event", event.color, event.allDay && "all-day-event")}
      >
        {event.allDay ? (
          <div className="event-name">{event.title}</div>
        ) : (
          <>
            <div className={`color-dot ${event.color}`}></div>
            <div className="event-time">{event.startTime.slice(0, -3)}</div>
            <div className="event-name">{event.title}</div>
          </>
        )}
      </button>
      <EventModal
        event={event}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        // onSubmit={(e) => updateEvent(e, event.id)}
        // onDelete={() => deleteEvent(event.id)}
      />
    </>
  );
}
