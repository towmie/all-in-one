import styled from "styled-components";
// import UserInfo from "./UserInfo";
import SideNav from "./SideNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  width: clamp(320px, 30%, 450px);
  padding: 1.6rem;
  border-right: 1px solid var(--color-grey-100);
`;

function Sidebar() {
  return (
    <StyledSidebar>
      {/* <UserInfo /> */}
      <SideNav />
    </StyledSidebar>
  );
}

export default Sidebar;
