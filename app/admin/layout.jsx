import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AdminGuard } from "@/components/admin-guard";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({ children }) {
  return (
    // <AdminGuard>
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full min-h-screen flex flex-col">
        {/* <SidebarTrigger /> */}
        <AdminNav />
        {children}
      </main>
    </SidebarProvider>
    // </AdminGuard>
  );
}
