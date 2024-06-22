import { useId } from "react";
import { formatDate, formatTimeForSupabase } from "../../../utils/utils";
import { useForm } from "react-hook-form";

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
import { useDeleteEvent } from "./useDeleteEvent";

const LabelStyled = styled.label`
  font-weight: 500;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
`;

export default function EventModal({ type, event, date, onCloseModal }) {
  const formId = useId();
  const isNew = event === undefined;

  const { createEvent, isPending } = useCreateEvent();
  const { projects, isLoadingprojects } = useProjects();
  const { deleteEvent, isDeleteing } = useDeleteEvent();

  const { register, handleSubmit, reset, watch, formState } = useForm();
  const { errors } = formState;
  const isAllDayChecked = Boolean(watch("allDay"));
  const startTimeRef = watch("startTime");

  const isWorking = isLoadingprojects || isPending;

  function onHandleSubmit({
    title,
    description,
    projectId,
    allDay,
    startTime,
    endTime,
  }) {
    const commonProps = {
      title,
      description,
      allDay: Boolean(allDay),
      projectId: +projectId,
      date: date || event?.date,
      color: "blue",
    };

    let newEvent;
    if (allDay) {
      newEvent = { ...commonProps, startTime: "00:00:00", endTime: "00:00:00" };
    } else {
      newEvent = {
        ...commonProps,
        startTime: formatTimeForSupabase(startTime),
        endTime: formatTimeForSupabase(endTime),
      };
    }
    if (type === "create")
      createEvent(newEvent, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
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
            checked={event?.allDay || isAllDayChecked}
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

        <div className="row">
          <Button size="medium" variations="link">
            <FaPlus />
            <span> {isNew ? " Add" : " Edit"}</span>
          </Button>

          {type === "edit" && (
            <Button
              onClick={() => deleteEvent(event.id)}
              size="medium"
              variation="danger"
              disabled={isDeleteing}
            >
              <span> Delete</span>
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
