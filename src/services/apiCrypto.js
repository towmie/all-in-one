import toast from "react-hot-toast";
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
        throw new Error(`Failed to fetch data for ${coin.coinName}`);
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

export async function createCoin(coin, id) {
  if (!id) {
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
      toast.error("Unkonwn Coin");
      throw new Error(
        `Failed to fetch data for ${coin.coinName}, please use short name(Solana: SOL)`
      );
    }

    const data = await response.json();

    const { data: updatedCoin, error } = await supabase
      .from("cryptoOverview")
      .insert([
        {
          coinName: coin.coinName.trim().toUpperCase(),
          amount: +coin.amount,
          rate: data.rate,
          amountInUSD: data.rate * +coin.amount,
          amountSpent: +coin.spentUSD,
        },
      ])
      .select();

    if (error) {
      toast.error("Unkonwn Coin");
      throw new Error(`Failed to insert data for ${coin.coinName}`);
    }
    return updatedCoin;
  }
}

export async function deleteCoin(id) {
  const { data, error } = await supabase
    .from("cryptoOverview")
    .delete()
    .eq("id", id);

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Coin could not be deleted");
  }
  return data;
}
