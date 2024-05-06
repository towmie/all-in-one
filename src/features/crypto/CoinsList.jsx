import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CoinRow from "./CoinRow";
import { useCryptoList } from "./useCryptoBalance";
import { useUpdateCrypto } from "./useUpdateCryptoRates";

function CoinsList() {
  const { cryptoData, isLoading } = useCryptoList();
  const { isUpdating } = useUpdateCrypto();
  console.log(isUpdating);

  if (isLoading || isUpdating) return <Spinner />;
  return (
    <Table columns="2.4rem 1fr 1fr 1fr 1fr 1fr 1fr 0.6fr">
      <Table.Header>
        <div>Nº</div>
        <div>Coin</div>
        <div>Rate</div>
        <div>Amount</div>
        <div>In USD</div>
        <div>Spent $</div>
        <div>Profit</div>
        <div>Add new income</div>
      </Table.Header>
      <Table.Body
        data={cryptoData}
        render={(coin, i) => <CoinRow coin={coin} index={i} key={coin.id} />}
      />
    </Table>
  );
}

export default CoinsList;
