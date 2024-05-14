import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import FiatAddForm from "./FiatAddForm";

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
        <Modal>
          <Modal.Open opens="add-fiat-form">
            <Button size="medium" variations="link">
              <FaPlus />
              <span> Add new</span>
            </Button>
          </Modal.Open>
          <Modal.Window name="add-fiat-form">
            <FiatAddForm />
          </Modal.Window>
        </Modal>
      </MenuContainer>
    </StyledFiatMenu>
  );
}

export default FiatMenu;
