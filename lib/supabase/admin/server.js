"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createAdminClient() {
  const cookieStore = await cookies();

  const client = createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (err) {
            console.error("cookies err:::", err);
          }
        },
      },
    }
  );
  return client;
}


export async function getAdminUser() {
  const supabase = await createAdminClient();

  // 1. First try to get session from cookies (no API call)
  const {
    data: { session },
  } = await supabase.auth.getUser();

  if (session?.user) {
    return session.user; // Return user from cookies if session exists
  }

  // 2. Fall back to API call if no session in cookies
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("getUser error:::", error);
    return null;
  }

  return user;
}
