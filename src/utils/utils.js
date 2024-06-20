import { UNSPLASH_KEY, UNSPLASH_URL } from "../services/constants";

export function getRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
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

export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export async function getProjectBg(name) {
  try {
    const data = await fetch(
      `${UNSPLASH_URL}/search/photos?query=${name}&client_id=${UNSPLASH_KEY}`
    );
    const res = await data.json();
    const url = res.results[0].urls.regular;
    return url;
  } catch (error) {
    throw new Error(error.message);
  }
}
