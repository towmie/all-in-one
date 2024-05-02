import { coinsChartColors } from "../services/CoinsChartColors";

export default function prepareArray(data) {
  if (!data) return;
  return data
    .map((coin) => {
      const { color } = coinsChartColors.find((el) => el.name === coin.name);
      return { ...coin, color };
    })
    .sort((a, b) => a - b);
}
