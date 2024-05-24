import supabase from "./supabase";

export async function getProjects() {
  let { data: projectlist, error } = await supabase
    .from("projectlist")
    .select("*");

  if (error) throw new Error(error.message);

  return projectlist;
}

export async function addProject(newProject) {
  const { data, error } = await supabase
    .from("projectlist")
    .insert([{ ...newProject }])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteProject(id) {
  const { data, error } = await supabase
    .from("projectlist")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
}
