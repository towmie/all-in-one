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
  let { data: saved, error } = await supabase.from("saved").select("*");

  if (error) throw new Error(error.message);

  const totalSaved = saved.reduce((acc, cur) => cur.saved + acc, 0);

  return { saved, totalSaved };
}

export async function updateFiatItem({ data, id, type }) {
  let supabaseTable;
  if (type === "income") supabaseTable = "fiatIncome";
  if (type === "outcome") supabaseTable = "fiatOutcome";
  if (type === "saved") supabaseTable = "saved";

  const { data: updatedValue, error } = await supabase
    .from(`${supabaseTable}`)
    .update({ ...data })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return { updatedValue, supabaseTable };
}

export async function deleteFiatitem({ type, id }) {
  let supabaseTable;
  if (type === "income") supabaseTable = "fiatIncome";
  if (type === "outcome") supabaseTable = "fiatOutcome";
  if (type === "saved") supabaseTable = "saved";

  const { data, error } = await supabase
    .from(supabaseTable)
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { data, supabaseTable };
}
