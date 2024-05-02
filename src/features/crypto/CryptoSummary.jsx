import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCryptoList } from "./../../features/crypto/useCryptoBalance";
import { useUpdateCrypto } from "./../../features/crypto/useUpdateCryptoRates";
import { getTotalCryptoBalance } from "./../../services/apiCrypto";
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
import { coinsChartColors } from "../../services/CoinsChartColors";
import prepareArray from "../../utils/utils";

const Cardlist = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const ChartBox = styled.div`
  /* Box */
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  /* padding: 2.4rem 3.2rem; */
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-legend-item-text {
    font-size: 12px;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

function CryptoSummary() {
  const [coloredData, setcoloredData] = useState("");
  const { cryptoData, isLoading } = useCryptoList();
  const { updateCryptoBalance } = useUpdateCrypto();
  const [updatingBalance, setUpdatingBalance] = useState(false);

  async function handleUpdating(cryptoData) {
    setUpdatingBalance(true);
    try {
      await updateCryptoBalance(cryptoData);
      setUpdatingBalance(false);
    } catch (error) {
      setUpdatingBalance(false);
    }
  }

  useEffect(
    function () {
      setcoloredData(prepareArray(cryptoData));
    },
    [cryptoData]
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <button
        disabled={updatingBalance}
        onClick={() => handleUpdating(cryptoData)}
      >
        Update
      </button>
      <Cardlist>
        <CardItem>
          {updatingBalance ? (
            <SpinnerMini />
          ) : (
            <h1>{getTotalCryptoBalance(cryptoData)}</h1>
          )}
        </CardItem>
        <CardItem>
          <ChartBox>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={coloredData}
                  nameKey="name"
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
            </ResponsiveContainer>
          </ChartBox>
        </CardItem>
      </Cardlist>
    </>
  );
}

export default CryptoSummary;
