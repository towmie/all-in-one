import styled from "styled-components";
import Button from "../../ui/Button";
import { useProjects } from "./useProjects";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import { FaPlus } from "react-icons/fa";
import ProjectAddForm from "./ProjectAddForm";
import ProjectCardItem from "./ProjectCardItem";

const StyledProjectList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const StyledProjectsHeader = styled.div`
  margin-bottom: 2.4rem;
  display: flex;
  justify-content: flex-end;
`;

function ProjectList() {
  const { projects, isLoadingprojects } = useProjects();

  if (isLoadingprojects) return <Spinner />;

  return (
    <div>
      <Modal>
        <StyledProjectsHeader>
          <Modal.Open opens="add-fiat-form">
            <Button size="medium" variations="link">
              <FaPlus />
              <span> Add new</span>
            </Button>
          </Modal.Open>
          <Modal.Window name="add-fiat-form">
            <ProjectAddForm />
          </Modal.Window>
        </StyledProjectsHeader>
        <StyledProjectList>
          {projects.map((project) => (
            <ProjectCardItem key={project.id} project={project} />
          ))}
        </StyledProjectList>
      </Modal>
    </div>
  );
}

export default ProjectList;
