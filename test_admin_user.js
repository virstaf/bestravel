import { getAdminUser } from "./lib/supabase/admin/server.js";

async function test() {
  try {
    const user = await getAdminUser();
    console.log("User:", user);
  } catch (error) {
    console.error("Test Error:", error);
  }
}

test();
