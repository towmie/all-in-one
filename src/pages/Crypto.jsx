import CryptoSummary from "../features/crypto/CryptoSummary";
import CoinsList from "../features/crypto/CoinsList";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import styled from "styled-components";
import Modal from "../ui/Modal";
import AddCoinForm from "../features/crypto/AddCoinForm";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

function Crypto() {
  return (
    <div>
      <CryptoSummary />
      <Modal>
        <Container>
          <Heading as="h3">Overview:</Heading>
          <Modal.Open opens="add-coin-form">
            <Button type="primary">Add new income/coin</Button>
          </Modal.Open>
        </Container>
        <Modal.Window name="add-coin-form">
          <AddCoinForm />
        </Modal.Window>
      </Modal>
      <CoinsList />
    </div>
  );
}

export default Crypto;
