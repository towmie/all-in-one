import { formatDate } from "../../../utils/utils";

import CalendarEvents from "./CalendarEvents";
import Modal from "./Modal";

export default function ViewMoreCalendarEventsModal({ events, ...modalProps }) {
  if (events.length === 0) return null;

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        {/* <small>{formatDate(events[0].date, { dateStyle: "short" })}</small> */}
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <div className="events">
        {events.map((event) => (
          <CalendarEvents event={event} key={event.id} />
        ))}
      </div>
    </Modal>
  );
}
