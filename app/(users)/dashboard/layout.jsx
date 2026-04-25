export const dynamic = "force-dynamic";

import { getProfileAction } from "@/actions/profiles";
import DashNav from "@/components/dash-nav";
import LandingFooter from "@/components/LandingFooter";
import SideBar from "@/components/SideBar";
import { getServerToken } from "@/lib/session";
import { redirect } from "next/navigation";
import DashboardNotFound from "./not-found";

// Dashboard routes read cookies — must not be statically rendered
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  // Auth gate — check for FastAPI JWT first, then Supabase A session (legacy fallback)
  const token = await getServerToken();
  // console.log(token);

  if (!token) {
    // Check Supabase A session for migration-pending users
    try {
      const { getUser } = await import("@/lib/supabase/server");
      const user = await getUser();
      if (!user) redirect("/auth/login");
    } catch {
      redirect("/auth/login");
    }
  }

  const { profile } = await getProfileAction();

  // Check if user has completed onboarding (legacy Supabase A field)
  if (profile && profile.onboarding_completed === false) {
    redirect("/onboarding/welcome");
  }

  // Admin redirect — check both FastAPI user_type and legacy role field
  const isAdmin =
    profile?.user_type === "ADMINUSER" || profile?.role === "ADMIN";
  if (isAdmin) {
    redirect("/admin");
  }

  if (!children) {
    return <DashboardNotFound />;
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden mb-[100px] sm:mb-0">
        <main className="container mx-auto">
          <div className="flex flex-col w-full">
            <DashNav />
            <div className="sm:flex mt-16">
              <div className="fixed w-full sm:w-auto bottom-0 sm:top-20 sm:bottom-auto z-50">
                <SideBar />
              </div>
              <div className=" sm:ml-24 w-full min-h-[calc(100vh-68px)]">
                {children}
              </div>
            </div>
          </div>
        </main>
        <LandingFooter />
      </div>
    </>
  );
}
