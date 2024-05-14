import styled from "styled-components";
import Tabs from "../../ui/Tabs";
import Button from "../../ui/Button";
import { NavLink } from "react-router-dom";

const StyledFiatMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.2rem;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const StyledNavLink = styled(NavLink)`
  &.active button {
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

function FiatMenu() {
  return (
    <StyledFiatMenu>
      <MenuContainer>
        <StyledNavLink to="/fiat/overview">
          <Button size="medium" variation="secondary">
            Overview
          </Button>
        </StyledNavLink>
        <StyledNavLink to="/fiat/income">
          <Button size="medium" variation="secondary">
            Income List
          </Button>
        </StyledNavLink>
        <StyledNavLink to="/fiat/outcome">
          <Button size="medium" variation="secondary">
            Outcome List
          </Button>
        </StyledNavLink>
        <StyledNavLink to="/fiat/saved">
          <Button size="medium" variation="secondary">
            Savings
          </Button>
        </StyledNavLink>
      </MenuContainer>

      <MenuContainer>
        <Button size="medium" variations="primary">
          Add new income
        </Button>
        <Button size="medium" variations="secondary">
          Add new outcome
        </Button>
        <Button size="medium" variations="link">
          Add new savings
        </Button>
      </MenuContainer>
    </StyledFiatMenu>
  );
}

export default FiatMenu;
