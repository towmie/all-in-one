import supabase from "./supabase";

export async function getFiatIncome() {
  let { data: fiatIncomes, error } = await supabase
    .from("fiatIncome")
    .select("*");

  if (error) throw new Error(error.message);

  const totalIncome = fiatIncomes.reduce((acc, cur) => cur.income + acc, 0);

  return { fiatIncomes, totalIncome };
}

export async function getFiatOutcome() {
  let { data: fiatOutcomes, error } = await supabase
    .from("fiatOutcome")
    .select("*");

  if (error) throw new Error(error.message);

  const totalOutcome = fiatOutcomes.reduce((acc, cur) => cur.outcome + acc, 0);

  return { fiatOutcomes, totalOutcome };
}

export async function getSaved() {
  let { data, error } = await supabase.from("saved").select("*");

  if (error) throw new Error(error.message);

  const saved = data.reduce((acc, cur) => cur.saved + acc, 0);

  return saved;
}
