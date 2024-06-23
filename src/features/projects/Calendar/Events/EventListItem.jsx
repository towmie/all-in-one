import { format, parseISO } from "date-fns";
import { FaRegFolderOpen, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../ui/Button";
import { HiTrash } from "react-icons/hi2";
import { useDeleteEvent } from "../useDeleteEvent";

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  gap: 1rem;

  a,
  span {
    font-size: 1.4rem;
    color: var(--color-grey-500);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;
`;

const StyledDescription = styled.div`
  display: flex;
  gap: 1rem;
`;

function EventListItem({ event }) {
  const { id, title, date, projectName } = event;
  const { deleteEvent } = useDeleteEvent();

  return (
    <StyledLi>
      <StyledTitle>
        <FaTasks />
        {title}
      </StyledTitle>
      <StyledDescription>
        {projectName && (
          <Link to="#">
            <span>
              <FaRegFolderOpen />
            </span>
            {projectName}
          </Link>
        )}
        {date && <span>{format(parseISO(date), "MMMM d, yyyy")}</span>}
        <Button variation="secondary" onClick={() => deleteEvent(id)}>
          <HiTrash />
        </Button>
      </StyledDescription>
    </StyledLi>
  );
}

export default EventListItem;
