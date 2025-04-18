import { AuthGuard } from "@/components/auth";
import DashNav from "@/components/dash-nav";
import SideBar from "@/components/SideBar";
// import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="min-h-screen relative overflow-hidden">
        <main className="container mx-auto ">
          <div className="flex flex-col ">
            <DashNav />
            <div className="sm:flex">
              <div className="fixed w-full sm:w-auto bottom-0 sm:top-20 sm:bottom-auto z-50">
                <SideBar />
              </div>
              <div className="mb-[100px] sm:ml-24 sm:mb-0 w-full">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
