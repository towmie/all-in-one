import styled from "styled-components";
import FilterTab from "../../ui/FliterTab";
import Spinner from "../../ui/Spinner";
import { useFilteredEvents } from "./Calendar/useFilteredEvents";
import EventListItem from "./Calendar/Events/EventListItem";
import { useSearchParams } from "react-router-dom";

const EventsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

function Todos() {
  const { filteredEvents, isLoadingFilteredEvents } = useFilteredEvents();
  const [searchParams] = useSearchParams();
  const currentFilter = searchParams.get("events") || "today";

  const filterOptions = [
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "week", label: "Next 7 day" },
    { value: "all", label: "All" },
  ];
  const currentFilterValue = filterOptions.find(
    (option) => option.value === currentFilter
  ).label;

  if (isLoadingFilteredEvents) return <Spinner />;

  return (
    <div>
      <div>
        <FilterTab filterField="events" options={filterOptions} />
      </div>
      <div>
        {filteredEvents.length > 0 ? (
          <EventsList>
            {filteredEvents.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
          </EventsList>
        ) : (
          <div>No events for {currentFilterValue.toLowerCase()}</div>
        )}
      </div>
    </div>
  );
}

export default Todos;
