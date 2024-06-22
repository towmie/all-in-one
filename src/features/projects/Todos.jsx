import { FaTasks } from "react-icons/fa";

import FilterTab from "../../ui/FliterTab";

function Todos() {
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
        <ul></ul>
      </div>
    </div>
  );
}

export default Todos;
