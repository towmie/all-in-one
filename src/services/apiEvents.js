import supabase from "./supabase";

export async function createEvent(event) {
  console.log(event);
  const { data, error } = await supabase
    .from("events")
    .insert([{ ...event }])
    .select();

  if (error) throw error;

  return data;
}

export async function getEvents() {
  const { data, error } = await supabase.from("events").select();

  if (error) throw error;

  return data;
}
