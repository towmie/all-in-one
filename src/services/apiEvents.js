import { getToday } from "../utils/utils";
import supabase from "./supabase";

export async function getFilteredEvents({ filterDate }) {
  let query = supabase.from("events").select("*").order("date", {
    ascending: false,
  });

  if (filterDate.label === "today") {
    query = query.eq("date", filterDate.value);
  } else if (filterDate.label === "tomorrow" || filterDate.label === "week") {
    query = query
      .gte("date", filterDate.value)
      .lte("date", getToday({ end: true }));
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}
export async function getEvents() {
  const { data, error } = await supabase.from("events").select("*");

  if (error) throw error;

  return data;
}

export async function createEvent(event) {
  const { data, error } = await supabase
    .from("events")
    .insert([{ ...event }])
    .select();

  if (error) throw error;

  return data;
}

export async function deleteEvent(id) {
  const { data, error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Event couldn't be deleted");
  }

  return data;
}

export async function editEvent({ event, id }) {
  const { data, error } = await supabase
    .from("events")
    .update({ ...event })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Event couldn't be deleted");
  }

  return data;
}
