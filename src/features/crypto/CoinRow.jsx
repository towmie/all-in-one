import styled, { css } from "styled-components";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "./../../ui/Modal";
// import ConfirmDelete from "./../../ui/ConfirmDelete";
import Table from "./../../ui/Table";
import { formatCurrency, getROI } from "./../../utils/utils";
import Menus from "./../../ui/Menus";

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

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

function CoinRow({ coin, index }) {
  const { id: coinID, coinName, amount, rate, amountInUSD, amountSpent } = coin;
  const roi = getROI(amountInUSD, amountSpent);

  return (
    <Table.Row>
      {/* <Img src={image} /> */}
      <div>{index + 1}</div>
      <Coin>{coinName}</Coin>
      <div>{formatCurrency(rate)}</div>
      <div>{amount}</div>
      <Price>{formatCurrency(amountInUSD)}</Price>
      <div>{formatCurrency(amountSpent)}</div>
      <ROI roi={roi > 0 ? "positive" : "negative"}>{roi}%</ROI>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={coinID} />
            <Menus.List id={coinID}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CoinRow;
