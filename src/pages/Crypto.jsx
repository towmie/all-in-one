import CryptoSummary from "../features/crypto/CryptoSummary";
import CoinsList from "../features/crypto/CryptoList";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import styled from "styled-components";
import Modal from "../ui/Modal";
import AddCoinForm from "../features/crypto/CryptoAddForm";
import { useCryptoList } from "../features/crypto/useCryptoBalance";
import { useUpdateCrypto } from "../features/crypto/useUpdateCryptoRates";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { IoRefresh } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

function Crypto() {
  const { cryptoData, isLoading } = useCryptoList();
  const { updateCryptoBalance } = useUpdateCrypto();
  const [isUpdating, setIsUpdating] = useState(false);

  function handleUpdating(cryptoData) {
    setIsUpdating(true);
    updateCryptoBalance(cryptoData, {
      onSuccess: () => {
        setIsUpdating(false);
      },
    });
  }
  let isWorking = isLoading || isUpdating;

  if (isWorking) return <Spinner />;

  return (
    <div>
      <Button
        variation="link"
        disabled={isWorking}
        onClick={() => handleUpdating(cryptoData)}
      >
        <IoRefresh /> Refresh
      </Button>
      <CryptoSummary cryptoData={cryptoData} />
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
      <CoinsList cryptoData={cryptoData} />
    </div>
  );
}

export default Crypto;
