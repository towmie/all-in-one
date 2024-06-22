import FilterTab from "../../ui/FliterTab";
import Spinner from "../../ui/Spinner";
import { useFilteredEvents } from "./Calendar/useFilteredEvents";

function Todos() {
  const { filteredEvents, isLoadingFilteredEvents } = useFilteredEvents();

  if (isLoadingFilteredEvents) return <Spinner />;

  return (
    <div>
      <div>
        <FilterTab
          filterField="events"
          options={[
            { value: "today", label: "Today" },
            { value: "tomorrow", label: "Tomorrow" },
            { value: "week", label: "Next 7 day" },
            { value: "all", label: "All" },
          ]}
        />
      </div>
      <div>
        <ul>
          {filteredEvents.map((event) => (
            <li key={event.id}>
              {event.title} - {event.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
