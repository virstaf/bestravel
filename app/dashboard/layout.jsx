import { AuthGuard } from "@/components/auth";
import DashNav from "@/components/dash-nav";
import LandingFooter from "@/components/LandingFooter";
import SideBar from "@/components/SideBar";
import { SubscribeGuard } from "@/components/ui/subscription-guard";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <SubscribeGuard>
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
      </SubscribeGuard>
    </AuthGuard>
  );
}
