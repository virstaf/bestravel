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
} else {
  // If running in an environment without .env.local being read by fs but maybe processed by next/webpack (unlikely here for node script)
  env = process.env;
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
  console.log(`Verifying webhook results for: ${email}`);

  // First, find the user
  // We can't select * from profiles without RLS policy or service role, which we have.

  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
    } else {
      console.log("\n--- Profile ---");
      console.log(`Email: ${profile.email}`);
      console.log(`Is Subscribed: ${profile.is_subscribed}`);
      console.log(`Plan: ${profile.subscription_plan}`);
      console.log(`Status: ${profile.subscription_status}`);
      console.log(`Stripe Customer ID: ${profile.stripe_customer_id}`);
    }

    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_email", email)
      .single();

    console.log("\n--- Subscription Table ---");
    if (subError) {
      if (subError.code === "PGRST116") {
        console.log("No subscription record found.");
      } else {
        console.error("Error fetching subscription:", subError);
      }
    } else if (subscription) {
      console.log(`Plan: ${subscription.plan}`);
      console.log(`Status: ${subscription.status}`);
      console.log(`Period Start: ${subscription.current_period_start}`);
      console.log(`Period End: ${subscription.current_period_end}`);
    }
  } catch (e) {
    console.error("Verification script error:", e);
  }
}

main();
