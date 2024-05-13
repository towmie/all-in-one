import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "./../../ui/Modal";
import Table from "./../../ui/Table";
import { formatCurrency } from "./../../utils/utils";
import ConfirmDelete from "../../ui/ConfirmDelete";
// import { useDeleteCoin } from "./useDeleteCoin";
import ButtonIcon from "../../ui/ButtonIcon";

const MenuCell = styled.div`
  position: relative;
  display: flex;
`;

function FiatRow({ fiatItem, type, index }) {
  let itemObj;
  if (type === "income") {
    const { income, date, category } = fiatItem;
    itemObj = {
      item: income,
      date,
      category,
    };
  }
  if (type === "outcome") {
    const { outcome, date, category } = fiatItem;
    itemObj = {
      item: outcome,
      date,
      category,
    };
  }

  return (
    <Table.Row>
      <div>{index + 1}</div>
      <div>{formatCurrency(itemObj.item)}</div>
      <div>{itemObj.date}</div>
      <div>{itemObj.category}</div>

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
            {/* <EditCoinForm coinToEdit={coin} /> */}
          </Modal.Window>

          <Modal.Window name="delete-fiat">
            <ConfirmDelete
              resourceName="income"
              //   disabled={isDeleting}
              //   onConfirm={() => deleteCoin(coinID)}
            />
          </Modal.Window>
        </Modal>
      </MenuCell>
    </Table.Row>
  );
}

export default FiatRow;
