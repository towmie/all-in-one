import { HiOutlineHome } from "react-icons/hi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdCurrencyBitcoin } from "react-icons/md";
import { NavList, StyledNavLink } from "../styles/NavStyles";

import styled from "styled-components";
import { BsCashCoin } from "react-icons/bs";

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

function SideNav() {
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
          <StyledNavLink to="/crypto">
            <MdCurrencyBitcoin />
            <span>Crypto</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/fiat">
            <BsCashCoin />
            <span>Fiat spendings/savings</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/projects">
            <IoBriefcaseOutline />
            <span>Projects</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default SideNav;
