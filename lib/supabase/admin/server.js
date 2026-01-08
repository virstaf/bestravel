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
    },
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    }
  );
  return client;
}

export async function getAdminUser() {
  const supabase = await createAdminClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  // Return user with sub property for compatibility if needed,
  // though user.id is usually what's used.
  return { ...user, sub: user.id };
}
