import styled, { css } from "styled-components";
import Heading from "../../ui/Heading";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useMemo } from "react";

const HeaderContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 2.4rem;
  text-align: center;
`;
const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 1rem;
`;

const DaysNames = styled.div`
  font-weight: bold;
  text-align: center;
`;

const StyledDay = styled.div`
  border: 1px solid var(--color-brand-900);
  border-radius: var(--border-radius-md);
  padding: 1rem;

  ${(props) =>
    props.today === "true" &&
    css`
      background-color: #000;
      color: #fff;
    `}

  ${(props) =>
    props.empty &&
    css`
      background-color: #ccc;
      color: #000;
    `}
`;

const StyledEvents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 1.6rem;
`;

const StyledEvent = styled.div`
  text-align: center;
  background-color: var(--color-brand-800);
  color: var(--color-brand-50);
  border-radius: var(--border-radius-md);
  padding: 0.4rem 0.8rem;
`;

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function ProjectEventCalendar({ events }) {
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startDayIndex = getDay(firstDayOfMonth) - 1;

  const daysOfMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const eventsByDate = useMemo(() => {
    return events.reduce((acc, cur) => {
      const dateKey = format(cur.date, "yyyy-MM-dd");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(cur);
      return acc;
    }, {});
  }, [events]);

  return (
    <>
      <HeaderContainer>
        <div>
          <Heading as="h2">{format(currentDate, "MMMM yyyy")}</Heading>
        </div>
      </HeaderContainer>
      <DaysContainer>
        {WEEK_DAYS.map((day) => (
          <DaysNames key={day}>{day}</DaysNames>
        ))}
        {Array.from({ length: startDayIndex }).map((_, i) => (
          <StyledDay empty="true" key={`empty-${i}`}></StyledDay>
        ))}
        {daysOfMonth.map((day, i) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvents = eventsByDate[dateKey] || [];

          return (
            <StyledDay today={isToday(day) ? "true" : "false"} key={i}>
              {format(day, "d")}
              <StyledEvents>
                {todaysEvents.map((event) => (
                  <StyledEvent key={event.title}>{event.title}</StyledEvent>
                ))}
              </StyledEvents>
            </StyledDay>
          );
        })}
      </DaysContainer>
    </>
  );
}

export default ProjectEventCalendar;
