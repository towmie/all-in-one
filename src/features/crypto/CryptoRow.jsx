import styled, { css } from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency, getROI } from "../../utils/utils";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCoin } from "./useDeleteCoin";
import ButtonIcon from "../../ui/ButtonIcon";
import EditCoinForm from "./CryptoEditForm";

const Coin = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Inter";
`;

const Price = styled.div`
  font-family: "Inter";
  font-weight: 600;
`;
const ROI = styled.div`
  ${(props) =>
    props.roi === "positive" &&
    css`
      color: var(--color-green-700);
    `}

  ${(props) =>
    props.roi === "negative" &&
    css`
      color: var(--color-red-800);
    `}
    ${(props) =>
    props.roi === "neutral" &&
    css`
      color: var(--color-grey-700);
    `}

  font-family: "Inter";
  font-weight: 600;
`;

ROI.defaultProps = {
  roi: "neutral",
};

const MenuCell = styled.div`
  position: relative;
  display: flex;
`;

function CoinRow({ coin, index }) {
  const { id: coinID, coinName, amount, rate, amountInUSD, amountSpent } = coin;
  const roi = getROI(amountInUSD, amountSpent);
  const { isDeleting, deleteCoin } = useDeleteCoin();

  return (
    <Table.Row>
      <div>{index + 1}</div>
      <Coin>{coinName}</Coin>
      <div>{formatCurrency(rate)}</div>
      <div>{amount}</div>
      <Price>{formatCurrency(amountInUSD)}</Price>
      <div>{formatCurrency(amountSpent)}</div>
      <ROI roi={roi > 0 ? "positive" : "negative"}>{roi}%</ROI>
      <MenuCell>
        <Modal>
          <Modal.Open opens="edit">
            <ButtonIcon>
              <HiPencil />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Open opens="delete-coin">
            <ButtonIcon>
              <HiTrash />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Window name="edit">
            <EditCoinForm coinToEdit={coin} />
          </Modal.Window>

          <Modal.Window name="delete-coin">
            <ConfirmDelete
              resourceName="coins"
              disabled={isDeleting}
              onConfirm={() => deleteCoin(coinID)}
            />
          </Modal.Window>
        </Modal>
      </MenuCell>
    </Table.Row>
  );
}

export default CoinRow;
