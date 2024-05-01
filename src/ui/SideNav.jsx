import { useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { NavList, StyledNavItem, StyledNavLink } from "../styles/Nav";
import SubMenuNav from "./SubMenuNav";
import ToggleButton from "./ToggleButton";
import styled from "styled-components";

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

function SideNav() {
  const [showDropdown, setShowDropdown] = useState(false);

  function handleToggle() {
    setShowDropdown(!showDropdown);
  }

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavItem currentState={showDropdown}>
            <FlexWrapper>
              <MdAttachMoney />
              <span>Finance</span>
            </FlexWrapper>
            <ToggleButton onClick={() => handleToggle()}>
              <FaChevronDown />
            </ToggleButton>
          </StyledNavItem>
          {showDropdown && <SubMenuNav />}
        </li>

        <li>
          <StyledNavLink to="/users">
            <IoBriefcaseOutline />
            <span>Projects</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default SideNav;
