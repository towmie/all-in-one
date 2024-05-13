import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCryptoList } from "./../../features/crypto/useCryptoBalance";
import { useUpdateCrypto } from "./../../features/crypto/useUpdateCryptoRates";
import { useEffect, useState } from "react";
import CardItem from "../../ui/CardItem";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import prepareArray, {
  formatCurrency,
  getROI,
  getTotalCryptoBalance,
  getTotalCryptoSpentBalance,
} from "../../utils/utils";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

const Cardlist = styled.ul`
  margin-top: 1.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

function CryptoSummary() {
  // const [coloredData, setcoloredData] = useState("");
  const { cryptoData, isLoading } = useCryptoList();
  const { updateCryptoBalance } = useUpdateCrypto();
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleUpdating(cryptoData) {
    setIsUpdating(true);
    updateCryptoBalance(cryptoData, {
      onSuccess: () => {
        setIsUpdating(false);
      },
    });
  }

  // useEffect(
  //   function () {
  //     setcoloredData(prepareArray(cryptoData));
  //   },
  //   [cryptoData]
  // );

  let isWorking = isLoading || isUpdating;

  if (isWorking) return <Spinner />;

  const totalROI = getROI(
    getTotalCryptoBalance(cryptoData),
    getTotalCryptoSpentBalance(cryptoData)
  );

  const profitInUSD =
    getTotalCryptoBalance(cryptoData) - getTotalCryptoSpentBalance(cryptoData);

  return (
    <>
      <Button
        variation="link"
        disabled={isWorking}
        onClick={() => handleUpdating(cryptoData)}
      >
        Refresh
      </Button>
      <Cardlist>
        <CardItem type="total-balance">
          <div>
            {isWorking ? (
              <SpinnerMini />
            ) : (
              <div>
                <Heading as="h5">Total balance: </Heading>
                <Heading type="primary">
                  {formatCurrency(getTotalCryptoBalance(cryptoData))}
                </Heading>
                <span>
                  Spent:
                  {formatCurrency(getTotalCryptoSpentBalance(cryptoData))}
                </span>
              </div>
            )}
          </div>
        </CardItem>
        <CardItem type="chart">
          {/* <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={coloredData}
                nameKey="coinName"
                dataKey="amountInUSD"
                innerRadius={55}
                outerRadius={70}
                cx="50%"
                cy="50%"
              >
                {coloredData?.map((entry) => (
                  <Cell
                    fill={entry.color}
                    stroke={entry.color}
                    key={entry.id}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                layout="horizontal"
                iconSize={10}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer> */}
        </CardItem>
        <CardItem type="total-balance">
          <div>
            {isWorking ? (
              <SpinnerMini />
            ) : (
              <div>
                <Heading as="h5">Overview</Heading>
                <Heading
                  type="primary"
                  roi={totalROI > 0 ? "positive" : "negative"}
                >
                  {totalROI}
                  <small>%</small>
                </Heading>
                <span>
                  {profitInUSD > 0
                    ? `+${formatCurrency(profitInUSD)}`
                    : `-${formatCurrency(profitInUSD)}`}
                </span>
              </div>
            )}
          </div>
        </CardItem>
      </Cardlist>
    </>
  );
}

export default CryptoSummary;
