import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CoinRow from "./CoinRow";
import { useCryptoList } from "./useCryptoBalance";
import { useUpdateCrypto } from "./useUpdateCryptoRates";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";

const StyledSort = styled.div`
  display: flex;
  flex-direction: column;
  & button {
    border: none;
    background-color: transparent;
  }
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

function CoinsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cryptoData, isLoading } = useCryptoList();
  const { isUpdating } = useUpdateCrypto();

  function handleSort(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  if (isLoading || isUpdating) return <Spinner />;

  return (
    <Table columns="2.4rem 1fr 1fr 1fr 1fr 1fr 1fr 7rem">
      <Table.Header>
        <Cell>Nº</Cell>
        <Cell>Coin</Cell>
        <Cell>Rate</Cell>
        <Cell>Amount</Cell>
        <Cell>
          <span>In USD</span>
          <StyledSort>
            <button onClick={() => handleSort("amountInUSD-asc")}>
              <GoTriangleUp />
            </button>
            <button onClick={() => handleSort("amountInUSD-desc")}>
              <GoTriangleDown />
            </button>
          </StyledSort>
        </Cell>
        <Cell>
          <span>Spent $</span>
          <StyledSort>
            <button onClick={() => handleSort("amountSpent-asc")}>
              <GoTriangleUp />
            </button>
            <button onClick={() => handleSort("amountSpent-desc")}>
              <GoTriangleDown />
            </button>
          </StyledSort>
        </Cell>
        <Cell>
          <span>Profit</span>
          <StyledSort>
            <button onClick={() => handleSort("profit-asc")}>
              <GoTriangleUp />
            </button>
            <button onClick={() => handleSort("profit-desc")}>
              <GoTriangleDown />
            </button>
          </StyledSort>
        </Cell>
        <Cell></Cell>
      </Table.Header>
      <Menus>
        <Table.Body
          data={cryptoData}
          render={(coin, i) => <CoinRow coin={coin} index={i} key={coin.id} />}
        />
      </Menus>
    </Table>
  );
}

export default CoinsList;
