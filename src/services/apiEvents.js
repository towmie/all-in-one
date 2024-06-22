import supabase from "./supabase";

export async function getEvents() {
  const { data, error } = await supabase.from("events").select();

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
