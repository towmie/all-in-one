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
import Textarea from "../../../ui/Textarea";
import { StyledSelect } from "../../../ui/Select";

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

  const [startTime, setStartTime] = useState(event?.startTime || "");

  const { createEvent, isPending } = useCreateEvent();
  const { projects, isLoadingprojects } = useProjects();
  const [projectId, setProjectId] = useState(
    event?.projectId || projects[0]?.id
  );

  const { register, handleSubmit, reset, watch, formState } = useForm();
  const { errors } = formState;
  const isAllDayChecked = watch("allDay");
  const startTimeRef = watch("startTime");

  const isWorking = isLoadingprojects || isPending;

  function onHandleSubmit(data) {
    console.log(data);
    // if (date) console.log(date, event);
    // if (title === "" || title == null) return;
    // const commonProps = {
    //   title,
    //   description,
    //   projectId,
    //   date: date || event?.date,
    //   color: selectedColor,
    // };
    // let newEvent;
    // if (isAllDayChecked) {
    //   newEvent = { ...commonProps, allDay: true, startTime: "", endTime: "" };
    // } else {
    //   if (
    //     startTime == null ||
    //     startTime === "" ||
    //     endTime == null ||
    //     endTime === ""
    //   ) {
    //     return;
    //   }
    //   newEvent = { ...commonProps, allDay: false, startTime, endTime };
    // }
    // if (type === "create") createEvent(newEvent);
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
          <Textarea
            defaultValue={event?.description}
            type="text"
            name="description"
            {...register("description", { required: "This field is required" })}
            id={`${formId}-description`}
          />
        </FormRowVertical>

        <FormRowVertical label="Projects" error={errors?.allDay?.message}>
          <StyledSelect
            name="project"
            id="projectId"
            defaultValue={event?.projectId}
            {...register("projectId")}
          >
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.projectName}
              </option>
            ))}
          </StyledSelect>
        </FormRowVertical>

        <FormRow label="All day" error={errors?.allDay?.message}>
          <Input
            defaultValue={event?.allDay || isAllDayChecked}
            type="checkbox"
            name="all-day"
            id="allDay"
            {...register("allDay")}
          />
        </FormRow>

        <div className="row">
          <div className="form-group">
            <LabelStyled htmlFor={`${formId}-start-time`}>
              Start Time
            </LabelStyled>
            <Input
              defaultValue={event?.startTime}
              required={!isAllDayChecked}
              disabled={event?.allDay || isAllDayChecked}
              type="time"
              name="start-time"
              id="startTime"
              {...register("startTime")}
            />
          </div>

          <div className="form-group">
            <LabelStyled htmlFor={`${formId}-end-time`}>End Time</LabelStyled>

            <Input
              defaultValue={event?.endTime}
              min={startTimeRef}
              required={!event?.allDay}
              disabled={event?.allDay || isAllDayChecked}
              type="time"
              name="end-time"
              id="endTime"
              {...register("endTime")}
            />
          </div>
        </div>
        {/*   <div className="form-group">
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
        </div> */}
        <div className="row">
          <Button size="medium" variations="link">
            <FaPlus />
            <span> {isNew ? " Add" : " Edit"}</span>
          </Button>
          {onDelete !== null && (
            <Button onClick={onDelete} size="medium" variation="danger">
              <span> Delete</span>
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
