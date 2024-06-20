import { Fragment, useId, useRef, useState } from "react";
import { formatDate } from "../../../utils/utils";

import Modal from "./Modal";
import { EVENTS_COLOR } from "./useEvents";
import Button from "../../../ui/Button";
import { FaPlus } from "react-icons/fa";
import { useCreateEvent } from "./useCreateEvent";
import { useProjects } from "../useProjects";
import Spinner from "../../../ui/Spinner";

export default function EventModal({
  type,
  onDelete,
  event,
  date,
  ...modalProps
}) {
  const formId = useId();
  const [selectedColor, setSelectedColor] = useState(
    event?.color || EVENTS_COLOR[0]
  );
  const isNew = event === undefined;
  const [isAlldayChecked, setAlldayChecked] = useState(event?.allDay || false);
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const endTimeRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const projectIdRef = useRef();
  const { createEvent, isPending } = useCreateEvent();
  const { projects, isLoadingprojects } = useProjects();

  const isWorking = isLoadingprojects || isPending;

  function handleSubmit(e) {
    e.preventDefault();
    if (date) console.log(date, event);

    const title = nameRef.current?.value;
    const endTime = endTimeRef.current?.value;
    const description = descriptionRef.current?.value;
    const projectId = +projectIdRef.current?.value;

    if (title === "" || title == null) return;

    const commonProps = {
      title,
      description,
      projectId,
      date: date || event?.date,
      color: selectedColor,
    };

    let newEvent;

    if (isAlldayChecked) {
      newEvent = { ...commonProps, allDay: true, startTime: "", endTime: "" };
    } else {
      if (
        startTime == null ||
        startTime === "" ||
        endTime == null ||
        endTime === ""
      ) {
        return;
      }
      newEvent = { ...commonProps, allDay: false, startTime, endTime };
    }
    modalProps.onClose();

    if (type === "create") createEvent(newEvent);
  }

  if (isWorking) return <Spinner />;

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div>{isNew ? "Add" : "Edit"} Event</div>
        <small>{formatDate(date, { dateStyle: "short" })}</small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor={`${formId}-title`}>Title</label>
          <input
            defaultValue={event?.title}
            ref={nameRef}
            type="text"
            name="title"
            id={`${formId}-title`}
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${formId}-title`}>Description</label>
          <textarea
            defaultValue={event?.description}
            ref={descriptionRef}
            name="description"
            id={`${formId}-description`}
          />
        </div>
        <div className="form-group">
          <select name="project" id="project" ref={projectIdRef}>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox">
          <input
            checked={isAlldayChecked}
            onChange={(e) => setAlldayChecked(e.target.checked)}
            type="checkbox"
            name="all-day"
            id={`${formId}-all-day`}
          />
          <label htmlFor={`${formId}-all-day`}>All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-start-time`}>Start Time</label>
            <input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required={!isAlldayChecked}
              disabled={isAlldayChecked}
              type="time"
              name="start-time"
              id={`${formId}-start-time`}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input
              ref={endTimeRef}
              defaultValue={event?.endTime}
              min={startTime}
              required={!isAlldayChecked}
              disabled={isAlldayChecked}
              type="time"
              name="end-time"
              id={`${formId}-end-time`}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            {EVENTS_COLOR.map((color) => (
              <Fragment key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  id={`${formId}-${color}`}
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                  className="color-radio"
                />
                <label htmlFor={`${formId}-${color}`}>
                  <span className="sr-only">{color}</span>
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="row">
          {/* <button className="btn btn-success" type="submit">
            {isNew ? "Add" : "Edit"}
          </button> */}
          <Button size="medium" variations="link">
            <FaPlus />
            <span> {isNew ? " Add" : " Edit"}</span>
          </Button>
          {onDelete !== null && (
            // <button onClick={onDelete} className="btn btn-delete" type="button">
            //   Delete
            // </button>
            <Button onClick={onDelete} size="medium" variation="danger">
              <span> Delete</span>
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
