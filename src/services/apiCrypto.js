import supabase, { coinApiKEY } from "./supabase";

export async function getCryptoData() {
  let { data: cryptoOverview, error } = await supabase
    .from("cryptoOverview")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Coins could not be loaded");
  }

  return cryptoOverview;
}

export async function updateCryptoData(coins) {
  const updatedCoins = [];
  try {
    for (const coin of coins) {
      const response = await fetch(
        `https://rest.coinapi.io/v1/exchangerate/${coin.coinName
          .trim()
          .toUpperCase()}/USD`,
        {
          headers: {
            "X-CoinAPI-Key": `${coinApiKEY}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${coin.name}`);
      }

      const data = await response.json();

      const { data: updatedCoinData, error } = await supabase
        .from("cryptoOverview")
        .update({
          ...coin,
          rate: data.rate,
          amountInUSD: data.rate * coin.amount,
        })
        .eq("id", coin.id);

      if (error) {
        console.error(error);
        throw new Error(`Coin ${coin.coinName} could not be updated`);
      }

      updatedCoins.push(updatedCoinData);
    }
    return updatedCoins;
  } catch (error) {
    throw new Error(error.message);
  }
}
