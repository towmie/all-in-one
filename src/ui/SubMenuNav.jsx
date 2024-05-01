import { MdCurrencyBitcoin } from "react-icons/md";
import { StyledSubNavLink, SubNavList } from "../styles/Nav";
import { BsCashCoin } from "react-icons/bs";

function SubMenuNav() {
  return (
    <SubNavList>
      <li>
        <StyledSubNavLink to="/crypto">
          <MdCurrencyBitcoin />
          <span>Crypto</span>
        </StyledSubNavLink>
      </li>
      <li>
        <StyledSubNavLink to="/fiat">
          <BsCashCoin />
          <span>Fiat</span>
        </StyledSubNavLink>
      </li>
    </SubNavList>
  );
}

export default SubMenuNav;
