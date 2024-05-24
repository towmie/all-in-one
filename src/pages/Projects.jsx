import { subDays } from "date-fns";
import ProjectEventCalendar from "../features/projects/ProjectEventCalendar";
import ProjectsWrapper from "../features/projects/ProjectsWrapper";

function Projects() {
  return (
    <div>
      <ProjectEventCalendar
        events={[
          { date: subDays(new Date(), 7), title: "add video" },
          { date: subDays(new Date(), 2), title: "add new post" },
          { date: subDays(new Date(), 4), title: "create portfolio" },
          { date: subDays(new Date(), 4), title: "create base" },
        ]}
      />
      <ProjectsWrapper />
    </div>
  );
}

export default Projects;
