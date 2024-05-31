import ButtonIcon from "../../ui/ButtonIcon";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { useDeleteProject } from "./useDeleteProject";

const ProjectItem = styled.div`
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: var(--border-radius-lg);
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-size: cover;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background-color: #000;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.2;
  }

  & * {
    color: var(--color-brand-50);
    position: relative;
    z-index: 2;
  }
`;

const ProjectItemMenu = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

function ProjectCardItem({ project }) {
  const { deleteProject, isDeleting } = useDeleteProject();

  return (
    <ProjectItem bg={project.bg} key={project.id} color={project.color}>
      <ProjectItemMenu>
        <Modal.Open opens="edit-project">
          <ButtonIcon>
            <HiPencil />
          </ButtonIcon>
        </Modal.Open>

        <Modal.Open opens="delete-project">
          <ButtonIcon>
            <HiTrash />
          </ButtonIcon>
        </Modal.Open>
        <Modal.Window name="delete-project">
          <ConfirmDelete
            resourceName={project.projectName}
            disabled={isDeleting}
            onConfirm={() => deleteProject(project.id)}
          />
        </Modal.Window>
      </ProjectItemMenu>
      <Heading as="h4" type="secondary">
        {project.projectName.charAt(0).toUpperCase() +
          project.projectName.slice(1)}
      </Heading>
    </ProjectItem>
  );
}

export default ProjectCardItem;
