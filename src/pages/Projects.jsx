import { subDays } from "date-fns";
import ProjectEventCalendar from "../features/projects/ProjectEventCalendar";

function Projects() {
  return (
    <div>
      <ProjectEventCalendar
        events={[
          { date: subDays(new Date(), 7), title: "add video" },
          { date: subDays(new Date(), 2), title: "add new post" },
          { date: subDays(new Date(), 4), title: "create portfolio" },
        ]}
      />
    </div>
  );
}

export default Projects;
