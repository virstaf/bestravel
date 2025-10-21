import { getProfileAction } from "@/actions/profiles";
import DashNav from "@/components/dash-nav";
import LandingFooter from "@/components/LandingFooter";
import SideBar from "@/components/SideBar";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardNotFound from "./not-found";

export default async function DashboardLayout({ children }) {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { profile } = await getProfileAction();

  if (profile?.role === "ADMIN") {
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
              <div className=" sm:ml-24 w-full">{children}</div>
            </div>
          </div>
        </main>
        <LandingFooter />
      </div>
    </>
  );
}
