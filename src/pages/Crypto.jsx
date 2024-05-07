import CryptoSummary from "../features/crypto/CryptoSummary";
import CoinsList from "../features/crypto/CoinsList";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import styled from "styled-components";
import AddCoin from "../features/crypto/AddCoin";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

function Crypto() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <CryptoSummary />
      <Container>
        <Heading as="h3">Overview:</Heading>
        <Button onClick={() => setIsOpen(!isOpen)} type="primary">
          Add new income/coin
        </Button>
      </Container>
      <AddCoin setIsOpen={setIsOpen} isOpen={isOpen} />
      <CoinsList />
    </div>
  );
}

export default Crypto;
