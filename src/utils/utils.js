import { coinsChartColors } from "../services/CoinsChartColors";

export default function prepareArray(data) {
  if (!data) return;
  return data
    .map((coin) => {
      const { color } = coinsChartColors.find(
        (el) => el.name === coin.coinName
      );
      return { ...coin, color };
    })
    .sort((a, b) => a - b);
}

export function getTotalCryptoBalance(data) {
  return Math.round(data.reduce((acc, cur) => cur.amountInUSD + acc, 0));
}
export function getTotalCryptoSpentBalance(data) {
  return Math.round(data.reduce((acc, cur) => cur.amountSpent + acc, 0));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function getROI(moneyReceived, moneySpent) {
  return (((moneyReceived - moneySpent) / moneySpent) * 100).toFixed(2);
}
