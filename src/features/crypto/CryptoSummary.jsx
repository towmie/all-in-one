import CardItem from "../../ui/CardItem";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  formatCurrency,
  getROI,
  getTotalCryptoBalance,
  getTotalCryptoSpentBalance,
} from "../../utils/utils";
import Heading from "../../ui/Heading";

import { Cardlist } from "../../ui/CardList";

function CryptoSummary({ cryptoData }) {
  // const [coloredData, setcoloredData] = useState("");

  // useEffect(
  //   function () {
  //     setcoloredData(prepareArray(cryptoData));
  //   },
  //   [cryptoData]
  // );

  const totalROI = getROI(
    getTotalCryptoBalance(cryptoData),
    getTotalCryptoSpentBalance(cryptoData)
  );

  const profitInUSD =
    getTotalCryptoBalance(cryptoData) - getTotalCryptoSpentBalance(cryptoData);

  return (
    <>
      <Cardlist columns="1fr 1fr 1fr">
        <CardItem type="total-balance">
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
          </div>
        </CardItem>
      </Cardlist>
    </>
  );
}

export default CryptoSummary;
