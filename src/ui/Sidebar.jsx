import styled from "styled-components";
import UserInfo from "./UserInfo";
import SideNav from "./SideNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  width: clamp(320px, 30%, 450px);
  padding: 1.6rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <UserInfo />
      <SideNav />
    </StyledSidebar>
  );
}

export default Sidebar;
