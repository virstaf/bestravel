import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export default async function proxy(request) {
  const cookieStore = await cookies();
  
      const supabase = createServerClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_ANON_KEY,
          {
            cookies: {
              getAll() {
                return cookieStore.getAll();
              },
              setAll(cookiesToSet) {
                try {
                  // cookiesToSet.forEach(({ name, value, options }) =>
                  //   cookieStore.set(name, value, options)
                  // );
                  for (const { name, value, options } of cookiesToSet) {
                    cookieStore.set(name, value, options);
                  }
                } catch (err) {
                  console.error("cookies err:::", err);
                  throw err;
                }
              },
            },
          }
        );
  const { data: { user } } = await supabase.auth.getUser()
  
  // Protect /dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    // Redirect authenticated users away from auth pages
    if (request.nextUrl.pathname.startsWith('/auth') && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  return supabaseResponse;
}
