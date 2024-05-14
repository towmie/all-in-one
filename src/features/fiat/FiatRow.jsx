import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "./../../ui/Modal";
import Table from "./../../ui/Table";
import { formatCurrency } from "./../../utils/utils";
import ConfirmDelete from "../../ui/ConfirmDelete";
// import { useDeleteCoin } from "./useDeleteCoin";
import ButtonIcon from "../../ui/ButtonIcon";
import { format } from "date-fns";
import FiatEditForm from "./FiatEditForm";
import { useDeleteFiat } from "./useDeleteFiat";

const MenuCell = styled.div`
  position: relative;
  display: flex;
`;

function FiatRow({ fiatItem, type, index }) {
  let itemObj;
  const { deleteFiat, isDeleting } = useDeleteFiat();

  if (type === "income") {
    const { id, income, date, category } = fiatItem;
    itemObj = {
      id,
      item: income,
      date,
      category,
    };
  }
  if (type === "outcome") {
    const { id, outcome, date, category } = fiatItem;
    itemObj = {
      item: outcome,
      date,
      category,
      id,
    };
  }
  if (type === "saved") {
    const { id, saved, date } = fiatItem;
    itemObj = {
      item: saved,
      date,
      id,
    };
  }

  return (
    <Table.Row>
      <div>{index + 1}</div>
      <div>{formatCurrency(itemObj.item)}</div>
      <div>{format(new Date(itemObj.date), "MMM dd yyyy")}</div>
      {type !== "saved" && <div>{itemObj.category}</div>}

      <MenuCell>
        <Modal>
          <Modal.Open opens="edit-fiat">
            <ButtonIcon>
              <HiPencil />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Open opens="delete-fiat">
            <ButtonIcon>
              <HiTrash />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Window name="edit-fiat">
            <FiatEditForm item={itemObj} type={type} />
          </Modal.Window>

          <Modal.Window name="delete-fiat">
            <ConfirmDelete
              resourceName="income"
              disabled={isDeleting}
              onConfirm={() => deleteFiat({ type, id: itemObj.id })}
            />
          </Modal.Window>
        </Modal>
      </MenuCell>
    </Table.Row>
  );
}

export default FiatRow;
