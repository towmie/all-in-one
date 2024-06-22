import EventModal from "./EventModal";
import { useState } from "react";
import { cc } from "../../../utils/utils";
import Modal from "../../../ui/Modal";
// import { useEvents } from "./useEvents";

export default function CalendarEvents({ event }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const { updateEvent, deleteEvent } = useEvents();

  return (
    <>
      <Modal>
        <Modal.Open opens="edit-event-btn">
          <button
            className={cc(
              "event",
              event.color,
              event.allDay && "all-day-event"
            )}
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
        </Modal.Open>
        <Modal.Window name="edit-event-btn">
          <EventModal
            event={event}
            isOpen={isEditModalOpen}
            type="edit"
            // onClose={() => setEditModalOpen(false)}
            // onSubmit={(e) => updateEvent(e, event.id)}
            // onDelete={() => deleteEvent(event.id)}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}
