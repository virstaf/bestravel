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
  console.warn(".env.local not found, relying on process.env");
  env = process.env;
}

const SUPABASE_URL =
  env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  console.log("Starting Edge Function Test...");
  console.log(`Supabase URL: ${SUPABASE_URL}`);

  // 1. Create Test User
  const testEmail = `test_${Date.now()}@example.com`;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  console.log(`Creating test user ${testEmail}...`);

  const {
    data: { user },
    error: createError,
  } = await supabase.auth.admin.createUser({
    email: testEmail,
    email_confirm: true,
    user_metadata: { full_name: "Test User" },
  });

  if (createError) {
    console.error("Error creating auth user:", createError);
    process.exit(1);
  }

  console.log("Auth user created:", user.id);

  // Update profile to have expired subscription
  // Give trigger a moment (if any), then upsert
  await new Promise((r) => setTimeout(r, 1000));

  const customerId = `V${Math.floor(100000 + Math.random() * 900000)}`;

  const { error: updateError } = await supabase.from("profiles").upsert({
    id: user.id,
    email: testEmail,
    full_name: "Test User",
    customer_id: customerId,
    role: "USER",
    is_subscribed: true,
    subscription_plan: "silver",
    subscription_end: yesterday.toISOString(),
    subscription_status: "active",
  });

  if (updateError) {
    console.error("Error updating profile:", updateError);
    await supabase.auth.admin.deleteUser(user.id);
    process.exit(1);
  }

  console.log("Profile updated with expired subscription.");

  // 2. Invoke Edge Function
  const functionUrl = `${SUPABASE_URL}/functions/v1/check-expired-subscriptions`;
  console.log(`Invoking function at ${functionUrl}...`);

  try {
    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    let result;
    if (contentType && contentType.indexOf("application/json") !== -1) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    console.log("Function response status:", response.status);
    console.log("Function result:", result);

    if (!response.ok) {
      throw new Error(`Function failed with status ${response.status}`);
    }
  } catch (e) {
    console.error("Invocation error:", e.message);
  }

  // 3. Verify
  console.log("Verifying profile status...");
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  let success = false;
  if (profile) {
    console.log(
      `Profile status: ${profile.subscription_status}, is_subscribed: ${profile.is_subscribed}`,
    );
    if (
      profile.subscription_status === "expired" &&
      profile.is_subscribed === false
    ) {
      console.log("SUCCESS: Profile updated to expired.");
      success = true;
    } else {
      console.error("FAILURE: Profile not updated correctly.");
    }
  } else {
    console.error("FAILURE: Profile not found.");
  }

  // 4. Cleanup
  console.log("Cleaning up...");
  await supabase.auth.admin.deleteUser(user.id);

  if (success) {
    console.log("Test PASSED");
  } else {
    console.log("Test FAILED");
    process.exit(1);
  }
}

main();
