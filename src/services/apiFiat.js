import { getToday } from "../utils/utils";
import { PAGE_SIZE } from "./constants";
import supabase from "./supabase";

export async function getFirstDate() {
  let incomeFirstDate;
  let outcomeFirstDate;
  let savedFirstDate;

  const { data: fiatIncome, error: incomeError } = await supabase
    .from("fiatIncome")
    .select("date")
    .order("date", { ascending: true })
    .limit(1);

  if (fiatIncome.length > 0) {
    incomeFirstDate = fiatIncome[0].date;
  } else {
    console.log("No data found in the table");
    return null;
  }

  const { data: fiatOutcome, error: outcomeError } = await supabase
    .from("fiatOutcome")
    .select("date")
    .order("date", { ascending: true })
    .limit(1);

  if (fiatOutcome.length > 0) {
    outcomeFirstDate = fiatOutcome[0].date;
  } else {
    console.log("No data found in the table");
    return null;
  }

  const { data: fiatSaved, error: savedError } = await supabase
    .from("saved")
    .select("date")
    .order("date", { ascending: true })
    .limit(1);

  if (fiatSaved.length > 0) {
    savedFirstDate = fiatSaved[0].date;
  } else {
    console.log("No data found in the table");
    return null;
  }

  if (incomeError || outcomeError || savedError)
    throw new Error("Could not load data");

  return { incomeFirstDate, outcomeFirstDate, savedFirstDate };
}

export async function getTotoalSummary({ filterDate }) {
  let incomeQuery = supabase.from("fiatIncome").select("*");
  let outcomeQuery = supabase.from("fiatOutcome").select("*");
  let savedQuery = supabase.from("saved").select("*");

  if (filterDate && filterDate.value !== "all") {
    incomeQuery
      .gte("date", filterDate.value)
      .lte("date", getToday({ end: true }));
    outcomeQuery
      .gte("date", filterDate.value)
      .lte("date", getToday({ end: true }));
    savedQuery
      .gte("date", filterDate.value)
      .lte("date", getToday({ end: true }));
  }

  const { data: fiatIncome, error: incomeError } = await incomeQuery;
  const { data: fiatOutcome, error: outcomeError } = await outcomeQuery;
  const { data: fiatSaved, error: savedError } = await savedQuery;

  if (incomeError || outcomeError || savedError)
    throw new Error("Could not load data");

  return { fiatIncome, fiatOutcome, fiatSaved };
}

export async function getFiatIncome({ filter, filterDate, page }) {
  let query = supabase
    .from("fiatIncome")
    .select("*", { count: "exact" })
    .order("date", {
      ascending: false,
    });

  if (filterDate && filterDate.value !== "all") {
    query = query
      .gte("date", filterDate.value)
      .lte("date", getToday({ end: true }));
  }

  if (filter && filter.value !== "all") {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return { data, count };
}

export async function getFiatOutcome({ filter, page }) {
  let query = supabase
    .from("fiatOutcome")
    .select("*", { count: "exact" })
    .order("date", {
      ascending: false,
    });

  if (filter && filter.value !== "all") {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);
  return { data, count };
}

export async function getSaved() {
  let { data, error } = await supabase.from("saved").select("*").order("date", {
    ascending: false,
  });

  if (error) throw new Error(error.message);

  return data;
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

export async function addFiatitem({
  moneyAction,
  actionName,
  value,
  date,
  category = "",
}) {
  let newValue = {};

  if (actionName === "income") {
    newValue = { ...newValue, income: value, date, category };
  }
  if (actionName === "outcome") {
    newValue = { ...newValue, outcome: value, date, category };
  }
  if (actionName === "saved") {
    newValue = { ...newValue, saved: value, date };
  }
  const { data, error } = await supabase
    .from(`${moneyAction}`)
    .insert([newValue])
    .select();

  if (error) throw new Error(error.message);

  return { data, moneyAction };
}
