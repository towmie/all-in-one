import Modal from "../../../ui/Modal";
import { formatDate } from "../../../utils/utils";

import CalendarEvents from "./CalendarEvents";

export default function ViewMoreCalendarEventsModal({ events, ...modalProps }) {
  if (events.length === 0) return null;

  return (
    <Modal>
      <Modal.Open opens="view-more-events-btn">
        <div className="modal-title">
          {/* <small>{formatDate(events[0].date, { dateStyle: "short" })}</small> */}
          <button className="close-btn" onClick={modalProps.onClose}>
            &times;
          </button>
        </div>
      </Modal.Open>
      <Modal.Window name="view-more-events-btn">
        <div className="events">
          {events.map((event) => (
            <CalendarEvents event={event} key={event.id} />
          ))}
        </div>
      </Modal.Window>
    </Modal>
  );
}
