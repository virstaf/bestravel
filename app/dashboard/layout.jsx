import { AuthGuard } from "@/components/auth";
import DashNav from "@/components/dash-nav";
import SideBar from "@/components/SideBar";
// import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="h-screen">
        {/* <Sidebar /> Collapsible sidebar with icons */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col">
            <DashNav />
            <div className="flex">
              <SideBar />
              {children}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
