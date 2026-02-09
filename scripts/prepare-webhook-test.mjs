import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load env vars
const envPath = path.resolve(process.cwd(), ".env.local");
let env = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      env[key.trim()] = value.trim().replace(/^["']|["']$/g, "");
    }
  });
}

const SUPABASE_URL =
  env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const email = "webhook_test@example.com";
  console.log(`Preparing test user: ${email}`);

  // Check if user exists
  const {
    data: { users },
    error: listError,
  } = await supabase.auth.admin.listUsers();
  let user = users.find((u) => u.email === email);

  if (!user) {
    console.log("User not found, creating...");
    const {
      data: { user: newUser },
      error: createError,
    } = await supabase.auth.admin.createUser({
      email: email,
      email_confirm: true,
      user_metadata: { full_name: "Webhook Test User" },
    });
    if (createError) {
      console.error("Error creating user:", createError);
      process.exit(1);
    }
    user = newUser;
    console.log("User created:", user.id);
  } else {
    console.log("User already exists:", user.id);
  }

  // Upsert profile to ensure it exists and reset subscription status
  const customerId = `V${Math.floor(100000 + Math.random() * 900000)}`;

  // Check if profile exists to get ID if needed, though we have user.id
  // Resetting subscription status to 'inactive' so we can test the 'created' webhook
  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: email,
      full_name: "Webhook Test User",
      customer_id: customerId, // Ensure unique ID if new
      role: "USER",
      is_subscribed: false,
      subscription_status: "inactive",
      subscription_plan: "inactive",
      subscription_end: null,
    },
    { onConflict: "id" },
  );

  if (profileError) {
    // If constraint error on customer_id (unlikely with random but possible if user existed with diff ID),
    // we might just want to update without customer_id if it exists.
    // Let's try simple update if upsert failed, assuming it might be a constraint issue we didn't handle perfectly.
    // But for now, let's log.
    console.error("Error upserting profile:", profileError);
  } else {
    console.log("Profile ready (subscription reset to inactive).");
  }

  // Clear any existing subscriptions for this user
  const { error: subDeleteError } = await supabase
    .from("subscriptions")
    .delete()
    .eq("user_id", user.id);
  if (subDeleteError)
    console.error("Error clearing subscriptions:", subDeleteError);
  else console.log("Cleared existing subscriptions table for user.");

  console.log("\nREADY for Webhook Test.");
  console.log(`Use this email in stripe trigger override: ${email}`);
}

main();
