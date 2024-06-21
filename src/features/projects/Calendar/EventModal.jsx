import { Fragment, useId, useRef, useState } from "react";
import { formatDate } from "../../../utils/utils";
import { useForm } from "react-hook-form";

import { EVENTS_COLOR } from "./useEvents";
import Button from "../../../ui/Button";
import { FaPlus } from "react-icons/fa";
import { useCreateEvent } from "./useCreateEvent";
import { useProjects } from "../useProjects";
import Spinner from "../../../ui/Spinner";
import Input from "../../../ui/Input";
import FormRow from "../../../ui/FormRow";
import FormRowVertical from "../../../ui/FormRowVertical";
import Form from "../../../ui/Form";
import styled from "styled-components";

const LabelStyled = styled.label`
  font-weight: 500;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
`;

export default function EventModal({ type, onDelete, event, date }) {
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

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const isWorking = isLoadingprojects || isPending;

  function onHandleSubmit(e) {
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

    if (type === "create") createEvent(newEvent);
  }

  if (isWorking) return <Spinner />;

  return (
    <div style={{ width: "100%" }}>
      <div className="modal-title">
        <div>{isNew ? "Add" : "Edit"} Event</div>
        <small>{formatDate(date, { dateStyle: "short" })}</small>
      </div>
      <Form onSubmit={handleSubmit(onHandleSubmit)}>
        <FormRowVertical label="Title" error={errors?.title?.message}>
          <Input
            defaultValue={event?.title}
            type="text"
            name="title"
            {...register("title", { required: "This field is required" })}
            id={`${formId}-title`}
          />
        </FormRowVertical>
        <FormRowVertical
          label="Description"
          error={errors?.description?.message}
        >
          <textarea
            defaultValue={event?.description}
            type="text"
            name="description"
            {...register("description", { required: "This field is required" })}
            id={`${formId}-description`}
          />
        </FormRowVertical>
        {/* <div className="form-group">
          <label htmlFor={`${formId}-description`}>Description</label>
          <textarea
            defaultValue={event?.description}
            ref={descriptionRef}
            name="description"
            id={`${formId}-description`}
          />
        </div> */}
        {/* <div className="form-group">
          <select name="project" id="project" ref={projectIdRef}>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div> */}

        <FormRowVertical label="Projects" error={errors?.allDay?.message}>
          <select name="project" id="project" {...register("project")}>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.projectName}
              </option>
            ))}
          </select>
        </FormRowVertical>

        <FormRow label="All day" error={errors?.allDay?.message}>
          <input
            checked={isAlldayChecked}
            onChange={(e) => setAlldayChecked(e.target.checked)}
            type="checkbox"
            name="all-day"
            id={`${formId}-all-day`}
            {...register("allDay")}
          />
        </FormRow>

        <div className="row">
          <div className="form-group">
            <LabelStyled htmlFor={`${formId}-start-time`}>
              Start Time
            </LabelStyled>
            <input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required={!isAlldayChecked}
              disabled={isAlldayChecked}
              type="time"
              name="start-time"
              id={`${formId}-start-time`}
              {...register("startTime")}
            />
          </div>

          <div className="form-group">
            <LabelStyled htmlFor={`${formId}-end-time`}>End Time</LabelStyled>
            <input
              ref={endTimeRef}
              defaultValue={event?.endTime}
              min={startTime}
              required={!isAlldayChecked}
              disabled={isAlldayChecked}
              type="time"
              name="end-time"
              id={`${formId}-end-time`}
              {...register("endTime")}
            />
          </div>
        </div>
        <div className="form-group">
          <LabelStyled>Color</LabelStyled>
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
                  {...register("color")}
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
      </Form>
    </div>
  );
}
