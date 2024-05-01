import supabase, { coinApiKEY } from "./supabase";

export async function getCryptoData() {
  let { data: cryptoList, error } = await supabase
    .from("cryptoList")
    .select("*");
  if (error) {
    console.error(error);
    throw new Error("Crypto list cannot be fetched");
  }

  return cryptoList;
}

export async function updateCoinsData(cryptoList) {
  try {
    for (const coin of cryptoList) {
      const response = await fetch(
        `https://rest.coinapi.io/v1/exchangerate/${coin.name.toUpperCase()}/USD`,
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

      await supabase
        .from("cryptoList")
        .update({
          ...coin,
          rate: data.rate,
          amountInUSD: data.rate * coin.amount,
        })
        .eq("id", coin.id);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export function getTotalCryptoBalance(data) {
  return Math.round(data.reduce((acc, cur) => cur.amountInUSD + acc, 0));
}
