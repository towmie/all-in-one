import styled from "styled-components";
import ProjectList from "./ProjectList";
import Todos from "./Todos";

const StyledProjectWrapper = styled.div`
  margin-top: 2.4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--color-brand-200);
  padding-top: 2.4rem;
  gap: 2.4rem;
`;
function ProjectsWrapper() {
  return (
    <StyledProjectWrapper>
      <Todos />
      <ProjectList />
    </StyledProjectWrapper>
  );
}

export default ProjectsWrapper;
