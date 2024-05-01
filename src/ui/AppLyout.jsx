import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Main = styled.main`
  background-color: #000;
  flex-grow: 1;
`;
const StyledAppLyout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

function AppLyout() {
  return (
    <StyledAppLyout>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLyout>
  );
}

export default AppLyout;
