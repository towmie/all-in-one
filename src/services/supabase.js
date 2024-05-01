import { createClient } from "@supabase/supabase-js";
export const coinApiKEY = "40ED894D-5CCF-4CA7-BE0A-994A1C8278CE";

const supabaseURL = "https://mzybklhhpfqrocsahmid.supabase.co";
const supabaseKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eWJrbGhocGZxcm9jc2FobWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1NjM1NjQsImV4cCI6MjAzMDEzOTU2NH0.M015i6biNjI1v-gk-g6u_BKdloxFSk9tNyMexMtBjzE";

const supabase = createClient(supabaseURL, supabaseKEY);

export default supabase;
