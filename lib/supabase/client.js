import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Key:", supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing in environment variables");
}
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
