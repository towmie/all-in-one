import CryptoSummary from "../features/crypto/CryptoSummary";
import CoinsList from "../features/crypto/CoinsList";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import styled from "styled-components";

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
      <Container>
        <Heading as="h3">Overview:</Heading>
        <Button type="primary">Add new income/coin</Button>
      </Container>
      <CoinsList />
    </div>
  );
}

export default Crypto;
